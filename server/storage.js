import { z } from "zod";

// Product schema
const productSchema = z.object({
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

export class MemStorage {
  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.currentId = 1;
    this.loadProducts();
  }

  async getUser(id) {
    return this.users.get(id);
  }

  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser) {
    const id = this.currentId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllProducts() {
    if (this.products.size === 0) {
      await this.loadProducts();
    }
    return Array.from(this.products.values());
  }

  async getProduct(id) {
    if (this.products.size === 0) {
      await this.loadProducts();
    }
    return this.products.get(id);
  }

  async getProductsByCategory(category) {
    if (this.products.size === 0) {
      await this.loadProducts();
    }
    return Array.from(this.products.values()).filter(
      (product) => product.category.toLowerCase() === category.toLowerCase(),
    );
  }

  async loadProducts() {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
      }
      const data = await response.json();
      
      // Validate and parse the response data
      const productsData = z.array(productSchema).parse(data);
      
      // Store products in memory
      productsData.forEach(product => {
        this.products.set(product.id, product);
      });
      
      console.log(`Loaded ${this.products.size} products from FakeStore API`);
    } catch (error) {
      console.error('Error loading products from API:', error);
      throw error;
    }
  }
}

export const storage = new MemStorage();