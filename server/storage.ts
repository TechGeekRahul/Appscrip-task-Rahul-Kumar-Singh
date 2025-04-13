import { users, type User, type InsertUser, ApiProduct, productSchema } from "@shared/schema";
import { z } from "zod";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllProducts(): Promise<ApiProduct[]>;
  getProduct(id: number): Promise<ApiProduct | undefined>;
  getProductsByCategory(category: string): Promise<ApiProduct[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Map<number, ApiProduct>;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.currentId = 1;
    this.loadProducts();
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllProducts(): Promise<ApiProduct[]> {
    if (this.products.size === 0) {
      await this.loadProducts();
    }
    return Array.from(this.products.values());
  }

  async getProduct(id: number): Promise<ApiProduct | undefined> {
    if (this.products.size === 0) {
      await this.loadProducts();
    }
    return this.products.get(id);
  }

  async getProductsByCategory(category: string): Promise<ApiProduct[]> {
    if (this.products.size === 0) {
      await this.loadProducts();
    }
    return Array.from(this.products.values()).filter(
      (product) => product.category.toLowerCase() === category.toLowerCase(),
    );
  }

  private async loadProducts(): Promise<void> {
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
