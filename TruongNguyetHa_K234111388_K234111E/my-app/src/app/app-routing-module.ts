import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductList } from './components/product-list/product-list';
import { CurrentOrder } from './components/current-order/current-order';
import { Revenue } from './components/revenue/revenue';
import { Login } from './components/login/login';

const routes: Routes = [
  { path: 'products', component: ProductList },
  { path: 'order', component: CurrentOrder },
  { path: 'revenue', component: Revenue },
  { path: 'login', component: Login },
  { path: '', redirectTo: '/products', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }