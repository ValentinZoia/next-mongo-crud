import axios from "axios";
import { ITaskDocument } from "@/models/Tasks";

const API_URL = process.env.API_URL || "http://localhost:3000/api/tasks";

export const taskService = {

    getAllTasks: async (): Promise<ITaskDocument[]> =>{
        try {
            const response = await axios.get(API_URL);
            return response.data.tasks;
        } catch (error) {
            throw new Error("Ocurrio un error al obtener todas las tareas")
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
            throw new Error('Ocurrio un error al obtener la tarea') 
            
        
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
            throw new Error('Ocurrio un error al crear la tarea') 
            
        
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
            throw new Error('Ocurrio un error al actualizar la tarea') 
            
        
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
            throw new Error('Ocurrio un error al eliminar la tarea') 
            
        
         }
    }


    

}