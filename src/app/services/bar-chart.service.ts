import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BarChart } from '../models/bar-chart';

@Injectable({
  providedIn: 'root'
})
export class BarChartService {

  //private baseURL = 'http://localhost:3000/ca'
  private baseURL = 'http://localhost:3002/chiffre'

  constructor(public http: HttpClient) { }

 /* getChiffre(continent, region, year, week, day, article, client, fournisseur, magazin):Observable<BarChart[]>{
    return this.http.get<BarChart[]>(`${this.baseURL}/${year}`);
  }*/
  getChiffre(continent: string, region: string, year: number, week: number, day: string, article: string, client: string, fournisseur:string, magazin: string):Observable<BarChart[]>{
    return this.http.get<BarChart[]>(`${this.baseURL}/${continent}/${region}/${year}/${week}/${day}/${article}/${client}/${fournisseur}/${magazin}`);
  }
}
