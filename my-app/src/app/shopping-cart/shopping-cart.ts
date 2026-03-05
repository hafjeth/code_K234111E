import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartApiService } from '../myservices/cart-api';

@Component({
  selector: 'app-shopping-cart',
  standalone: false,
  templateUrl: './shopping-cart.html',
  styleUrl: './shopping-cart.css'
})
export class ShoppingCart implements OnInit {
  cart: any[] = [];

  constructor(private _cartApi: CartApiService, private router: Router) { }

  ngOnInit(): void {
    this._cartApi.getCart().subscribe({
      next: (data) => { this.cart = data; },
      error: (err) => { console.error(err); }
    });
  }

  removeItem(index: number) {
    this.cart.splice(index, 1);
  }

  updateCart() {
    this._cartApi.updateCart(this.cart).subscribe({
      next: (res) => {
        alert("Cập nhật giỏ hàng thành công!");
      },
      error: (err) => { console.error(err); }
    });
  }

  continueShopping() {
    this.router.navigate(['/product-store']);
  }

  getTotalPrice() {
    return this.cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  }
}