import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Salle } from '../DBModels/salle.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class DatasalleService{
  private _url: string = `${environment.apiBaseURL}salle`;

  constructor(private http: HttpClient){}

  getAllSalles(): Observable<Salle[]>{
    return this.http.get<Salle[]>(this._url);
  }
  getAllSallesByTypeAndPlace(type: string, place: number): Observable<Salle[]>{
    return this.http.get<Salle[]>(`${this._url}/${type}/${place}`);
  }

  getSalle(id: number): Observable<Salle>{
    return this.http.get<Salle>( `${this._url}/${id}`);
  }
  createSalle(salle: Salle) : Observable<Salle>{
    return this.http.post<Salle>(this._url, salle);
  }

  updateSalle(salle: Salle) : Observable<Salle>{
    return this.http.put<Salle>(this._url, salle);
  }
  deleteSalle(salle: Salle): Observable<string>{
    return this.http.delete<string>( `${this._url}/${salle.id}`);
  }


}
