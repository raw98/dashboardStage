import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { BarChartService } from '../services/bar-chart.service';
import { GlobalsService } from '../services/globals.service';


@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  selected = "2021";
  Highcharts = Highcharts;
  ChartOptions!:{};
  categories =['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', ]
  chiffre !:any
  mois !: string 
  data :any= []
  barChart!: Highcharts.Options 
  list =new Map<string, number>([["Jan", 0], ["Feb", 0], ["Mar", 0], ["Apr", 0], ["May", 0], ["Jun", 0],
   ["Jul", 0], ["Aug", 0], ["Sep", 0], ["Oct", 0], ["Nov", 0], ["Dec", 0]]);

  
  constructor(public barService: BarChartService, public globalsService: GlobalsService) { }

  ngOnInit(): void {
    this.globalsService.filters.subscribe(filter=>{
      let newVar= this.globalsService.getFilters()
      console.log("barChart: "+ JSON.stringify(newVar))
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
   
      this.viewData(continent, region, year, week, day, article, client, fournisseur, magazin)
  }
  )
 
   
  }

  //fonction 
  viewData(continent: string, region: string, year: number, week: number, day: string, article: string, client: string, fournisseur: string, magazin: string){
    //récuperer les data dans une map : list
    this.barService.getChiffre(continent, region, year, week, day, article, client, fournisseur, magazin).subscribe(data => {
      this.data.splice(0, this.data.length)
      data.forEach( d =>{
        this.list.set(d.mois, d.chiffre)     
      })
       //
      this.list.forEach((value: number, key: string) => {
        this.data.push({y : value});
      });
       
       //draw the barchart
      // console.log(this.data);
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
  /*changeYear(event :any){
    this.data.splice(0, this.data.length)
    this.year = event.value
    this.viewData(continent, region, year, week, day, article, client, fournisseur, magazin)
  }*/
}
