import axios from "axios";
import { ITaskDocument } from "@/models/Tasks";

const API_URL = process.env.API_URL || "/api/tasks";

export const taskService = {

    getAllTasks: async (): Promise<ITaskDocument[]> =>{
        try {
            const response = await axios.get(API_URL);
            return response.data.tasks;
        } catch (error) {
            throw new Error("An error occurred while fetching tasks")
        }
    },

    getTaskById: async (id: string): Promise<ITaskDocument> =>{
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            return response.data.task;
        } catch (error: any) {
            if(error.response && error.response.status === 400){
               throw new Error(error.response.data.message) 
            }
            throw new Error('An error occurred while fetching task') 
            
        
         }
    },

    createTask: async (task:Omit<ITaskDocument, "_id">): Promise<{task: ITaskDocument; message:string}> =>{
        try {
            const response = await axios.post(API_URL, task);
            return response.data;
        } catch (error: any) {
            if(error.response && error.response.status === 400){
               throw new Error(error.response.data.message) 
            }
            throw new Error('An error occurred while creating task') 
            
        
         }
    },

    updateTask: async (id:string, task:Partial<ITaskDocument>): Promise<{task: ITaskDocument; message:string}> =>{
        try {
            const response = await axios.put(`${API_URL}/${id}`, task);
            return response.data;
        } catch (error: any) {
            if(error.response && error.response.status === 400){
               throw new Error(error.response.data.message) 
            }
            throw new Error('An error occurred while updating task') 
            
        
         }
    },

    deleteTask: async (id:string): Promise<{message:string}> =>{
        try {
            const response = await axios.delete(`${API_URL}/${id}`);
            return response.data.message;
        } catch (error: any) {
            if(error.response && error.response.status === 400){
               throw new Error(error.response.data.message) 
            }
            throw new Error('An error occurred while deleting task') 
            
        
         }
    }


    

}