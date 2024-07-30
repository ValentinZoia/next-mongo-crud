import { connectDB } from "@/libs/mongodb";
import Task from "@/models/Tasks";
import { NextRequest, NextResponse } from "next/server";

// getTaskById
export async function GET( request: NextRequest, { params }: any ) {
  try {
    await connectDB();
    const id = params.id;

    if (!id) {
      return NextResponse.json(
        { error: "id invalido" },
        { status: 400 }
      );
    }

    const task = await Task.findById(id);

    if (!task) {
      return NextResponse.json({ error: "nashe" }, { status: 400 });
    }

    return NextResponse.json({message:`obteniendo tarea con id: ${id}`, task }, { status: 200 });
  
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: any) {
  try {
    await connectDB();

    const body = await request.json();

    const { title, time, description } = body;

    const id = params.id;

    

    if (!title || !description) {
      return NextResponse.json(
        { error: "Completa los campos de title y description" },
        { status: 400 }
      );
    }

    if (!id) {
      return NextResponse.json(
        { error: "No se encontro la tarea" },
        { status: 400 }
      );
    }

    const task = await Task.findByIdAndUpdate(
      id,
      { title, time, description },
      { new: true }
    );
    
    return NextResponse.json(
      {
        message: `fue actualizada la tarea con id: ${id}`,
        task,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest,  { params }: any ) {
  try {
    await connectDB();

    const id = params.id;

    if (!id) {
      return NextResponse.json(
        { error: "No se encontro la tarea" },
        { status: 400 }
      );
    }

    const task = await Task.findByIdAndDelete(id);

    return NextResponse.json({ message: `La tarea con id ${id} fue eliminada correctamente}`, task }, { status: 200 });
  
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
