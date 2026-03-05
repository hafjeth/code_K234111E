import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FashionApiService } from '../myservices/fashion-api-service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  user: any = { username: '', password: '' };
  message: string = '';

  constructor(private _service: FashionApiService, private router: Router) { }

  ngOnInit(): void {
    this.readCookie();
  }

  onLogin() {
    this._service.login(this.user).subscribe({
      next: (res) => {
        if (res.status === 'ok') {
          this.setCookie();
          this.message = 'Đăng nhập thành công!';
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

  setCookie() {
    const d = new Date();
    d.setTime(d.getTime() + (7 * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = "username=" + this.user.username + ";" + expires + ";path=/";
    document.cookie = "password=" + this.user.password + ";" + expires + ";path=/";
  }

  readCookie() {
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i].trim();
      if (c.indexOf("username=") == 0) {
        this.user.username = c.substring("username=".length, c.length);
      }
      if (c.indexOf("password=") == 0) {
        this.user.password = c.substring("password=".length, c.length);
      }
    }
  }
}