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
            let continent ="none",
                region ="none",
                year = 0,
                week = 0,
                day ="none",
                article ="none",
                client ="none",
                fournisseur ="none",
                magazin ="none";
            filter.forEach(value => {
        
            switch(value.filter){
            case 'continent': continent = value.element;
                        break;
            case 'region': region = value.element;
                        break;
            case 'year': year = Number(value.element);
                        break;
            case 'week': week = Number(value.element);
                        break;
            case 'day': day = value.element;
                        break;
            case 'article': article = value.element;
                        break;
            case 'fournisseur': fournisseur = value.element;
                        break;
            case 'client': client = value.element;
                        break;
            case 'magazin': magazin = value.element;
                        break;
            }
            })
            //this.viewData(continent, region, year, week, day, article, client, fournisseur, magazin)
            this.viewData()
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
    viewData(){
       
        switch(this.variable){
            case "chiffre_affaire": {
                this.chart1Service.get("affaire").subscribe(chiffre => {
                    this.treatment(chiffre, "chiffre d'affaire", "#e0a800")
                })
                break
            }
            case "produit": {
                this.chart1Service.get("produit").subscribe(produit => {
                    
                    const text = "Produits vendus",
                    color = "rgb(247, 163, 92)"
                    this.treatment(produit, text, color)
                })
                break
            }
            case "client": {
                this.chart1Service.get("client").subscribe(client => {
                    const text = "Nombre des clients",
                    color = "#20c997"
                    this.treatment(client, text, color)
                })
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
                text: text
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
                    text: this.variable
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

           // console.log("text & color & values:"+ text+ "___"+ chartColor+ "___"+values)
    }
}
