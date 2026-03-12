import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Data {
  private url = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any[]> { return this.http.get<any[]>(`${this.url}/products`); }
  getCategories(): Observable<any[]> { return this.http.get<any[]>(`${this.url}/categories`); }
  getOrders(): Observable<any[]> { return this.http.get<any[]>(`${this.url}/orders`); }
  getEmployees(): Observable<any[]> { return this.http.get<any[]>(`${this.url}/employees`); }
  getCustomers(): Observable<any[]> { return this.http.get<any[]>(`${this.url}/customers`); }
  postOrder(order: any): Observable<any> { return this.http.post<any>(`${this.url}/orders`, order); }
}