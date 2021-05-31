import { Task } from './Task'; 
//import{ Filiere } from './filiere.model';

export interface Module {
    //id : number;
    name: string;
    //filieres: Filiere[];
    isSelected: Task;
}