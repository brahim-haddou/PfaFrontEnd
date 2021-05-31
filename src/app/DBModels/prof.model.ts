import { Task } from './Task'; 

export interface Prof {
    id : number;
    name: string;
    hour_count: number;
    isSelected: Task;
}