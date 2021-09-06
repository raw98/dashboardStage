import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { GlobalsService } from '../services/globals.service';
import { PieChartService } from '../services/pie-chart.service';
@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.scss']
})
export class PiechartComponent implements OnInit {
    selectedYear= "2021"
    selectedProd = "prod1"
    options : any
    year = 2021
    data : Array<{ name: string; y: number}>= []

  constructor(public pieChartService: PieChartService, public globalsService: GlobalsService) { 
    
  }

  ngOnInit(): void {
    //console.log("filters globals page1: "+JSON.stringify(this.globalsService.filters))
   /* this.globalsService.filters.subscribe(filter=>{

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
      //this.viewData(continent, region, year, week, day, article, client, fournisseur, magazin)*/
      
      this.viewData() 
//    } ) 
    
  }
  
  viewData(){
      //appel de la méthode getPieData
    this.pieChartService.getData(this.selectedProd, this.year).subscribe(value => {

        value.forEach(e =>{
            this.data.push({name : e.continent, y : e.pourcentage})
        })

        this.options = {
            chart: {
              plotBackgroundColor: null,
              plotBorderWidth: null,
              plotShadow: false,
              type: 'pie'
          },
          title: {
              text: 'Pourcentage des ventes par continent'
          },
          tooltip: {
              pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
          },
          accessibility: {
              point: {
                  valueSuffix: '%'
              }
          },
          plotOptions: {
              pie: {
                  allowPointSelect: true,
                  cursor: 'pointer',
                  dataLabels: {
                      enabled: false
                  },
                  showInLegend: true
              }
          },
          series: [{
              name: 'Asia',
              colorByPoint: true,
              data: this.data
          }]}
          Highcharts.chart('container2', this.options);
    })
  }
  filter(){
    this.data.splice(0, this.data.length)
   this.year = Number(this.selectedYear)
   this.viewData()
  }
}
