import { Component, OnInit } from '@angular/core';
import { Data } from '../../data';

@Component({
  selector: 'app-current-order',
  templateUrl: './current-order.html',
  standalone: false
})
export class CurrentOrder implements OnInit {
  items: any[] = [];

  constructor(private data: Data) { }

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.items = JSON.parse(localStorage.getItem('mickeyCart') || '[]');
  }

  get total() {
    return this.items.reduce((sum, i) => sum + (i.price * i.quantity), 0);
  }

  remove(index: number) {
    this.items.splice(index, 1);
    this.saveCart();
  }

  updateQty(index: number, move: number) {
    this.items[index].quantity += move;
    if (this.items[index].quantity < 1) this.items[index].quantity = 1;
    this.saveCart();
  }

  saveCart() {
    localStorage.setItem('mickeyCart', JSON.stringify(this.items));
  }

  pay() {
    const user = JSON.parse(localStorage.getItem('mickeyUser') || '{}');
    if (!user.email) {
      alert("Vui lòng đăng nhập!");
      return;
    }

    const order = {
      _id: "ord_" + Date.now(),
      customerId: user._id || user.email,
      orderDate: new Date().toISOString(),
      totalAmount: this.total,
      status: "Paid"
    };

    this.data.postOrder(order).subscribe({
      next: () => {
        localStorage.removeItem('mickeyCart');

        this.items = [];

        alert("Thanh toán thành công!");
      },
      error: (err) => alert("Lỗi kết nối server rồi bạn ơi!")
    });
  }
}