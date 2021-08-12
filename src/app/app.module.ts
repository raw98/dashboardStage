import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { Page1Component } from './page1/page1.component';
import { Page2Component } from './page2/page2.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './sidebar/sidebar.component'
import  {MatSidenavModule} from '@angular/material/sidenav'
import  {MatIconModule} from '@angular/material/icon'
import { MatCardModule } from '@angular/material/card'
import {MatDividerModule} from '@angular/material/divider'
import {MatListModule} from '@angular/material/list'
import { HighchartsChartModule } from 'highcharts-angular';
import { Chart1Component } from './chart1/chart1.component';
import { Chart2Component } from './chart2/chart2.component';
import { Chart3Component } from './chart3/chart3.component';
import { Chart4Component } from './chart4/chart4.component';
import { D3Component } from './d3/d3.component';
const routes : Routes=[
  {path: '' , component:Page1Component},
  {path: 'page1' , component:Page1Component},
  {path: 'page2' , component:Page2Component},
  {path: 'navbar' , component:NavbarComponent},
  {path: '404' , component:NotfoundComponent},
  { path : '**' , redirectTo : '404' }

];
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    Page1Component,
    Page2Component,
    NotfoundComponent,
    SidebarComponent,
    Chart1Component,
    Chart2Component,
    Chart3Component,
    Chart4Component,
    D3Component
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatSidenavModule,
    MatIconModule,
    MatDividerModule,
    MatCardModule,
    MatListModule,
    HighchartsChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
