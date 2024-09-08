import "@/lib/config";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import { expenseCategories } from "./schema";
import * as schema from "./schema";

export const db = drizzle(sql, { schema });

export const getCategories = async () => {
  const selectResult = await db.select().from(expenseCategories);
  console.log("Results", selectResult);
  return selectResult;
};

export type NewCategories = typeof expenseCategories.$inferInsert;

export const insertCategory = async (user: NewCategories) => {
  return db.insert(expenseCategories).values(user).returning();
};

export const getCategories2 = async () => {
  const result = await db.query.expenseCategories.findMany();
  return result;
};