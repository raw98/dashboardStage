import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.scss']
})

export class Page1Component implements OnInit {
  text1="chiffre d'affaires"
  text2="nombre de clients"
  text3="total de produits vendus"
  @Input() filterPage1 !: any[][]
  @Input() open:boolean=false;
  myColor2="#20c997"
  myColor3="rgb(247, 163, 92)"
  variable1 = "chiffre_affaire"
  variable2 = "client"
  variable3 = "produit"
    constructor() { }

    ngOnInit(): void {
     
    }
  
}
