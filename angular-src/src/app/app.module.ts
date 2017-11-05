import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {NavigationComponent} from "./navigation/nav.component";

@NgModule({
  declarations: [
    NavigationComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [
    NavigationComponent
  ]
})
export class AppModule { }
