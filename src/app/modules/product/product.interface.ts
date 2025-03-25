export interface IProduct {
  name: string;
  category: string;
  menu: string;
  quantity: number;
  images: string[];
  size?: string[];
  colorVariants?: string[];
  price: number;
  bestSellingCount: number;
  averageRating: number;
  description: string;
}
