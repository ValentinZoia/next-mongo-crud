import { connectDB } from "@/libs/mongodb";
import Task, { ITaskDocument } from "@/models/Tasks";
import { NextRequest, NextResponse } from "next/server";



// getAllTasks
export async function GET(request: NextRequest) {
    try {
        await connectDB();

        //obtener todas las tareas
        const tasks = await Task.find({});

        //devolver las tareas
        return NextResponse.json({tasks}, {status: 200})
        

    } catch (error) {
        return NextResponse.json({error: 'An error has occurred while getting the tasks'},{status: 500})
    }
}




// createTasks
export async function POST(request: NextRequest) {
    try {
        await connectDB();

        const body = await request.json();

        const {title, time, description} = body;

        if(!title || !description){
            return NextResponse.json({error: 'Please complete title and description'},{status:400})
        }

        const newTask: ITaskDocument = new Task({
            title,
            time,
            description
        });

        await newTask.save();

        const response = NextResponse.json({
            task : newTask,
            message: 'Task created successfully'
        },{
            status:200,
        });
        return response



    } catch (error) {
        return NextResponse.json(
            { error: 'An error has occurred while creating the task' },
            { status: 500 }
          );
    }
}