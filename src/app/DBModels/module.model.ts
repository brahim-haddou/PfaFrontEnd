import { Task } from './Task';

export interface Module {
    id: number;
    nom: string;
    filiereId?: number;
    isSelected: Task;
}
