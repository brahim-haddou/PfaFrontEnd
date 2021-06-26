import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Filiere } from '../DBModels/filiere.model';
import { Module } from '../DBModels/module.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class DatafiliereService{
  private _url: string = `${environment.apiBaseURL}filiere`;

  constructor(private http: HttpClient){}

  getAllFilieres(): Observable<Filiere[]>{
    return this.http.get<Filiere[]>(this._url);
  }

  getFiliere(filiere: Filiere): Observable<Filiere>{
    return this.http.get<Filiere>( `${this._url}/${filiere.id}`);
  }
  createFiliere(filiere: Filiere) : Observable<Filiere>{
    return this.http.post<Filiere>(this._url, filiere);
  }

  updateFiliere(filiere: Filiere) : Observable<Filiere>{
    return this.http.put<Filiere>(this._url, filiere);
  }
  deleteFiliere(filiere: Filiere): Observable<string>{
    return this.http.delete<string>( `${this._url}/${filiere.id}`);
  }

  getFiliereModules(id: number): Observable<Module[]>{
    return this.http.get<Module[]>( `${this._url}/${id}/modules`);
  }

  getModules(filiere: Filiere): Observable<Module[]>{
    return this.http.get<Module[]>( `${this._url}/${filiere.id}/modules`);
  }


}
