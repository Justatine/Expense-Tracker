import "@/lib/config";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import { expenseCategories, expenses } from './schema';
import * as schema from "./schema";
import { and, asc, count, desc, eq, sum } from "drizzle-orm";

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
  const checkExist = await db
    .select()
    .from(expenseCategories)
    .where(and(eq(expenseCategories.category, category.category), eq(expenseCategories.userId, category.userId)));

    if (checkExist.length > 0) {
      return false;
    }

    const result = await db.insert(expenseCategories).values(category).returning();
    return result.length > 0 ? result[0] : null;
};

export const getCategories2 = async (userId: string) => {
  const result = await db.query.expenseCategories.findMany();
  return result;
};



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

export const getExpenses = async (categoryId: number, userId: string) => {
  const selectResult = await db.select()
  .from(expenses)
  .where(and(eq(expenses.categoryId, categoryId), eq(expenses.userId, userId)))
  .orderBy(desc(expenses.createdAt));

  const totalAmount = selectResult.reduce((total, expense) => total + expense.amount, 0);
  return {
    categories: selectResult,
    total: {
      totalAmount,
    }
  }
}

export const insertExpenses = async (expense:NewExpense) => {
  try {
    return db.insert(expenses).values(expense).returning();
  } catch (error) {
    console.error("[ERROR_ADDING_EXPENSE]", error)
    throw new Error("Database error");
  }
}

export const deleteExpense = async (expenseId:number) => {
  try {
    return db.delete(expenses).where(eq(expenses.id, expenseId)).returning();
  } catch (error) {
    console.error("[ERROR_ADDING_EXPENSE]", error)
    throw new Error("Database error");
  }
}

export const totalSpent = async (userId: string) => {
  try {
    const result = await db
      .select({ totalAmount: sum(expenses.amount) })
      .from(expenses)
      .where(eq(expenses.userId, userId));
    return result[0]?.totalAmount || 0; 
  } catch (error) {
    console.error("[CHECK_RECORD_ERROR]", error);
    throw new Error("Database error");
  }
};


export const deleteCategory = async (categoryId:number) => {
  try {

    const checkData = await db
      .select({ count: count(expenses.categoryId)})
      .from(expenses)
      .where(eq(expenses.categoryId, categoryId));

    if (checkData.length > 0) {
      await db.delete(expenses).where(eq(expenses.categoryId, categoryId));
    }

    const result = await db.delete(expenseCategories).where(eq(expenseCategories.id, categoryId))
    return result ? true:false; 
  } catch (error) {
    console.error("[CHECK_RECORD_ERROR]", error);
    throw new Error("Database error");
  }
};