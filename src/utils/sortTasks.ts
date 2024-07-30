import { ITaskDocument } from "@/models/Tasks";

//funcion que convierte la hora a minutos
const convertTimeToMinutes = (time: string | undefined): number => {
    if(!time){
      return 0
    }
      const [hours, minutes] = time.split(':').map(Number);
      return hours * 60 + minutes;
    };
  
    //funcion que ordena las tareas por hora. de menor a mayor
    export const sortTasks = (tasks: ITaskDocument[]) => {
      return tasks.sort((a, b) => {
        const timeA = convertTimeToMinutes(a.time);
        const timeB = convertTimeToMinutes(b.time);
        return timeA - timeB;
      });
    };