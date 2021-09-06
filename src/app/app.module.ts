import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { Page1Component } from './page1/page1.component';
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
import { D3Component } from './d3/d3.component';
import { PiechartComponent } from './piechart/piechart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import {MatSelectModule} from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatDatepickerModule, MatDateRangeInput} from '@angular/material/datepicker';
/*import {MatNativeDateModule} from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';*/
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
const routes : Routes=[
  {path: '' , component:Page1Component},
  {path: 'page1' , component:Page1Component},
  {path: 'navbar' , component:NavbarComponent},
  {path: '404' , component:NotfoundComponent},
  { path : '**' , redirectTo : '404' }

];
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    Page1Component,
    NotfoundComponent,
    SidebarComponent,
    Chart1Component,
    Chart2Component,
    D3Component,
    PiechartComponent,
    BarChartComponent
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
    HighchartsChartModule,
    MatSelectModule,
    HttpClientModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
