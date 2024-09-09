import {
    pgTable,
    serial,
    text,
    timestamp,
    integer,
    foreignKey,
  } from "drizzle-orm/pg-core";
  
  export const expenseCategories = pgTable(
    "expense_categories",
    {
      id: serial("id").primaryKey(),
      userId: text("user_id").notNull(),
      category: text("category").notNull(),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
    }
  );
  
  export const expenses = pgTable(
    "expenses",
    {
      id: serial("id").primaryKey(),
      userId: text("user_id").notNull(), 
      categoryId: integer("category_id").references(() => expenseCategories.id),
      amount: integer("amount").notNull(),
      description: text("description").notNull(),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
    }
  );
  