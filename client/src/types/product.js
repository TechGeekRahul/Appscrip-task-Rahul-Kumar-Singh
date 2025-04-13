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

export const defaultFilters = {
  categories: [],
  priceRange: {
    min: 0,
    max: 1000
  },
  sizes: [],
  colors: []
};

export const defaultProductImageAlt = "Product image";