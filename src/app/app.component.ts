import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  filter !: string[][]
 
  title = 'dashboardStage';
  test:boolean=true;
  public innerWidth:number;
  constructor() { 
    this.innerWidth = window.innerWidth;
  }
  ngOnInit(): void {
    this.initializeSide();
    
}
  changeModeNav(value:string){
    this.test=!this.test;
  }
  initializeSide(){
    if(this.innerWidth<=767)
      this.changeModeNav("ok");
  }
  addItem(item : any[]) {
    
    this.filter = item
    console.log("filter:" + this.filter)
  }
}