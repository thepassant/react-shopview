import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  setSearchTerm,
  setMinPrice,
  setMaxPrice,
  setAvailability,
  setSortBy,
  resetFilters,
} from '../../features/filters/filtersSlice';
import { selectMaxProductPrice } from '../../features/products/productsSelectors';
import '../../styles/components/Filters.scss';

/**
 * Filters component for product filtering and sorting
 * 
 * This component provides UI controls for filtering and sorting products.
 * 
 * Architecture Decision:
 * - All filter LOGIC is handled in Redux selectors (productsSelectors.ts), not here
 * - This component only dispatches filter actions to Redux
 * - This separation ensures:
 *   - Filter logic is testable and reusable
 *   - Components remain simple and focused on UI
 *   - Performance is optimized through memoized selectors
 * 
 * Filter Controls:
 * - Search: Text input for searching product name, description, brand, category
 * - Min/Max Price: Number inputs for price range filtering
 * - Availability: Dropdown for in-stock/out-of-stock filtering
 * - Sort By: Dropdown for sorting (price asc/desc, name A-Z)
 * - Reset: Button to clear all filters
 * 
 * When filters change, pagination automatically resets to page 1 (handled in filtersSlice)
 */
const Filters = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filters);
  const maxProductPrice = useAppSelector(selectMaxProductPrice);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    if (value === '') {
      dispatch(setMinPrice(0));
      return;
    }
    const numValue = Number(value);
    if (!isNaN(numValue) && numValue >= 0) {
      dispatch(setMinPrice(numValue));
    }
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    if (value === '') {
      dispatch(setMaxPrice(0));
      return;
    }
    const numValue = Number(value);
    if (!isNaN(numValue) && numValue >= 0) {
      dispatch(setMaxPrice(numValue));
    }
  };

  const handleAvailabilityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setAvailability(e.target.value as 'all' | 'in' | 'out'));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSortBy(e.target.value as 'priceAsc' | 'priceDesc' | 'name'));
  };

  const handleReset = () => {
    dispatch(resetFilters());
  };

  return (
    <div className="filters-container">
      <h2>Filters</h2>
      <div className="filters-grid">
        <div className="filter-group">
          <label htmlFor="search">Search</label>
          <input
            type="text"
            id="search"
            value={filters.searchTerm}
            onChange={handleSearchChange}
            placeholder="Search products..."
          />
        </div>

        <div className="filter-group">
          <label htmlFor="minPrice">Min Price</label>
          <input
            type="number"
            id="minPrice"
            value={filters.minPrice > 0 ? filters.minPrice.toString() : ''}
            onChange={handleMinPriceChange}
            min="0"
            max={maxProductPrice}
            placeholder="0"
          />
        </div>

        <div className="filter-group">
          <label htmlFor="maxPrice">Max Price</label>
          <input
            type="number"
            id="maxPrice"
            value={filters.maxPrice > 0 ? filters.maxPrice.toString() : ''}
            onChange={handleMaxPriceChange}
            min="0"
            max={maxProductPrice}
            placeholder="No limit"
          />
        </div>

        <div className="filter-group">
          <label htmlFor="availability">Availability</label>
          <select
            id="availability"
            value={filters.availability}
            onChange={handleAvailabilityChange}
          >
            <option value="all">All</option>
            <option value="in">In Stock</option>
            <option value="out">Out of Stock</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="sortBy">Sort By</label>
          <select id="sortBy" value={filters.sortBy} onChange={handleSortChange}>
            <option value="priceDesc">Price: High to Low</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="name">Name: A to Z</option>
          </select>
        </div>

        <div className="filter-group">
          <button onClick={handleReset} className="reset-button">
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;

