import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface ITask {
  _id: ObjectId | string | undefined;
  title: string;
  time?: string;
  description: string;
  completed?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITaskDocument extends ITask, Document {
  _id: ObjectId | string | undefined;
  title: string;
  time?: string;
  description: string;
  completed?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const taskSchema = new Schema<ITaskDocument>(
  {
    title: { type: String, required: true },
    time: { type: String, required: false },
    description: { type: String, required: true },
    completed: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.models.Tasks || mongoose.model<ITaskDocument>("Tasks", taskSchema);
export default Task;
