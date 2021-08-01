import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.scss']
})

export class Page1Component implements OnInit {
  text1="chiffre d'affaires"
  myColor2="#20c997"
  myColor3="rgb(247, 163, 92)"
  text2="nombre de clients"
  text3="total de produits vendus"
    constructor() { }

    ngOnInit(): void {
    }
  
}
