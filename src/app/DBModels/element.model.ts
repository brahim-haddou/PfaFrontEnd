import { Task } from './Task';

export interface Element {
    id: number;
    nom: string;
    moduleId?: number;
    isSelected: Task;
}
