import { taskService } from "@/service/taskService";
import Link from "next/link";

interface TaskCardProps {
  id: string;
  title: string;
  time?: string;
  description: string;
  onDelete: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  id,
  title,
  time,
  description,
  onDelete,
}) => {
  const deleteTask = async (id: string) => {
    try {
      if (window.confirm("Are you sure you want to delete this task?")) {
        const response = await taskService.deleteTask(id);
        alert(response);
        onDelete(id);
      }

      
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="bg-gray-200 p-4 flex flex-col justify-between">
      <section className="text-red mb-4">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl">{title}</h3>
          {time ? (
            <h2 className="text-gray-500 text-lg">{time}</h2>
          ) : (
            <h2 className="text-gray-500 text-lg">No time</h2>
          )}
        </div>

        <p>{description}</p>
      </section>
      <section className="flex gap-4">
        <button
          onClick={() => deleteTask(id)}
          className="w-20 bg-red-400  py-2 rounded text-white text-center"
        >
          Delete
        </button>
        <Link
          className="w-20 bg-blue-400  py-2 rounded text-white text-center"
          href={`/tasks/edit/${id}`}
        >
          Edit
        </Link>
      </section>
    </div>
  );
};

export default TaskCard;
