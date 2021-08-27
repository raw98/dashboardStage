import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}
