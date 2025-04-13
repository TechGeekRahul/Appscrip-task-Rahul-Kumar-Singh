import { pgTable, serial, text, integer, numeric, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export const users = pgTable("users", {
  id: serial('id').primaryKey(),
  username: text('username').notNull().unique(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  name: text('name')
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  password: true,
  name: true
});

export const products = pgTable("products", {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  price: numeric('price').notNull(),
  description: text('description').notNull(),
  category: text('category').notNull(),
  image: text('image').notNull(),
  rating_rate: numeric('rating_rate').notNull(),
  rating_count: integer('rating_count').notNull(),
  created_at: timestamp('created_at').defaultNow()
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
  created_at: true
});

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