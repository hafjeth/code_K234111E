import { Component, OnInit } from '@angular/core';
import { Data } from '../../data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  standalone: false,
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {
  categories: any[] = [];
  user: any = null;

  constructor(private data: Data, private router: Router) {}

  ngOnInit() {
    this.data.getCategories().subscribe(res => this.categories = res);
    const savedUser = localStorage.getItem('mickeyUser');
    if (savedUser) this.user = JSON.parse(savedUser);
  }

  onCategoryChange(event: any) {
    const catId = event.target.value;
    this.router.navigate(['/products'], { queryParams: { category: catId } });
  }

  logout() {
    localStorage.removeItem('mickeyUser');
    this.user = null;
    this.router.navigate(['/login']);
  }
}