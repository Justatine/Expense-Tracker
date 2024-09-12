import "@/lib/config";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import { expenseCategories, expenses } from './schema';
import * as schema from "./schema";
import { and, asc, eq } from "drizzle-orm";

export const db = drizzle(sql, { schema });

export const getCategories = async (userId:string) => {
  const selectResult = await db.select()
  .from(expenseCategories)
  .where(eq(expenseCategories.userId, userId))
  .orderBy(asc(expenseCategories.id));
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

export const getExpenses = async (categoryId: number,) => {
  const selectResult = await db.select()
  .from(expenses)
  .where(eq(expenses.categoryId, categoryId))
  return selectResult;
}

export const checkRecord = async (categoryId: number, userId: string) => {
  try {
    const record = await db.select()
      .from(expenses)
      .where(and(eq(expenses.categoryId, categoryId), eq(expenses.userId, userId)))
    return !! record; 
  } catch (error) {
    console.error("[CHECK_RECORD_ERROR]", error);
    throw new Error("Database error");
  }
};

export type NewExpense = typeof expenses.$inferInsert;

export const insertExpenses = async (expense:NewExpense) => {
  try {
    return db.insert(expenses).values(expense).returning();
  } catch (error) {
    console.error("[ERROR_ADDING_EXPENSE]", error)
    throw new Error("Database error");
  }
}
