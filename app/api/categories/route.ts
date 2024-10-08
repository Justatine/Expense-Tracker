import { checkRecord, getCategories, insertCategory, insertExpenses } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function GET(){
    const { userId } = auth();
    try {

        if(!userId) return NextResponse.json("Unauthenticated", { status: 401 });
        const categories  = await getCategories(userId);
        return NextResponse.json({success:true, categories })
    } catch (error) {
        return NextResponse.json({message:"Failed"},{status:500})
    }
}

export async function POST(req:Request){
    const { userId } = auth();

    try {
        const body = await req.json();
        const {category} = body;

        if(!userId) return NextResponse.json("Unauthenticated", { status: 401 });
        
        if(!category) return NextResponse.json({message: "Category is required"}, {status:400})

        const converted = category.charAt(0).toUpperCase() + category.slice(1);
        const data = {
            category: converted,
            userId: userId
        }  

        const res = await insertCategory(data);
        if (!res) {
            return NextResponse.json({success:false, message:"Already exist"})
        }else{
            return NextResponse.json({success:true, message:"Category added", data:res})
        }
    } catch (error) {
        return NextResponse.json({message:"Failed"},{status:500})
    }
}