import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Emploi } from '../DBModels/emploi.model';
import { Empreq } from '../DBModels/empreq.model';
import { Classe } from '../DBModels/classe.model';
import { Prof } from '../DBModels/prof.model';
import { Salle } from '../DBModels/salle.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import {Creneau} from '../DBModels/creneau.model';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class BuildpageService{
  // tslint:disable-next-line:variable-name
  private _url = `${environment.apiBaseURL}emploiDuTemps`;

  constructor(private http: HttpClient){}

  getFiliereEmploiDuTemps(filiereId: number): Observable<Emploi[]>{
    return this.http.get<Emploi[]>(`${this._url}/filiere/${filiereId}`);
  }
  deleteFiliereEmploiDuTemps(filiereId: number): Observable<ArrayBuffer>{
    // @ts-ignore
    return this.http.delete<string>(`${this._url}/filiere/${filiereId}`, { responseType: 'text'});
  }
  getSalleEmploiDuTemps(salleId: number): Observable<Emploi[]>{
    return this.http.get<Emploi[]>(`${this._url}/salle/${salleId}`);
  }
  saveEmploiDuTemps(empreq: Empreq): Observable<Emploi>{
    return this.http.post<Emploi>(this._url, empreq);
  }
  updateEmploiDuTemps(empreq: Empreq): Observable<Emploi>{
    return this.http.put<Emploi>(this._url, empreq);
  }
  deleteEmploiDuTemps(emploiId: number): Observable<string>{
    return this.http.delete<string>(`${this._url}/${emploiId}`);
  }
  // -------------- update
  updateClasseEmploiDuTemps(emploiId: Emploi, classe: Classe): Observable<Emploi>{
    // @ts-ignore
    return this.http.put<Emploi>(`${this._url}/${emploiId.id}/classe/${classe.id}`);
  }
  updateProfesseurEmploiDuTemps(emploiId: Emploi, prof: Prof): Observable<Emploi>{
    // @ts-ignore
    return this.http.put<Emploi>(`${this._url}/${emploiId.id}/professeur/${prof.id}`);
  }
  updateSalleEmploiDuTemps(emploiId: Emploi, salle: Salle): Observable<Emploi>{
    // @ts-ignore
    return this.http.put<Emploi>(`${this._url}/${emploiId.id}/salle/${salle.id}`);
  }
  // -------------- delete
  deleteClasseFromEmploiDuTemps(emploiId: number): Observable<Emploi>{
    // @ts-ignore
    return this.http.delete<Emploi>(`${this._url}/${emploiId}/classe`);
  }
  deleteProfesseurFromEmploiDuTemps(emploiId: number): Observable<Emploi>{
    // @ts-ignore
    return this.http.delete<Emploi>(`${this._url}/${emploiId}/professeur`);
  }
  deleteSalleFromEmploiDuTemps(emploiId: number): Observable<Emploi>{
    // @ts-ignore
    return this.http.delete<Emploi>(`${this._url}/${emploiId}/salle`);
  }
  // -------------- excel
  excelFiliereEmploiDuTemps(filiereId: number): Observable<Blob> {
    return this.http.get(`${this._url}/filiere/${filiereId}/excel`, { responseType: 'blob' });
  }

  excelSalleEmploiDuTemps(salleId: number): Observable<Blob> {
    return this.http.get(`${this._url}/salle/${salleId}/excel`, { responseType: 'blob' });
  }
  // ------- Creneau
  getCreneau(id: number): Observable<Creneau[]> {
    return this.http.get<Creneau[]>(`${environment.apiBaseURL}creneau/${id}`);
  }
  createCreneau(creneau: Creneau[]): Observable<Creneau[]> {
    return this.http.post<Creneau[]>(`${environment.apiBaseURL}creneau`, creneau);
  }
  deleteCreneau(id: number): Observable<ArrayBuffer> {
    // @ts-ignore
    return this.http.delete<string>(`${environment.apiBaseURL}creneau/${id}`, { responseType: 'text'});
  }
}
