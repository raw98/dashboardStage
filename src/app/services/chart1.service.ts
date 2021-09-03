import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chart1 } from '../models/chart1';

@Injectable({
  providedIn: 'root'
})
export class Chart1Service {

  private baseURL = 'http://localhost:3000/chiffre'
  constructor(public http: HttpClient) { }

  get(type : string):Observable<Chart1[]>{
    return this.http.get<Chart1[]>(`${this.baseURL}/${type}`);
  }
  getChart1Data(continent: string, region: string, year: number, week: number, day: string, article: string, client: string, fournisseur:string, magazin: string):Observable<Chart1[]>{
    return this.http.get<Chart1[]>(`${this.baseURL}/${continent}/${region}/${year}/${week}/${day}/${article}/${client}/${fournisseur}/${magazin}`);
  }
}
