import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; //
import { ActivatedRoute } from '@angular/router';
import { Book } from '../../services/book';
import { IBook } from '../../interfaces/IBook';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.html',
  styleUrls: ['./book-detail.css'],
  standalone: false
})
export class BookDetail implements OnInit {
  book: IBook | null = null;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private bookService: Book,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log("Details ID:", id);

    this.bookService.getBook(id).subscribe({
      next: (data) => {
        console.log("Details Data:", data);
        this.book = data;
        this.errorMessage = '';
        
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error("Lỗi:", err);
        this.errorMessage = "Không tìm thấy sách hoặc lỗi Server!";
        this.cdr.detectChanges(); 
      }
    });
  }
}