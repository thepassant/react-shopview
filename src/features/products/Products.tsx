import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchProducts } from "./productsSlice";
import {
  selectPaginatedProducts,
  selectProductsStatus,
  selectProductsError,
} from "./productsSelectors";
import ProductCard from "../../components/ProductCard/ProductCard";
import Filters from "../../components/Filters/Filters";
import Pagination from "../../components/Pagination/Pagination";
import "../../styles/components/Products.scss";

/**
 * Products page component
 * Displays product grid with filtering, sorting, and pagination
 */
const Products = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectProductsStatus);
  const error = useAppSelector(selectProductsError);
  const allProducts = useAppSelector((state) => state.products.items);
  const { products, totalPages, currentPage, totalItems } = useAppSelector(
    selectPaginatedProducts
  );

  useEffect(() => {
    // Only fetch if we don't have products yet and we're not already loading
    // This prevents infinite loops - once products are loaded, we don't fetch again
    // The key is checking allProducts.length to prevent re-fetching after successful load
    if (allProducts.length === 0 && status === "idle") {
      dispatch(fetchProducts());
    }
    // dispatch is stable from Redux, but we include it for completeness
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allProducts.length, status]);

  if (status === "loading") {
    return (
      <div className="products-container">
        <div className="loading">Loading products...</div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="products-container">
        <div className="error">
          <p>Error: {error}</p>
          <button
            onClick={() => dispatch(fetchProducts())}
            style={{
              marginTop: "1rem",
              padding: "0.5rem 1rem",
              cursor: "pointer",
            }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="products-container">
      <Filters />
      <div className="products-info">
        <p>
          Showing {products.length} of {totalItems} products
        </p>
      </div>
      <div className="products-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="no-products">
            No products found matching your filters.
          </div>
        )}
      </div>
      {totalPages > 1 && (
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      )}
    </div>
  );
};

export default Products;
