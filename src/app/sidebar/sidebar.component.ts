import { AfterViewInit, Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { GlobalsService } from '../services/globals.service';
interface typeFilter{
  filter: string,
  element: any
}
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements AfterViewInit, OnInit {
  filters = ["continent", "dateDebut", "dateFin", "produit", "client", "fournisseur", "magazin"]

  panelOpenState = false;
  currentYear: number = new Date().getFullYear();
  continents = ["All", "Asia", "Africa", "Europe", "America", "Oceania"]
  years :number[] = []
  days = [];
  products= ["All", "prod1", "prod2"]
  clients = ["All", "Client1", "Client2"]
  magasins = ["All", "Magazin1", "Magazin2"]
  fournisseurs = ["All", "Fournisseur1", "Fournisseur2"]

  selectedProduct = "All"
  selectedClient !: string
  selectedFournisseur !: string
  selectedMagazin !: string
  selectedContinent = "All"

  numbers:number[];
  filterForm = new FormGroup({
    dateDebut: new FormControl(''),
    dateFin: new FormControl(''),
    continent: new FormControl(''),
    region: new FormControl(''),
    produit: new FormControl(''),
    client: new FormControl(''),
    fournisseur: new FormControl(''),
    magazin: new FormControl('')
  });
  constructor(public globalsService : GlobalsService, private formBuilder: FormBuilder ) {
    this.numbers=Array(31).fill(1).map((x, i) => i + 1);
  }
  ngAfterViewInit(): void {
    
    let i
    for (i= this.currentYear-1; i> 2018; i--){
      this.years.push(i)
    }

   
  }
  ngOnInit(): void {
    
   
  }
 
  setFilters(){
    console.log("filter global inial: "+ JSON.stringify(this.globalsService.getFilters()))
    
    console.log(this.filterForm.getRawValue())
    let filterList : typeFilter[] = []

    this.filters.forEach(e => {
     
      if (this.filterForm.get(e)?.value === ""){
        filterList.push({filter: e, element: "none"})
      }
      else{
        if (e === "dateDebut" || e === "dateFin"){
          let dateValue = this.filterForm.get(e)?.value
          let dateString = (dateValue["year"] ).toString();

          if(dateValue["month"] <10){
            dateString= dateString +'-' +"0"+dateValue["month"] ;
          }
          else{
            dateString= dateString +'-'+dateValue["month"] ;
          }
          if(dateValue["day"] <10){
            dateString= dateString +'-' +"0"+dateValue["day"] ;
          }
          else{
            dateString= dateString +'-'+dateValue["day"] ;
          }

          let date = dateString

          console.log("format date:"+ date)
          filterList.push({filter: e, element: date})
          
        }
        else{
        filterList.push({filter: e, element: this.filterForm.get(e)?.value})
        }
      }
    })
  
    this.globalsService.setFilters(filterList)
   // let newVar= this.globalsService.getFilters()
    //console.log("filters globals after set: "+ JSON.stringify("filterlist: "+JSON.stringify(newVar)))
  }
  onContinentChange(event: any){
    this.selectedContinent = event.value
  }

/*
  public onDateChange(event: any) {
    let date=  event.target.value;
    console.log(this.selectedDate)
    console.log(event.target.value)
  }*/
 
 
  onClientChange(event: any){
    this.selectedClient = event.value
  }
  onFournisseurChange(event: any){
    this.selectedFournisseur = event.value
  }
  onProductChange(event: any){
    this.selectedProduct = event.value
  }
  onMagazinChange(event: any){
    this.selectedMagazin = event.value
  }
 
}
