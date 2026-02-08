import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Book } from '../../services/book';
import { IBook } from '../../interfaces/IBook';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.html',
  styleUrls: ['./book-form.css'],
  standalone: false
})
export class BookForm implements OnInit {
  book: IBook = {
    id: 0, Tensach: '', Giaban: 0, Mota: '', Anhbia: '',
    Ngaycapnhat: new Date().toISOString().slice(0, 10),
    Soluongton: 0, MaCD: 0, MaNXB: 0
  };
  
  selectedFile: File | null = null;
  isEditMode: boolean = false; 

  constructor(
    private bookService: Book, 
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    console.log("Check ID URL:", id);
    
    if (id) {
      this.isEditMode = true;
      this.loadBookData(id);
    }
  }

  loadBookData(id: number) {
    this.bookService.getBook(id).subscribe({
      next: (data) => {
        console.log("Dữ liệu tải về từ Server:", data);
        
        Object.assign(this.book, data);

        if (this.book.Ngaycapnhat) {
            this.book.Ngaycapnhat = new Date(this.book.Ngaycapnhat).toISOString().split('T')[0];
        }
      },
      error: (err) => {
        console.error("Lỗi tải sách:", err);
        alert("Không thể tải dữ liệu sách. Hãy kiểm tra Server!");
      }
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('book', JSON.stringify(this.book)); 
    
    if (this.selectedFile) {
      formData.append('Anhbia', this.selectedFile);
    }

    if (this.isEditMode) {
      this.bookService.updateBook(this.book.id, formData).subscribe({
        next: () => {
          alert('Cập nhật thành công!');
          this.router.navigate(['/ex50']); 
        },
        error: (err) => {
          console.error(err);
          alert("Lỗi khi cập nhật!");
        }
      });
    } else {
      this.bookService.addBook(formData).subscribe({
        next: () => {
          alert('Thêm mới thành công!');
          this.router.navigate(['/ex50']);
        },
        error: (err) => {
          console.error(err);
          alert("Lỗi khi thêm mới!");
        }
      });
    }
  }
}