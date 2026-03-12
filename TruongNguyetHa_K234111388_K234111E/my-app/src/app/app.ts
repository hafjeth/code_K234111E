import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App implements OnInit {
  user: any = null;

  constructor(private router: Router) {}

  ngOnInit() {
    this.updateUser();
  }

  updateUser() {
    const saved = localStorage.getItem('mickeyUser');
    this.user = saved ? JSON.parse(saved) : null;
  }

  logout() {
    localStorage.removeItem('mickeyUser');
    this.user = null;
    this.router.navigate(['/login']);
  }
}