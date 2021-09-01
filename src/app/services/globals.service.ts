import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {

  private messageSource: BehaviorSubject<any[]> = new BehaviorSubject(
    [{"filter": "continent", "element": "All"},
    {"filter": "year", "element": new Date().getFullYear().toString()},
    {"filter": "article", "element": "All"}]
  ); 

   
  
    public filters = this.messageSource.asObservable();
    public setFilters(value: any[]) {
      this.messageSource.next(value);
    }
    public getFilters(){
      return this.messageSource.getValue()
    }
  }
