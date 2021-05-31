import { Task } from './Task'; 

export interface Creneau {
    id : number;
    jour: string;
    debut: number;
    fin: number;
    isSelected: Task;
}