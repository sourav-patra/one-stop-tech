import { PRODUCT_CATEGORIES_ENUM } from "../constants/products.constants";

export interface ProductModel {
  category: PRODUCT_CATEGORIES_ENUM;
  productName: string;
  productImageUrl: string;
  productPrice: string;
}
