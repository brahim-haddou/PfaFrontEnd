import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Filiere } from '../DBModels/filiere.model';
import { Element } from '../DBModels/element.model';
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

  getFiliere(id: number): Observable<Filiere>{
    return this.http.get<Filiere>( `${this._url}/${id}`);
  }
  createFiliere(filiere: Filiere) : Observable<Filiere>{
    return this.http.post<Filiere>(this._url, filiere);
  }

  updateFiliere(filiere: Filiere) : Observable<Filiere>{
    return this.http.put<Filiere>(this._url, filiere);
  }
  deleteFiliere(id: number): Observable<string>{
    return this.http.delete<string>( `${this._url}/${id}`);
  }

  getFiliereElements(id: number): Observable<Element[]>{
    return this.http.get<Element[]>( `${this._url}/${id}/elements`);
  }


}
