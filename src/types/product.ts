/**
 * Product type definition based on DummyJSON API response
 */
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

/**
 * API response structure from DummyJSON
 */
export interface ProductsApiResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

