import { Classe } from './classe.model';
import { Prof } from './prof.model';
import { Salle } from './salle.model';
import { Creneau } from './creneau.model';

export interface Emploi {
    id: number;
    classe: Classe;
    professeur: Prof;
    salle: Salle;
    creneau: Creneau;

}
