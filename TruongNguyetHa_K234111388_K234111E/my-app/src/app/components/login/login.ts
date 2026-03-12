import { Component } from '@angular/core';
import { Data } from '../../data';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  standalone: false,
  styleUrl: './login.css'
})
export class Login {
  loginData = { email: '', password: '' };

  constructor(private data: Data, private router: Router) {}

  onLogin() {
    // Gọi cả 2 API cùng lúc để tìm user
    forkJoin({
      employees: this.data.getEmployees(),
      customers: this.data.getCustomers()
    }).subscribe(res => {
      // 1. Tìm trong Employee trước
      let user = res.employees.find(u => u.email === this.loginData.email && u.password === this.loginData.password);
      
      // 2. Nếu không thấy, tìm trong Customer
      if (!user) {
        user = res.customers.find(u => u.email === this.loginData.email && u.password === this.loginData.password);
        if (user) user.role = 'Customer'; // Gán role để phân quyền Navbar
      }

      if (user) {
        // Lưu thông tin vào localStorage để các Part khác sử dụng
        localStorage.setItem('mickeyUser', JSON.stringify(user));
        alert(`Chào mừng ${user.fullName} quay trở lại! 💜`);
        
        // Chuyển hướng về trang chủ và load lại trang để cập nhật Navbar
        this.router.navigate(['/products']).then(() => {
          window.location.reload(); 
        });
      } else {
        alert("Email hoặc mật khẩu không đúng bạn ơi!");
      }
    });
  }
}