import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { SearchComponent } from './search/search.component';
import { SearchBoxComponent } from './search-box/search-box.component';
//http模块
import { HttpClientModule } from '@angular/common/http';
import { Search2Component } from './search2/search2.component';



@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    SearchBoxComponent,
    Search2Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    BrowserAnimationsModule,
    FormsModule,

    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
