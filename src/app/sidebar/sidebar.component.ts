import { AfterViewInit, Component, OnInit } from '@angular/core';

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
  articles= ["All", "Article1", "Article2"]
  clients = ["client1", "client2", "client3"]
  fournisseurs = ["fournisseur1", "fournisseur2"]
  magazins = ["magazin1", "magazin2", "magazin3"]

  selectedFilter3= "article"
  selectedFilter3Article = "All"
  selectedFilter2 = "year"
  selectedFilter2Year  = this.currentYear.toString()
  constructor() { }
  ngAfterViewInit(): void {
    
    let i
    for (i= this.currentYear-1; i> 2018; i--){
      this.years.push(i)
    }
    
  }

  ngOnInit(): void {
    
    console.log(this.selectedFilter3)

    //console.log("value : "+document.getElementById("formFilter1")?.getAttribute("value"))
    console.log(this.selectedFilter2Year)
    console.log(this.years)
  }

}
