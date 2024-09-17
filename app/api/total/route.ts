import { totalSpent } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(){
    const { userId } = auth();
    try {

        if(!userId) return NextResponse.json("Unauthenticated", { status: 401 });
        const total  = await totalSpent(userId);

        return NextResponse.json({success:true, data:total })

    } catch (error) {
        return NextResponse.json({message:"Failed"},{status:500})
    }
}