import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.scss']
})
export class PiechartComponent implements OnInit {

  public options: any = {
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: 'pie'
},
title: {
    text: 'Historique et estimation  par continent'
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
    data: [{
        name: 'Africa',
        y: 61.41,
        sliced: true,
        selected: true
    }, {
        name: 'Europe',
        y: 11.84
    }, {
        name: 'America',
        y: 10.85
    }, {
        name: 'ocenia',
        y: 4.67
   
    }]
}]}
  constructor() { }

  ngOnInit(): void {
    Highcharts.chart('container2', this.options);
  }

}
