import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms'; 

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Navbar } from './components/navbar/navbar';
import { StudentInfo } from './components/student-info/student-info';
import { ProductList } from './components/product-list/product-list';
import { CurrentOrder } from './components/current-order/current-order';
import { Revenue } from './components/revenue/revenue';
import { Login } from './components/login/login';

@NgModule({
  declarations: [App, Navbar, StudentInfo, ProductList, CurrentOrder, Revenue, Login],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule], 
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}