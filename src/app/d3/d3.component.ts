import { Attribute, Component, HostListener, Input, OnInit } from '@angular/core';
import * as d3 from "d3";
import { WorldMap } from '../models/world-map';
import { WorldMapService } from '../services/world-map.service';
declare const d33: any;
@Component({
  selector: 'app-d3',
  templateUrl: './d3.component.html',
  styleUrls: ['./d3.component.scss']
})
export class D3Component implements OnInit {
  @Input() isOpen:boolean=false;
  public innerWidth:number;
  year =2021
  d3map !: WorldMap[]
  selectedValue = "none"
  selected = 'none'
    constructor(public d3MapService : WorldMapService) { 
      this.innerWidth = window.innerWidth;

    }
    @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.innerWidth = event.target.innerWidth ;
    //console.log(this.innerWidth);
    
  }

  ngOnInit(): void {
    this.viewData()
  }
  changeSelect(event: any){
    console.log(this.selectedValue)

    this.selectedValue = event.value
    this.viewData()
  }
  viewData(){
    d33(this.d3MapService, this.d3map, this.year, this.selectedValue);
  }
}
