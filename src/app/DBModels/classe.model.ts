import { Task } from './Task'; 
import { Element } from './element.model'

export interface Classe {
    id : number;
    nom: string;
    type: string;
    maxEtudiant: number;
    elements: Element[];
    isSelected: Task;
}