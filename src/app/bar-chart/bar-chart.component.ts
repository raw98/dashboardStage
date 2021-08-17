import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  Highcharts = Highcharts;
  ChartOptions:{}={};
  barChart: Highcharts.Options = {
    chart: {
      type: 'column',
    },
    credits: {
      enabled: false,
    },
    title: {
      text: 'Bar',
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
      categories: [
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
      ],
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
        data: [
          { y: 20.9},
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
          { y: 54.4 },
        ],
      },
    ],
  };
  
  constructor() { }

  ngOnInit(): void {
  }

}
