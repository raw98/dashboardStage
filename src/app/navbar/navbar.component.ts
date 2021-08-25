import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
 @Output() mode = new EventEmitter<string>();
  value:string="click";
  constructor() { }

  ngOnInit(): void {
  
  }
  changeMode(value:string){
    this.mode.emit(value);
  }

}
