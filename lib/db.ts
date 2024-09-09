import "@/lib/config";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import { expenseCategories } from "./schema";
import * as schema from "./schema";
import { asc, eq } from "drizzle-orm";

export const db = drizzle(sql, { schema });

export const getCategories = async (userId:string) => {
  const selectResult = await db.select()
  .from(expenseCategories)
  .where(eq(expenseCategories.userId, userId))
  // .orderBy(asc(expenseCategories.id));
  return selectResult;
};

export type NewCategories = typeof expenseCategories.$inferInsert;

export const insertCategory = async (category:NewCategories) => {
  return db.insert(expenseCategories).values(category).returning();
};

export const getCategories2 = async (userId: string) => {
  const result = await db.query.expenseCategories.findMany();
  return result;
};