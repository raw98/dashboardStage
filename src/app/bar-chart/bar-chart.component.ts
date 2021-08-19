import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { json } from 'd3-fetch';
import * as Highcharts from 'highcharts';
import { BarChartService } from '../service/bar-chart.service';
export interface IHash {
  [y: string] : number;
}
@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  selected = "2021";
  Highcharts = Highcharts;
  ChartOptions:{}={};
  categories =[
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  chiffre !:any
  mois !: string 
  data :any= [
    /*{ y: 30},
    { y: 71.5 },
    { y: 106.4 },
    { y: 129.2 },
    { y: 144.0},
    { y: 176.0 },
    { y: 135.6 },
    { y: 148.5 },
    { y: 216.4 },
    { y: 194.1 },
    { y: 95.6 },
    { y: 54.4 },*/
  ]
  barChart!: Highcharts.Options 
  list =new Map<string, number>([
    ["Jan", 0],
    ["Feb", 0],
    ["Mar", 0],
    ["Apr", 0],
    ["May", 0],
    ["Jun", 0],
    ["Jul", 0],
    ["Aug", 0],
    ["Sep", 0],
    ["Oct", 0],
    ["Nov", 0],
    ["Dec", 0]
  ]);
  year = 2021
  constructor(public barService: BarChartService) { }

  ngOnInit(): void {
 //data par défaut pour l année 2021
   this.viewData(this.year)
   
  }

  //fonction 
  viewData(year : number){
    //récuperer les data dans une map : list
    this.barService.getChiffre(year).subscribe(data => {
       data.forEach( d =>{
         this.list.set(d.mois, d.chiffre)     
       })
       //
       this.list.forEach((value: number, key: string) => {
         this.data.push({y : value});
     });
       
       //draw the barchart
       console.log(this.data);
       this.barChart= {
         chart: {
           type: 'column',
         },
         credits: {
           enabled: false,
         },
         title: {
           text: 'Vente totale',
         },
         yAxis: {
           visible: false,
           gridLineColor: '#fff',
         },
         legend: {
           enabled: false,
         },
         xAxis: {
           lineColor: '#fff',
           categories: this.categories,
         },
       
         plotOptions: {
           series: {
             borderRadius: 5,
           } as any,
         },
       
         series: [
           {
             type: 'column',
             color: '#506ef9',
             data: this.data,
           },
         ],
       };
    
    
})
  }
  changeYear(event :any){
    this.data.splice(0, this.data.length)
    this.year = event.value
    this.viewData(this.year)
  }
}
