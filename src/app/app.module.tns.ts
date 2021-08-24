import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptRouterModule } from '@nativescript/angular';

import { AppComponent } from '@src/app/app.component';

import { SidebarComponent } from './sidebar/sidebar.component';

/*const routes = [
  {path: '' , component:Page1Component},
  {path: 'page1' , component:Page1Component},
  {path: 'page2' , component:Page2Component},
  {path: 'navbar' , component:NavbarComponent},
  {path: '404' , component:NotfoundComponent},
  { path : '**' , redirectTo : '404' }

];*/
// Uncomment and add to NgModule imports if you need to use two-way binding and/or HTTP wrapper
// import { NativeScriptFormsModule, NativeScriptHttpClientModule } from '@nativescript/angular';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    NativeScriptRouterModule,
     //  NativeScriptRouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
