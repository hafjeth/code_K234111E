import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartApiService {

  constructor(private _http: HttpClient) { }

  getProducts(): Observable<any> {
    return this._http.get<any>("http://localhost:3002/products").pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getCart(): Observable<any> {
    return this._http.get<any>("http://localhost:3002/cart", { withCredentials: true }).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  addToCart(product: any): Observable<any> {
    return this._http.post<any>("http://localhost:3002/cart", product, { withCredentials: true }).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  updateCart(cart: any[]): Observable<any> {
    return this._http.put<any>("http://localhost:3002/cart", cart, { withCredentials: true }).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message));
  }
}