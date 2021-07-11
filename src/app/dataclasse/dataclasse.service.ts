import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Classe } from '../DBModels/classe.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class DataClasseService{
  private _url: string = `${environment.apiBaseURL}classe`;

  constructor(private http: HttpClient){}

  getAllClasses(): Observable<Classe[]>{
    return this.http.get<Classe[]>(this._url);
  }

  getClasse(classe: Classe): Observable<Classe>{
    return this.http.get<Classe>( `${this._url}/${classe.id}`);
  }
  createClasse(classe: Classe): Observable<Classe>{
    return this.http.post<Classe>(this._url, classe);
  }

  updateClasse(classe: Classe): Observable<Classe>{
    return this.http.put<Classe>(this._url, classe);
  }
  deleteClasse(classe: Classe): Observable<string>{
    return this.http.delete<string>( `${this._url}/${classe.id}`);
  }

}
