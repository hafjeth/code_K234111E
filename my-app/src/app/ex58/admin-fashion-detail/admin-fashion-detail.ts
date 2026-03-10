import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FashionService } from '../fashion.service';
import { Fashion } from '../fashion';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-admin-fashion-detail',
  standalone: false,
  templateUrl: './admin-fashion-detail.html'
})
export class AdminFashionDetail implements OnInit {
  fashion: Fashion = { 
    title: '', 
    details: '', 
    thumbnail: '', 
    style: 'Street Style' 
  };
  isEdit = false;

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '250px',
    minHeight: '100px',
    placeholder: 'Nhập chi tiết sản phẩm tại đây...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
  };

  constructor(
    public _service: FashionService,
    public _route: ActivatedRoute,
    public _router: Router         
) {}

  ngOnInit() {
    const id = this._route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this._service.getFashionById(id).subscribe(res => {
        this.fashion = res;
      });
    }
  }

  save() {
    if (this.isEdit) {
      this._service.updateFashion(this.fashion._id!, this.fashion).subscribe({
        next: () => {
          alert('Cập nhật thành công!');
          this._router.navigate(['/ex58-admin']); 
        },
        error: (err) => console.error(err)
      });
    } else {
      this._service.addFashion(this.fashion).subscribe({
        next: () => {
          alert('Thêm mới thành công!');
          this._router.navigate(['/ex58-admin']);
        },
        error: (err) => console.error(err)
      });
    }
  }
}