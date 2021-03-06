import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Chart2Service } from '../services/chart2.service';
import { GlobalsService } from '../services/globals.service';

@Component({
  selector: 'app-chart2',
  templateUrl: './chart2.component.html',
  styleUrls: ['./chart2.component.scss']
})
export class Chart2Component implements OnInit {
    selected ="prod1"
    Highcharts = Highcharts;
    //les catégories doivent etre initialise par les jours de la semaine actuelle lors de l'alimentaion de la base
    categories = ['2021-09-01', '2021-09-02', '2021-09-03', '2021-09-04', '2021-09-05','2021-09-06','2021-09-07','2021-09-08']//pour tester on a choisis d'afficher 5 dates
    chartOptions !: {};
    
    prod = "prod1"
    constructor(public chart2Service : Chart2Service, public globalsService: GlobalsService) { }
  
    ngOnInit() {
        this.globalsService.filters.subscribe(filter=>{
            console.log("chart2"+ JSON.stringify(filter))
            let continent ="none",
                dateDebut= "",
                dateFin= "",
                produit ="none",
                client ="none",
                fournisseur ="none",
                magazin ="none";
            filter.forEach(value => {
                switch(value.filter){
                case 'continent': continent = value.element;
                            break;
                case 'dateDebut': dateDebut = value.element;
                            break;
                case 'dateFin' : dateFin = value.element;
                            break;
                case 'produit': produit = value.element;
                            break;
                case 'fournisseur': fournisseur = value.element;
                            break;
                case 'client': client = value.element;
                            break;
                case 'magazin': magazin = value.element;
                            break;
                }
            })
            if((produit.localeCompare("All") == 0 || produit.localeCompare("none") ==0 )&&
            (dateDebut.localeCompare("All") == 0   || dateDebut.localeCompare("none") ==0 )&&
            (dateFin.localeCompare("All") == 0   || dateFin.localeCompare("none") ==0 )&& 
            (continent.localeCompare("All") == 0   || continent.localeCompare("none") ==0 )
            ){  
                this.viewData(this.prod);//par defaut
            }
            else if(produit.localeCompare("All") !=0 && produit.localeCompare("none") !=0 &&
            dateDebut.localeCompare("none") ==0 &&
            dateFin.localeCompare("none") ==0 && continent.localeCompare("none") ==0 //si seulement le produit est séléctionné
            ){
                this.viewData(produit);
            }
            else if(produit.localeCompare("none") !=0 && dateDebut.localeCompare("none") !=0 &&
            dateFin.localeCompare("none") !=0 && continent.localeCompare("none")==0//si seulement le produit est séléctionné avec les dates
            ){  
                this.viewData(produit,dateDebut,dateFin);
            }
            else if(produit.localeCompare("none") !=0 &&
            dateDebut.localeCompare("none") !=0 &&
            dateFin.localeCompare("none") !=0  && continent.localeCompare("none")!=0//si seulement le produit est séléctionné avec les dates
            ){ 
                this.viewData(produit,dateDebut,dateFin,continent);
            }


            else if((produit.localeCompare("All") == 0 || produit.localeCompare("none") ==0 )&&
            dateDebut.localeCompare("none") !=0 &&
            dateFin.localeCompare("none") !=0 //si seulementes dates sont selectionnés par defaut afficher les données de prod1
            ){  
                this.viewData(this.prod,dateDebut,dateFin);
            }
            else if((produit.localeCompare("All") == 0 || produit.localeCompare("none") ==0 )&&
           ( dateDebut.localeCompare("All") ==0 || dateDebut.localeCompare("none") ==0 )&&
            (dateFin.localeCompare("none") ==0 || dateDebut.localeCompare("none") ==0)&&
            (continent.localeCompare("none")!=0 &&continent.localeCompare("All")!=0)//si seulement le contient est selectionné
            ){  
                this.viewData(this.prod,this.categories[0],this.categories[7],continent);
            }
            else{
            this.viewData(this.prod)}
        })
        
        
      }
      
    viewData(prod : string, dateDeb : string=this.categories[0] , dateFin : string=this.categories[7],continent : string = "All"){
        this.chart2Service.getDataByDate(prod,dateDeb,dateFin).subscribe(d => {
            
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
            //keys pour avoir les jours filtrés
            let keys : string[] =Array.from(africaContinent.keys());
            let asia: number[] = []
            let europe: number[] = []
            let africa: number[] = []
            let america: number[] = []
            let oceania: number[] = []

            keys.forEach(e => {
                
                if (asiaContinent.get(e)){
                    asia.push(asiaContinent.get(e)!);
                }
                if (europeContinent.get(e)){
                    europe.push(europeContinent.get(e)!);
                }
                if (africaContinent.get(e)){
                    africa.push(africaContinent.get(e)!);
                }
                if (americaContinent.get(e)){
                    america.push(americaContinent.get(e)!);
                }
                if (oceaniaContinent.get(e)){
                    oceania.push(oceaniaContinent.get(e)!);
                }
            })
           
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
                series:  this.getSerie(continent,asia,africa,europe,america,oceania) }
            
        })
    }
getSerie(continent : string , asia :any , africa:any , europe:any , america:any , oceania:any){
   let serie1:{name:string , data :any}[]=[{
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
    }];
    if(continent.localeCompare("All")==0  || continent.localeCompare("Africa")==0){
        serie1=serie1.slice(1,2);
        console.log(continent + serie1)
        return serie1;
    }
    else if(continent.localeCompare("Asia")==0){
        serie1=serie1.slice(0,1);
        console.log(continent + serie1)
        return serie1;
    }
    else if(continent.localeCompare("Europe")==0){
        serie1=serie1.slice(2,3);
        console.log(continent + serie1)

        return serie1;
    }
    else if(continent.localeCompare("America")==0){
        serie1=serie1.slice(3,4);
        console.log(continent + serie1)

        return serie1;
    }
    serie1=serie1.slice(4,5);
    console.log(continent + serie1)

    return serie1;
    
}
 
}
