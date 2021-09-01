import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PieChart } from '../models/pie-chart';

@Injectable({
  providedIn: 'root'
})
export class PieChartService {

  private baseURL = 'http://localhost:3000/vente'
  constructor(public http: HttpClient) { }

  getData(prod : string, year : number):Observable<PieChart[]>{
    return this.http.get<PieChart[]>(`${this.baseURL}/${prod}/${year}`);

    //return this.httpClient.put(`${this.baseURL}/${prod}`,year);
  }
}
