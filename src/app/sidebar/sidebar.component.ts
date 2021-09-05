import { AfterViewInit, Component, OnInit} from '@angular/core';
import { GlobalsService } from '../services/globals.service';
interface typeFilter{
  filter: string,
  element: string
}
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements AfterViewInit, OnInit {
  

  panelOpenState = false;
  currentYear: number = new Date().getFullYear();
  continents = ["All", "Asia", "Africa", "Europe", "America", "Oceania"]
  years :number[] = []
  days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samdi", "Dimanche"]
  products= ["All", "Article1", "Article2"]
  clients = ["All", "Client1", "Client2"]
  magazins = ["All", "Magazin1", "Magazin2"]
  fournisseurs = ["All", "Fournisseur1", "Fournisseur2"]

  selectedFilter3 !:string
  selectedFilter3Product ="All"
  selectedFilter3Client = "All"
  selectedFilter3Fournisseur = "All"
  selectedFilter3Magazin = "All"
  
  selectedFilter2 = "year"
  selectedFilter2Year  = this.currentYear.toString()
  selectedFilter2Week !: string
  selectedFilter2Day !: string

  selectedFilter1 = "continent"
  selectedFilter1Continent = "All"
  selectedFilter1Region !:string
  constructor(public globalsService : GlobalsService ) { }
  ngAfterViewInit(): void {
    
    let i
    for (i= this.currentYear-1; i> 2018; i--){
      this.years.push(i)
    }

   
  }
  ngOnInit(): void {
    
   
  }
 
  setFilters(){
    
    let filterList : typeFilter[] = []
    let selectedFilter1Element !: string
    console.log ("filter1 ::: "+this.selectedFilter1)
    if(this.selectedFilter1 === "continent"){
      console.log("continent")
      filterList.push({filter: this.selectedFilter1, element: this.selectedFilter1Continent})
      filterList.push({filter: "region", element: "none"})
    }
    else{
      filterList.push({filter: "continent", element: this.selectedFilter1Continent})
      filterList.push({filter: this.selectedFilter1, element: this.selectedFilter1Region})
    }
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
    filterList.push({filter: this.selectedFilter2, element: selectedFilter2Element})
    let strFilter3 = JSON.stringify(this.selectedFilter3).slice(1, JSON.stringify(this.selectedFilter3).length-1)
    let tabFilter3 = strFilter3.split(",")
    tabFilter3.forEach(e => {
      console.log(e.slice(1, e.length-1))
      let selectedFilter = e.slice(1, e.length-1);
      let selectedFilter3Element !: string
      switch(selectedFilter){
        case 'product': selectedFilter3Element = this.selectedFilter3Product
                        break;
        case 'magazin': selectedFilter3Element = this.selectedFilter3Magazin
                        break;
        case 'fournisseur': selectedFilter3Element = this.selectedFilter3Fournisseur
                            break;
        case 'client' : selectedFilter3Element = this.selectedFilter3Client
                        break;
      }
      filterList.push({filter: selectedFilter, element: selectedFilter3Element})
    })
   
    this.globalsService.setFilters(filterList)
    let newVar= this.globalsService.getFilters()
    console.log("filters globals after set: "+ JSON.stringify("filterlist: "+JSON.stringify(newVar)))
  }
  onFilter1Change(val: string){
    this.selectedFilter1 = val;
  }
  onContinentChange(event: any){
    this.selectedFilter1Continent = event.value
  }
  onRegionChange(event: any){
    this.selectedFilter1Region = event.value
  }

  public onFilter2Change(val: string) {
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
  onClientChange(event: any){
    this.selectedFilter3Client = event.value
  }
  onFournisseurChange(event: any){
    this.selectedFilter3Fournisseur = event.value
  }
  onProductChange(event: any){
    this.selectedFilter3Product = event.value
  }
  onMagazinChange(event: any){
    this.selectedFilter3Magazin = event.value
  }

 
}
