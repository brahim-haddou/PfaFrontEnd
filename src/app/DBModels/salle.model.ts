import { Task } from './Task'; 

export interface Salle {
    id: number;
    nom: string;
    type: string;
    maxPlace: number;
    isSelected: Task;
}