import { z } from "zod";

export const productSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number(),
  description: z.string(),
  category: z.string(),
  image: z.string(),
  rating: z.object({
    rate: z.number(),
    count: z.number()
  })
});

export type Product = z.infer<typeof productSchema>;

export type SortOption = 
  | "popular" 
  | "newest" 
  | "priceAsc" 
  | "priceDesc";

export type ViewMode = "grid" | "list";

export interface ProductFilters {
  categories: string[];
  priceRange: {
    min: number;
    max: number;
  };
  sizes: string[];
  colors: string[];
}

export const defaultFilters: ProductFilters = {
  categories: [],
  priceRange: {
    min: 0,
    max: 1000
  },
  sizes: [],
  colors: []
};

export const defaultProductImageAlt = "Product image";
