import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, ProductsApiResponse } from "../../types/product";

/**
 * Products state interface
 *
 * This interface defines the shape of the products state in Redux:
 * - items: Array of Product objects fetched from the API
 * - status: Loading state machine ('idle' | 'loading' | 'failed')
 * - error: Optional error message if fetch fails
 */
interface ProductsState {
  items: Product[];
  status: "idle" | "loading" | "failed";
  error?: string;
}

const initialState: ProductsState = {
  items: [],
  status: "idle",
  error: undefined,
};

/**
 * Type guard to validate API response structure
 * Prevents runtime errors from unexpected API changes
 */
function isProductsApiResponse(data: unknown): data is ProductsApiResponse {
  return (
    typeof data === "object" &&
    data !== null &&
    "products" in data &&
    Array.isArray((data as ProductsApiResponse).products)
  );
}

/**
 * Async thunk to fetch products from DummyJSON API
 *
 * This thunk handles the asynchronous API call to fetch products.
 * - Uses Fetch API (no Axios as per requirements)
 * - Fetches 100 products as specified in requirements
 * - Returns typed Product[] array on success
 * - Returns typed error string on failure using rejectWithValue
 * - Validates API response structure to prevent runtime errors
 *
 * The thunk is automatically handled by Redux Toolkit with pending/fulfilled/rejected states
 */
export const fetchProducts = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>("products/fetchProducts", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch("https://dummyjson.com/products?limit=100");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: unknown = await response.json();

    // Validate API response structure
    if (!isProductsApiResponse(data)) {
      throw new Error("Invalid API response structure");
    }

    // Validate that we received products
    if (!Array.isArray(data.products)) {
      throw new Error("Products array not found in API response");
    }

    return data.products;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Unknown error occurred"
    );
  }
});

/**
 * Products slice managing product data and loading state
 *
 * This slice handles:
 * - Product data storage
 * - Loading state management (idle/loading/failed)
 * - Error handling
 *
 * IMPORTANT: Products are sorted by price descending ONCE after fetch.
 * This is a performance-critical requirement - sorting happens here, not in components.
 * The sorted array is then used by memoized selectors for filtering/sorting/pagination.
 *
 * Why sort here instead of in selectors?
 * - Initial sort happens once, not on every selector call
 * - Default view shows products sorted by price (descending)
 * - User can change sort order via filters, but initial state is optimized
 */
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Set loading state when fetch starts
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = undefined;
      })
      // Handle successful fetch: sort products and store them
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.status = "idle";
          // Sort by price descending ONCE after fetch (performance-critical requirement)
          // Using spread operator to create new array (immutability)
          state.items = [...action.payload].sort((a, b) => b.price - a.price);
        }
      )
      // Handle fetch failure: store error message
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch products";
      });
  },
});

export default productsSlice.reducer;
