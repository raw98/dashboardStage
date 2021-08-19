import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Bar } from '../model/bar';

@Injectable({
  providedIn: 'root'
})
export class BarChartService {
private baseURL = 'http://localhost:3002/chiffre'
  constructor(public http: HttpClient) { }

  getChiffre(year:number):Observable<Bar[]>{
    return this.http.get<Bar[]>(`${this.baseURL}/${year}`);
  }
}
