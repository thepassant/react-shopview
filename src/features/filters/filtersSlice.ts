import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * Filter state interface
 *
 * This interface defines all filter, sort, and pagination state in Redux.
 * All filtering logic is centralized here to avoid prop drilling.
 *
 * State Properties:
 * - searchTerm: Text search query (searches title, description, brand, category)
 * - minPrice: Minimum price filter (0 = no minimum)
 * - maxPrice: Maximum price filter (0 = no maximum)
 * - availability: Stock availability filter ('all' | 'in' | 'out')
 * - sortBy: Sort order ('priceAsc' | 'priceDesc' | 'name')
 * - currentPage: Current page number for pagination (starts at 1)
 */
export interface FiltersState {
  searchTerm: string;
  minPrice: number;
  maxPrice: number;
  availability: "all" | "in" | "out";
  sortBy: "priceAsc" | "priceDesc" | "name";
  currentPage: number;
}

const initialState: FiltersState = {
  searchTerm: "",
  minPrice: 0,
  maxPrice: 0,
  availability: "all",
  sortBy: "priceDesc",
  currentPage: 1,
};

/**
 * Filters slice managing product filtering, sorting, and pagination
 *
 * This slice handles all user interactions related to filtering, sorting, and pagination.
 *
 * KEY DESIGN DECISION: Auto-reset pagination when filters change
 *
 * Why reset pagination?
 * - When filters change, the number of results changes
 * - User might be on page 5, but after filtering only 10 products remain (1 page)
 * - Resetting to page 1 prevents showing empty pages or confusing UX
 * - This is a common UX pattern in e-commerce applications
 *
 * Reducers:
 * - setSearchTerm: Updates search query and resets to page 1
 * - setMinPrice/setMaxPrice: Updates price range and resets to page 1
 * - setAvailability: Updates stock filter and resets to page 1
 * - setSortBy: Updates sort order and resets to page 1
 * - setCurrentPage: Updates page number (doesn't reset, used for navigation)
 * - resetFilters: Resets all filters to initial state (useful for "Clear Filters" button)
 */
const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.currentPage = 1; // Reset pagination on filter change
    },
    setMinPrice: (state, action: PayloadAction<number>) => {
      state.minPrice = action.payload;
      state.currentPage = 1; // Reset pagination on filter change
    },
    setMaxPrice: (state, action: PayloadAction<number>) => {
      state.maxPrice = action.payload;
      state.currentPage = 1; // Reset pagination on filter change
    },
    setAvailability: (state, action: PayloadAction<"all" | "in" | "out">) => {
      state.availability = action.payload;
      state.currentPage = 1; // Reset pagination on filter change
    },
    setSortBy: (
      state,
      action: PayloadAction<"priceAsc" | "priceDesc" | "name">
    ) => {
      state.sortBy = action.payload;
      state.currentPage = 1; // Reset pagination on filter change
    },
    // This reducer doesn't reset pagination - it's used for page navigation
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    // Reset all filters to initial state (useful for "Clear Filters" button)
    resetFilters: (state) => {
      state.searchTerm = "";
      state.minPrice = 0;
      state.maxPrice = 0;
      state.availability = "all";
      state.sortBy = "priceDesc"; // Default sort: price descending
      state.currentPage = 1;
    },
  },
});

export const {
  setSearchTerm,
  setMinPrice,
  setMaxPrice,
  setAvailability,
  setSortBy,
  setCurrentPage,
  resetFilters,
} = filtersSlice.actions;
export default filtersSlice.reducer;
