import { Product } from '../../types/product';
import '../../styles/components/ProductCard.scss';

interface ProductCardProps {
  product: Product;
}

/**
 * ProductCard component displaying individual product information
 * Shows: image, name, price, rating, availability, and description
 */
const ProductCard = ({ product }: ProductCardProps) => {
  const isInStock = product.stock > 0;

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="product-image"
        />
        <div className={`product-availability ${isInStock ? 'in-stock' : 'out-stock'}`}>
          {isInStock ? 'In Stock' : 'Out of Stock'}
        </div>
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-details">
          <div className="product-rating">
            <span className="rating-label">Rating:</span>
            <span className="rating-value">{product.rating.toFixed(1)}</span>
            <span className="rating-stars">★</span>
          </div>
          <div className="product-price">${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;


