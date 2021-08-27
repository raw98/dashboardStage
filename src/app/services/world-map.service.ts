import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Localisation } from '../models/localisation';
import { WorldMap } from '../models/world-map';

@Injectable({
  providedIn: 'root'
})
export class WorldMapService {

  private baseURL = 'http://localhost:3002/map'
  constructor(public http: HttpClient) { }

  getData(year : number):Observable<WorldMap[]>{
    return this.http.get<WorldMap[]>(`${this.baseURL}/${year}`);
  }
//value : fournisseur, client, boutique
  getLocalisation(value: string):Observable<Localisation[]>{
    return this.http.get<Localisation[]>(`${this.baseURL}/${value}`);
  }
}
