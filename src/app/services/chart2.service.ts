import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chart2 } from '../models/chart2';

@Injectable({
  providedIn: 'root'
})
export class Chart2Service {

  private baseURL = 'http://localhost:3000'
  constructor(public http: HttpClient) { }

  getData(prod : string):Observable<Chart2[]>{
    return this.http.get<Chart2[]>(`${this.baseURL}/${prod}`);
  }
  getDataByDate(prod : string, dateDeb : string , dateFin : string):Observable<Chart2[]>{
    return this.http.get<Chart2[]>(`${this.baseURL}/${prod}/${dateDeb}/${dateFin}`);
  }
}
