import { Task } from './Task';

export interface Classe {
    id: number;
    nom: string;
    type: string;
    maxEtudiant: number;
    elementId?: number;
    isSelected: Task;
}
