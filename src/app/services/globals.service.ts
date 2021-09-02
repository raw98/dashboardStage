import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface typeFilter{
  filter: string,
  element: string
}
@Injectable({
  providedIn: 'root'
})
export class GlobalsService {

  private messageSource: BehaviorSubject<typeFilter[]> = new BehaviorSubject(
    [{filter: "continent", element: "All"},
    {filter: "region", element: "none"},
    {filter: "year", element: new Date().getFullYear().toString()},
    {filter: "article", element: "All"}]
  ); 

   
  
    public filters = this.messageSource.asObservable();
    public setFilters(value: typeFilter[]) {
      this.messageSource.next(value);
    }
    public getFilters(){
      return this.messageSource.getValue()
    }
  }