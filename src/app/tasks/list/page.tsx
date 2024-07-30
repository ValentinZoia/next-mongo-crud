"use client";


import { ITaskDocument } from "@/models/Tasks";
import { taskService } from "@/service/taskService";
import TaskCard from "@/components/TaskCard/TaskCard";
import { useEffect, useState } from "react";

export default function TasksListPage(): JSX.Element {
  const [tasks, setTasks] = useState<ITaskDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      const response = await taskService.getAllTasks();
      setTasks(response);
      setIsLoading(false);
    } catch (error) {
      setError("Ocurrio un error al obtener las tareas");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDeleteTask = (deletedTaskId: string) => {
    const filteredTasks = tasks.filter((task) => task._id !== deletedTaskId);
    setTasks(filteredTasks);
    console.log(tasks)
  };

  if (isLoading)
    return <div className="text-center mt-8">Cargando tareas...</div>;
  if (error)
    return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <>
      

      <main className="mx-auto px-4 py-8">
        {tasks.length === 0 ? (
          <p className="text-gray-600 mt-4">No hay tareas</p>
        ) : (
          <div className="grid frid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {tasks.map((task) => (
              <TaskCard
                key={task._id as string} 
                id={task._id as string}
                title={task.title}
                time={task.time}
                description={task.description}
                onDelete={handleDeleteTask}
              />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
