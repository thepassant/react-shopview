import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Product } from "../../types/product";
import { FiltersState } from "../filters/filtersSlice";

/**
 * Base selectors
 */
const selectFilters = (state: RootState): FiltersState => state.filters;

/**
 * Base selector for all products
 */
export const selectProducts = (state: RootState): Product[] =>
  state.products.items;

/**
 * Memoized selector for filtered products
 *
 * MEMOIZATION STRATEGY:
 * This selector uses createSelector from Redux Toolkit, which implements memoization.
 * The selector only recalculates when its input dependencies change:
 * - selectProducts (products array)
 * - selectFilters (filter state object)
 *
 * Performance Benefits:
 * - If products or filters haven't changed, returns cached result
 * - Prevents unnecessary recalculations when unrelated Redux state changes
 * - Critical for performance with large product lists (100+ products)
 * - Reduces re-renders in components using this selector
 *
 * Filter Logic:
 * - Search: Matches against title, description, brand, and category (case-insensitive)
 * - Price Range: Filters products within minPrice and maxPrice range
 * - Availability: Filters by stock status (in stock = stock > 0, out of stock = stock === 0)
 *
 * Note: This selector does NOT handle sorting - that's done in selectSortedProducts
 * This separation allows for better selector composition and performance
 */
export const selectFilteredProducts = createSelector(
  [selectProducts, selectFilters],
  (products, filters) => {
    // Create a copy to avoid mutating the original array
    let filtered = [...products];

    // Apply search filter (case-insensitive, matches multiple fields)
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower) ||
          (product.brand &&
            product.brand.toLowerCase().includes(searchLower)) || // Handle optional brand
          product.category.toLowerCase().includes(searchLower)
      );
    }
    // Apply price range filters
    // Only apply if value is greater than 0 (0 means no filter)
    if (filters.minPrice > 0) {
      filtered = filtered.filter(
        (product) => product.price >= filters.minPrice
      );
    }
    if (filters.maxPrice > 0) {
      filtered = filtered.filter(
        (product) => product.price <= filters.maxPrice
      );
    }

    // Apply availability filter based on stock status
    if (filters.availability === "in") {
      filtered = filtered.filter((product) => product.stock > 0);
    } else if (filters.availability === "out") {
      filtered = filtered.filter((product) => product.stock === 0);
    }
    // 'all' option doesn't filter, so we skip it

    return filtered;
  }
);

/**
 * Memoized selector for sorted products
 *
 * ARCHITECTURE DECISION: Separated from filtering selector
 *
 * Why separate filtering and sorting?
 * - Better selector composition: filter first, then sort
 * - Each selector can be memoized independently
 * - Easier to test and maintain
 * - Allows reusing filtered results for different sort orders
 *
 * Sorting Options:
 * - priceAsc: Sort by price ascending (lowest to highest)
 * - priceDesc: Sort by price descending (highest to lowest)
 * - name: Sort alphabetically by product title (A-Z)
 *
 * Note: Products are initially sorted by price descending in productsSlice after fetch.
 * This selector allows users to change the sort order dynamically.
 */
export const selectSortedProducts = createSelector(
  [selectFilteredProducts, selectFilters],
  (filteredProducts, filters) => {
    // Early return for empty arrays to avoid unnecessary operations
    if (filteredProducts.length === 0) {
      return filteredProducts;
    }

    // Create a copy to avoid mutating the filtered array
    const sorted = [...filteredProducts];

    // Apply sorting based on user selection
    switch (filters.sortBy) {
      case "priceAsc":
        return sorted.sort((a, b) => a.price - b.price);
      case "priceDesc":
        return sorted.sort((a, b) => b.price - a.price);
      case "name":
        // Use localeCompare for proper alphabetical sorting (handles special characters)
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      default:
        // Fallback: return unsorted (shouldn't happen with proper typing)
        return sorted;
    }
  }
);

/**
 * Memoized selector for paginated products
 *
 * PAGINATION LOGIC:
 * This selector implements client-side pagination on the filtered and sorted products.
 *
 * How it works:
 * 1. Takes the sorted products (already filtered and sorted by previous selectors)
 * 2. Calculates which slice of products to show based on currentPage
 * 3. Returns only the products for the current page
 *
 * Page Size: 12 items per page (as per requirements)
 *
 * Return Value:
 * - products: Array of products for the current page (12 items max)
 * - totalPages: Total number of pages (calculated from filtered/sorted results)
 * - currentPage: Current page number (from Redux state)
 * - totalItems: Total number of items after filtering (for display purposes)
 *
 * Performance:
 * - Only slices the array when sortedProducts or currentPage changes
 * - Memoized to prevent unnecessary recalculations
 * - Pagination automatically resets when filters change (handled in filtersSlice)
 *
 * Example:
 * - If 50 products match filters, totalPages = 5 (50 / 12 = 4.17, rounded up)
 * - Page 1 shows products 0-11, Page 2 shows 12-23, etc.
 */
export const selectPaginatedProducts = createSelector(
  [selectSortedProducts, selectFilters],
  (sortedProducts, filters) => {
    const pageSize = 12; // Fixed page size as per requirements
    const startIndex = (filters.currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    return {
      // Slice the sorted products array to get only current page items
      products: sortedProducts.slice(startIndex, endIndex),
      // Calculate total pages from filtered/sorted results length
      totalPages: Math.ceil(sortedProducts.length / pageSize),
      // Current page from Redux state
      currentPage: filters.currentPage,
      // Total items count (useful for displaying "Showing X of Y products")
      totalItems: sortedProducts.length,
    };
  }
);

/**
 * Selector for products loading state
 */
export const selectProductsStatus = (state: RootState) => state.products.status;

/**
 * Selector for products error
 */
export const selectProductsError = (state: RootState) => state.products.error;

/**
 * Memoized selector for maximum product price
 * Used to set upper limit for price filters
 * Prevents unnecessary recalculations on every render
 */
export const selectMaxProductPrice = createSelector(
  [selectProducts],
  (products) => {
    if (products.length === 0) return 0;
    return Math.max(...products.map((p) => p.price));
  }
);
