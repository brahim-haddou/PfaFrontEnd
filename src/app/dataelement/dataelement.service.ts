import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Element } from '../DBModels/element.model';
import { Classe } from '../DBModels/classe.model';
import { Prof } from '../DBModels/prof.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class DataElementService{
  private _url: string = `${environment.apiBaseURL}element`;

  constructor(private http: HttpClient){}

  getAllElements(): Observable<Element[]>{
    return this.http.get<Element[]>(this._url);
  }

  getElement(element: Element): Observable<Element>{
    return this.http.get<Element>( `${this._url}/${element.id}`);
  }
  createElement(element: Element) : Observable<Element>{
    return this.http.post<Element>(this._url, element);
  }

  updateElement(element: Element) : Observable<Element>{
    return this.http.put<Element>(this._url, element);
  }
  deleteElement(element: Element): Observable<string>{
    return this.http.delete<string>( `${this._url}/${element.id}`);
  }

  getElementClasses(id: number): Observable<Classe[]>{
    return this.http.get<Classe[]>( `${this._url}/${id}/classes`);
  }
  getClasses(element: Element): Observable<Classe[]>{
    return this.http.get<Classe[]>( `${this._url}/${element.id}/classes`);
  }
  
  getProfesseurElement(id: number): Observable<Prof[]>{
    return this.http.get<Prof[]>( `${this._url}/${id}/professeurs`);
  }


}
