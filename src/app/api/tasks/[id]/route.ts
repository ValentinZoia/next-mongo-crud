import { connectDB } from "@/libs/mongodb";
import Task from "@/models/Tasks";

import { useRouter } from "next/router";
import { NextRequest, NextResponse } from "next/server";

// getTaskById
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: id },
        { status: 400 }
      );
    }

    const task = await Task.findById(id);
    return NextResponse.json({ task }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "No se encontro la tarea" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { id, title, time, description } = body;
    

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
        message: "Tarea actualizada correctamente",
        task,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "No se pudo actualizar la tarea" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: "No se encontro la tarea" },
        { status: 400 }
      );
    }

    const task = await Task.findByIdAndDelete(id);
    return NextResponse.json({ task }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "No se pudo eliminar la tarea" },
      { status: 500 }
    );
  }
}
