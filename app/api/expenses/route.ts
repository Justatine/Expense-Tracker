import { checkRecord, insertExpenses } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    try {
        const { userId } = auth(); 
        const body = await req.json();
        
        const { categoryid, amount, description } = body;
    
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
    
        const categoryId = Number(categoryid);
        if (isNaN(categoryId)) {
            return new NextResponse("Invalid category ID", { status: 400 });
        }
        
        if (!categoryid) {
            return new NextResponse("Category id is required", { status: 400 });
        }
    
        const recordExists = await checkRecord(Number(categoryid), userId);
    
        if (!recordExists) {
            return new NextResponse("Category not found for this user", { status: 404 });
        }
    
        const data = {
            userId: userId,
            categoryId: Number(categoryid),
            amount: Number(amount),
            description: description
        }  
    
        await insertExpenses(data);
        
        return NextResponse.json({ success:true, message: "Expense added" });
  
    } catch (error) {
      console.error(error)
      return new NextResponse("Internal server error", { status: 500 });
    }
}