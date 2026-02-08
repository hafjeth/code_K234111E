import { Component, OnInit } from '@angular/core';
import { Book } from '../../services/book';
import { IBook } from '../../interfaces/IBook';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.html',
  styleUrls: ['./book-list.css'],
  standalone: false
})
export class BookList implements OnInit {
  books: IBook[] = [];

  constructor(private bookService: Book) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getBooks().subscribe(data => {
      this.books = data;
    });
  }

  handleDelete(id: number) {
    if(confirm('Bạn muốn xóa sách này?')) {
      this.bookService.deleteBook(id).subscribe(() => {
        this.loadBooks();
      });
    }
  }
}