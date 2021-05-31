import { Task } from './Task'; 
import { Module } from './module.model'

export interface Element {
    id : number;
    nom: string;
    module: Module[];
    isSelected: Task;
}