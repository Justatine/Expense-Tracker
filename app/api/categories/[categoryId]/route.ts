import { checkRecord, getExpenses } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: { taskId: string } }) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { status } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.taskId) {
      return new NextResponse("Task id is required", { status: 400 });
    }

    if (!status) {
      return new NextResponse("Status is required", { status: 400 });
    }

    // await prismadb.tasks.update({
    //   where: { task_id: params.taskId },
    //   data: { status }
    // });

    return NextResponse.json({ status: 'success', message: 'Task updated' });
  } catch (error) {
    console.log("[TASK_ERROR]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function GET(req: Request, { params }: { params: { categoryId: string } }) {
    try {
        const { userId } = auth();
    
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
    
        const categoryId = Number(params.categoryId);
        if (isNaN(categoryId)) {
            return new NextResponse("Invalid category ID", { status: 400 });
        }
        
        if (!params.categoryId) {
            return new NextResponse("Category id is required", { status: 400 });
        }

        const recordExists = await checkRecord(Number(params.categoryId), userId);

        if (!recordExists) {
            return new NextResponse("Category not found for this user", { status: 404 });
        }
    
        const response = await getExpenses(Number(params.categoryId))

        return NextResponse.json({ success:true, data:response });

    } catch (error) {
      console.log("[TASK_ERROR]", error);
      return new NextResponse("Internal server error", { status: 500 });
    }
}