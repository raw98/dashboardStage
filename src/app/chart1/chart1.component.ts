import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { Chart1Service } from '../services/chart1.service';
import { GlobalsService } from '../services/globals.service';
@Component({
  selector: 'app-chart1',
  templateUrl: './chart1.component.html',
  styleUrls: ['./chart1.component.scss']
})
export class Chart1Component implements OnInit {
    currentYear: number = new Date().getFullYear();
    Highcharts = Highcharts;
    chartOptions!: {};
//  @Input() text= ''
//  @Input() color= '';
    @Input() variable = ''
    categories = [(this.currentYear-2).toString(), (this.currentYear-1).toString(), (this.currentYear).toString()]
    constructor(public chart1Service : Chart1Service, public globalsService: GlobalsService) { }
  
    ngOnInit() {
        this.globalsService.filters.subscribe(filter=>{
            console.log("filter chart1:::"+ JSON.stringify(filter))
            let continent ="none",
                dateDebut= "none",
                dateFin= "none",
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
            this.viewData(continent,produit);
       })
        
      }
    treatment(data :any, text: string, color: string){
        let list =new Map<number, number>() 
        data.forEach((e: { year: number; chiffre: number; }) => {
            list.set(e.year, e.chiffre)
        })
        let values: number[]=[]
        this.categories.forEach(c => {
            values.push(list.get(Number(c))!)
        })
        this.setData(text, color, values);
    }
    viewData(continent : string,produit: string){
       
        switch(this.variable){
            case "chiffre_affaire": {
                const text="chiffre d'affire";
                const color="#e0a800";
                if( continent.localeCompare("All")!= 0 && continent.localeCompare("none") !=0){
                    this.chart1Service.getAffaireByContinent(continent.toLowerCase()).subscribe(chiffre=>{
                        this.treatment(chiffre,text +" dans " +continent, color);
                        console.log("by cont"+continent);
                    })
                }
                else{
                this.chart1Service.get("affaire").subscribe(chiffre => {
                    this.treatment(chiffre,text,color);

                })}
                
            }break;
            case "produit": {
                const text = "Produits vendus",
                color = "rgb(247, 163, 92)";
                if(produit.localeCompare("All") !=0 && produit.localeCompare("none") !=0){
                    console.log(produit);
                    this.chart1Service.getProduitByTypeProduit(produit.toLowerCase()).subscribe(chiffre=>{
                        this.treatment(chiffre,produit+" vendus", color);
                    })
                }else{
                this.chart1Service.get("produit").subscribe(produit => {
                    this.treatment(produit, text, color)
                })}
                break
            }
            case "client": {
                const text = "Nbr de clients",
                color = "#20c997"
                if( continent.localeCompare("All")!= 0 && continent.localeCompare("none") !=0){
                    this.chart1Service.getClientByContinent(continent.toLowerCase()).subscribe(chiffre=>{
                        this.treatment(chiffre, text +" dans " +continent,color);
                        console.log("by cont"+continent);
                    })
                }
                else{
                this.chart1Service.get("client").subscribe(client => {
                    this.treatment(client, text, color)
                })}
                break
            }
        }
        
    }
    setData( text : any, chartColor : any , values: any){
        this.chartOptions={
            chart: {
                type: 'area'
            },
            title: {
                text: text,
                style :{
                    fontSize: '16px' }
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
                    text: this.variable,
                }
            },
            tooltip: {
                valueSuffix: ' millions'
            },
            plotOptions: {
                area: {
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
                name:text,
                data: values,
                color: chartColor
            }]}

           //console.log("text & color & values:"+ text+ "___"+ chartColor+ "___"+values)
    }
}
