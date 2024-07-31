import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface ITask {
  _id?: ObjectId | string | undefined;
  title: string;
  time?: string;
  description: string;
  completed?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITaskDocument extends Document {
  _id?: ObjectId | string | undefined;
  title: string;
  time?: string;
  description: string;
  completed?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const taskSchema: Schema = new Schema(
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

const Task = mongoose.models.Task || mongoose.model<ITaskDocument>("Task", taskSchema) ;
export default Task;
