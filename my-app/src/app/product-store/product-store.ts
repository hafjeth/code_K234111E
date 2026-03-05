import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartApiService } from '../myservices/cart-api';

@Component({
  selector: 'app-product-store',
  standalone: false,
  templateUrl: './product-store.html',
  styleUrl: './product-store.css'
})
export class ProductStore implements OnInit {
  products: any[] = [];

  constructor(private _cartApi: CartApiService, private router: Router) { }

  ngOnInit(): void {
    this._cartApi.getProducts().subscribe({
      next: (data) => { this.products = data; },
      error: (err) => { console.error(err); }
    });
  }

  addToCart(product: any) {
    this._cartApi.addToCart(product).subscribe({
      next: (res) => {
        alert("Đã thêm " + product.name + " vào giỏ hàng!");
      },
      error: (err) => { console.error(err); }
    });
  }

  goToCart() {
    this.router.navigate(['/shopping-cart']);
  }
}