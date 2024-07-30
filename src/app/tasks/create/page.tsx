'use client'
import  NavBar  from "@/components/NavBar/NavBar"
import TaskForm from "@/components/TaskForm/TaskForm";
import { ITask, ITaskDocument } from "@/models/Tasks"
import { taskService } from "@/service/taskService";
import {useRouter} from "next/navigation"

export default function TaskCreatePage(): JSX.Element {
    const router = useRouter();
    const handleCreateTask = async (task: ITask) => {
        try {
            const response = await taskService.createTask(task as ITaskDocument);
            alert(response.message);
            router.push('/tasks/list')
        } catch (error:any) {
            alert(error.message)
        }
    }


    return (
        <>
       
        <TaskForm initialData={{title: '', time: '', description: '' }} onSubmit={handleCreateTask} titleText="Create Task" buttonText="Create"/>
        
        </>
        
    )
}