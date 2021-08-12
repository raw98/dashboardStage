import { Component, OnInit } from '@angular/core';
import * as d3 from "d3";
declare const d33: any;
@Component({
  selector: 'app-d3',
  templateUrl: './d3.component.html',
  styleUrls: ['./d3.component.scss']
})
export class D3Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
    d33();
}

}
