"use client";
import NavBar from "@/components/NavBar/NavBar";
import TaskForm from "@/components/TaskForm/TaskForm";
import { ITask, ITaskDocument } from "@/models/Tasks";
import { taskService } from "@/service/taskService";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function TaskEditPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [task, setTask] = useState<ITaskDocument | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchTaskById = async () => {
      if (!id) return;
      try {
        const response = await taskService.getTaskById(id as string);
        setTask(response);
        setIsLoading(false);
      } catch (error: any) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchTaskById();
  }, [id]);

  const handleUpdateTask = async (task: ITask) => {
    try {
      const response = await taskService.updateTask(
        id as string,
        task as ITaskDocument
      );
      alert(response.message);
      router.push("/tasks/list");
    } catch (error: any) {
      alert(error.message);
      setError(error.message);
      setIsLoading(false);
    }
  };
  if (isLoading)
    return <div className="text-center mt-8">Cargando...</div>;
  if (error)
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  if (!task) return <div className="text-center mt-8">Tarea no encontrada</div>;

  return (
    <>
      <TaskForm
        initialData={task}
        onSubmit={handleUpdateTask}
        titleText="Edit Task"
        buttonText="Update"
      />
    </>
  );
}
