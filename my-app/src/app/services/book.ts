import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBook } from '../interfaces/IBook';

@Injectable({
  providedIn: 'root'
})
export class Book {
  API_URL = 'http://localhost:3001/books'; 

  constructor(private http: HttpClient) { }

  getBooks(): Observable<IBook[]> {
    return this.http.get<IBook[]>(this.API_URL);
  }

  getBook(id: number): Observable<IBook> {
    return this.http.get<IBook>(`${this.API_URL}/${id}`);
  }

  addBook(bookData: any): Observable<any> {
    return this.http.post<any>(this.API_URL, bookData);
  }

  updateBook(id: number, bookData: any): Observable<any> {
    return this.http.put<any>(`${this.API_URL}/${id}`, bookData);
  }

  deleteBook(id: number): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/${id}`);
  }
}