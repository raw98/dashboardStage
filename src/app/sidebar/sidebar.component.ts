import { AfterViewInit, Component, OnInit, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements AfterViewInit, OnInit {
  
  @Output() filter = new EventEmitter<any[]>();
  panelOpenState = false;
  currentYear: number = new Date().getFullYear();
  continents = ["All", "Asia", "Africa", "Europe", "America", "Oceania"]
  years :number[] = []
  days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samdi", "Dimanche"]
  articles= ["All", "Article1", "Article2"]

  selectedFilter3 ="article"
  selectedFilter3Article ="All"
  
  selectedFilter2 = "year"
  selectedFilter2Year  = this.currentYear.toString()
  selectedFilter2Week !: string
  selectedFilter2Day !: string

  selectedFilter1 = "continent"
  selectedFilter1Continent = "All"
  constructor() { }
  ngAfterViewInit(): void {
    
    let i
    for (i= this.currentYear-1; i> 2018; i--){
      this.years.push(i)
    }
    
  }

  ngOnInit(): void {
    
   
  }
  
  emitItems(){
    
    let emitList = []
    let selectedFilter2Element !:string
    switch (this.selectedFilter2){
      case 'year':
        selectedFilter2Element = this.selectedFilter2Year;
        break;
      case 'week':
        selectedFilter2Element = this.selectedFilter2Week;
        break;
      case 'day':
        selectedFilter2Element = this.selectedFilter2Day;
        break;
    }
    emitList.push([this.selectedFilter2 , selectedFilter2Element])

    if (this.selectedFilter3 === 'article')
    {
      emitList.push([this.selectedFilter3, this.selectedFilter3Article])
    }
    else emitList.push([this.selectedFilter3])
    emitList.forEach(e => console.log("e :" + e))
    this.filter.emit(emitList);
  }

  public onValChange(val: string) {
    this.selectedFilter2 = val;
  }
  onYearChange(event: any){
    this.selectedFilter2Year = event.value
    console.log(this.selectedFilter2Year)
  }
  onWeekChange(event: any){
    this.selectedFilter2Week = event.value
  }
  onDayChange(event: any){
    this.selectedFilter2Day = event.value
  }

  onFilter3Change(val: string){
    this.selectedFilter3 = val;
  }
  onArticleChange(event: any){
    this.selectedFilter3Article = event.value
  }

  onContinentChange(event: any){
    this.selectedFilter1Continent = event.value
  }
  onFilter1Change(val: string){
    this.selectedFilter1 = val;
  }
}
