import { checkRecord, deleteExpense, getExpenses, insertExpenses } from "@/lib/db";
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

export async function DELETE(req: Request, { params }: { params: { expenseId: string } }) {
    try {
        const { userId } = auth();
    
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        
        if (!params.expenseId) {
            return new NextResponse("Id is required", { status: 400 });
        }
    
        await deleteExpense(Number(params.expenseId))
        return NextResponse.json({ success:true, message:"Removed" });

    } catch (error) {
      console.log("[TASK_ERROR]", error);
      return new NextResponse("Internal server error", { status: 500 });
    }
}