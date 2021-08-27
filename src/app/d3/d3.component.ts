import { Attribute, Component, HostListener, Input, OnInit } from '@angular/core';
import * as d3 from "d3";
declare const d33: any;
@Component({
  selector: 'app-d3',
  templateUrl: './d3.component.html',
  styleUrls: ['./d3.component.scss']
})
export class D3Component implements OnInit {
@Input() isOpen:boolean=false;
public innerWidth:number;

  constructor() { 
    this.innerWidth = window.innerWidth;

  }
  @HostListener('window:resize', ['$event'])
onResize(event:any) {
  this.innerWidth = event.target.innerWidth ;
  console.log(this.innerWidth);
  
}

  ngOnInit(): void {
    d33();
}

}
