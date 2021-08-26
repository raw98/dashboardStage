import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chart1 } from '../models/chart1';

@Injectable({
  providedIn: 'root'
})
export class Chart1Service {

  private clientURL = 'http://localhost:3002/chart1/client'
  private chiffreURL = 'http://localhost:3002/chart1/chiffre'
  private prodURL = 'http://localhost:3002/chart1/prod'
  constructor(public http: HttpClient) { }

  getClient():Observable<Chart1[]>{
    return this.http.get<Chart1[]>(`${this.clientURL}`);
  }
  getChiffre():Observable<Chart1[]>{
    return this.http.get<Chart1[]>(`${this.chiffreURL}`);
  }
  getprod():Observable<Chart1[]>{
    return this.http.get<Chart1[]>(`${this.prodURL}`);
  }
}
