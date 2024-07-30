import { ITask } from "@/models/Tasks";
import React, { ChangeEvent, useEffect, useState } from "react";

interface TaskFormProps {
  initialData?: ITask;
  onSubmit: (data: ITask) => void;
  titleText: string;
  buttonText: string;
}

const TaskForm: React.FC<TaskFormProps> = ({
  initialData,
  onSubmit,
  titleText,
  buttonText,
}) => {
  const [newTask, setNewTask] = useState({
    title: initialData?.title || "",
    time: initialData?.time || "",
    description: initialData?.description || "",
  });

  useEffect(() => {
    setNewTask({
      title: initialData?.title || "",
      time: initialData?.time || "",
      description: initialData?.description || "",
    });
  }, [initialData]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setNewTask({ ...newTask, [e.target.name]: e.target.value });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(newTask);
  };

  return (
    <main className="w-full h-screen flex  justify-center items-center ">
      <div className="bg-gray-300 p-5 flex flex-col justify-start items-center">
        <h1 className="text-balck text-3xl mb-4">{titleText}</h1>
        <form onSubmit={handleSubmit} >
          <div className="flex flex-col mb-4">
            <label htmlFor="title">Title:</label>
            <input
              className="border border-gray-300 rounded p-2"
              type="text"
              name="title"
              placeholder="Title"
              value={newTask.title}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="title">Time:</label>
            <input
              className="border border-gray-300 rounded p-2"
              type="time"
              name="time"
              placeholder="Time"
              value={newTask.time}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="description">Description:</label>
            <textarea
              className="border border-gray-300 rounded p-2"
              id="description"
              name="description"
              placeholder="Description"
              value={newTask.description}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-20 bg-blue-400  py-2 rounded text-white text-center"
          >
            {buttonText}
          </button>
        </form>
      </div>
    </main>
  );
};

export default TaskForm;
