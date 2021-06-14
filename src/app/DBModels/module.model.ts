import { Task } from './Task'; 
import{ Filiere } from './filiere.model';

export interface Module {
    id : number;
    nom: string;
    filieres: Filiere[];
    isSelected: Task;
}