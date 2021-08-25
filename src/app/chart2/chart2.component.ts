import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Chart2Service } from '../services/chart2.service';

@Component({
  selector: 'app-chart2',
  templateUrl: './chart2.component.html',
  styleUrls: ['./chart2.component.scss']
})
export class Chart2Component implements OnInit {
    selected ="prod1"
    Highcharts = Highcharts;
    categories = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
    chartOptions !: {};
    
    prod = "prod1"
    constructor(public chart2Service : Chart2Service) { }
  
    ngOnInit() {
        
        this.viewData(this.prod)
        
      }
    viewData(prod : string){
        this.chart2Service.getData(this.prod).subscribe(d => {
            console.log(JSON.stringify(d));
            let asiaContinent :Map<string, number>= new Map<string, number>([["Lun", 0],["Mar", 0],["Mer", 0],["Jeu", 0],["Ven", 0],["Sam", 0],["Dim", 0]])
            let africaContinent = new Map<string, number>([["Lun", 0],["Mar", 0],["Mer", 0],["Jeu", 0],["Ven", 0],["Sam", 0],["Dim", 0]])
            let europeContinent = new Map<string, number>([["Lun", 0],["Mar", 0],["Mer", 0],["Jeu", 0],["Ven", 0],["Sam", 0],["Dim", 0]])
            let americaContinent = new Map<string, number>([["Lun", 0],["Mar", 0],["Mer", 0],["Jeu", 0],["Ven", 0],["Sam", 0],["Dim", 0]])
            let oceaniaContinent = new Map<string, number>([["Lun", 0],["Mar", 0],["Mer", 0],["Jeu", 0],["Ven", 0],["Sam", 0],["Dim", 0]])
            
            d.forEach(e => {
                switch(e.continent.toUpperCase()) { 
                    case "ASIA": { 
                       asiaContinent.set(e.jour, e.vente)   
                       break; 
                    } 
                    case "AFRICA": { 
                        africaContinent.set(e.jour, e.vente)
                       break; 
                    } 
                    case "EUROPE": { 
                        europeContinent.set(e.jour, e.vente)
                        break; 
                     } 
                     case "AMERICA": { 
                        americaContinent.set(e.jour, e.vente)    
                        break; 
                     } 
                     case "OCEANIA": { 
                        oceaniaContinent.set(e.jour, e.vente)  
                        break; 
                     } 
                    default: { 
                       //error ; 
                       break; 
                    } 
                 } 
            })
           
            let asia: number[] = []
            let europe: number[] = []
            let africa: number[] = []
            let america: number[] = []
            let oceania: number[] = []

            this.categories.forEach(e => {
                console.log("e : "+ e)
                if (asiaContinent.get(e) !== -1){
                    asia.push(asiaContinent.get(e)!);
                }
                if (europeContinent.get(e) !== -1){
                    europe.push(europeContinent.get(e)!);
                }
                if (africaContinent.get(e) !== -1){
                    africa.push(africaContinent.get(e)!);
                }
                if (americaContinent.get(e) !== -1){
                    america.push(americaContinent.get(e)!);
                }
                if (oceaniaContinent.get(e) !== -1){
                    oceania.push(oceaniaContinent.get(e)!);
                }
            })
            console.log("asia : "+asia)
           /* asia = [502, 635, 809, 947, 1402, 3634, 5268]
           africa = [106, 107, 111, 133, 221, 767, 1766]
            europe = [163, 203, 276, 408, 547, 729, 628]
            america =  [18, 31, 54, 156, 339, 818, 1201]
            oceania = [2, 2, 2, 6, 13, 30, 46]*/
            this.chartOptions={
                chart: {
                    type: 'area',
                },
                title: {
                    text: 'Estimation des ventes par semaine'
                },
                xAxis: {
                    categories: this.categories,
                    tickmarkPlacement: 'on',
                    title: {
                        enabled: false
                    }
                },
                yAxis: {
                    title: {
                        text: 'Vente'
                    }
                },
                tooltip: {
                    split: true,
                    valueSuffix: ' millions'
                },
                plotOptions: {
                    area: {
                        fill:"red",
                        stacking: 'normal',
                        lineColor: '#666666',
                        lineWidth: 1,
                        marker: {
                            lineWidth: 1,
                            lineColor: '#666666'
                        }
                    }
                },
                series: [{
                    name: 'Asia',
                    data: asia
                }, {
                    name: 'Africa',
                    data: africa
                }, {
                    name: 'Europe',
                    data: europe
                }, {
                    name: 'America',
                    data: america
                }, {
                    name: 'Oceania',
                    data: oceania
                }]}
            
        })
    }
    changeProd(event : any){
        this.prod = event.value
        this.selected = event.value
        this.viewData(this.prod)
    }

}
