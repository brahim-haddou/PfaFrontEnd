import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Module } from '../DBModels/module.model';
import { Element } from '../DBModels/element.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class DataModuleService{
  private _url: string = `${environment.apiBaseURL}module`;

  constructor(private http: HttpClient){}

  getAllModules(): Observable<Module[]>{
    return this.http.get<Module[]>(this._url);
  }

  getModule(module: Module): Observable<Module>{
    return this.http.get<Module>( `${this._url}/${module.id}`);
  }
  createModule(module: Module) : Observable<Module>{
    return this.http.post<Module>(this._url, module);
  }

  updateModule(module: Module) : Observable<Module>{
    return this.http.put<Module>(this._url, module);
  }
  deleteModule(module: Module): Observable<string>{
    return this.http.delete<string>( `${this._url}/${module.id}`);
  }

  getModuleElements(id: number): Observable<Element[]>{
    return this.http.get<Element[]>( `${this._url}/${id}/elements`);
  }

  getElements(module: Module): Observable<Element[]>{
    return this.http.get<Element[]>( `${this._url}/${module.id}/elements`);
  }

}
