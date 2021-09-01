import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BarChart } from '../models/bar-chart';

@Injectable({
  providedIn: 'root'
})
export class BarChartService {

  private baseURL = 'http://localhost:3000/ca'
  constructor(public http: HttpClient) { }

  getChiffre(year:number):Observable<BarChart[]>{
    return this.http.get<BarChart[]>(`${this.baseURL}/${year}`);
  }
}
