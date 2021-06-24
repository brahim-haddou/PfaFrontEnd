import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Prof } from '../DBModels/prof.model';
import { Element } from '../DBModels/element.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class DataprofService{
  private _url: string = `${environment.apiBaseURL}professeur`;

  constructor(private http: HttpClient){}

  getAllProfesseurs(): Observable<Prof[]>{
    return this.http.get<Prof[]>(this._url);
  }

  getProfesseur(id: number): Observable<Prof>{
    return this.http.get<Prof>( `${this._url}/${id}`);
  }
  createProfesseur(prof: Prof) : Observable<Prof>{
    return this.http.post<Prof>(this._url, prof);
  }

  updateProfesseur(prof: Prof) : Observable<Prof>{
    return this.http.put<Prof>(this._url, prof);
  }
  deleteProfesseur(id: number): Observable<string>{
    return this.http.delete<string>( `${this._url}/${id}`);
  }

  getProfesseurElements(id: number): Observable<Element[]>{
    return this.http.get<Element[]>( `${this._url}/${id}/elements`);
  }


}
