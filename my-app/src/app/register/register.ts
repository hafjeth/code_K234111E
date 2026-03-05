import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FashionApiService } from '../myservices/fashion-api-service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  user: any = { name: '', password: '' };
  message: string = '';

  constructor(private _service: FashionApiService, private router: Router) { }

  onRegister() {
    this._service.register(this.user).subscribe({
      next: (res) => {
        if (res.status === 'ok') {
          this.message = 'Đăng ký thành công!';
          this.router.navigate(['/ex53']);
        } else {
          this.message = res.message;
        }
      },
      error: (err) => {
        this.message = 'Lỗi kết nối server: ' + err.message;
      }
    });
  }
}