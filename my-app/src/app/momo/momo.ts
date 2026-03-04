import { Component } from '@angular/core';
import { ServiceMomo } from '../service-momo';

@Component({
  selector: 'app-momo',
  standalone: false,
  templateUrl: './momo.html',
  styleUrl: './momo.css',
})
export class Momo {
 // Dữ liệu form
  amount: number = 50000;
  orderInfo: string = 'Thanh toán đơn hàng';

  // Trạng thái UI
  isLoading: boolean = false;
  errorMessage: string = '';

  // Danh sách sản phẩm mẫu
  products = [
    { id: 1, name: 'Áo thun basic', price: 150000, image: '👕' },
    { id: 2, name: 'Quần jean slim', price: 350000, image: '👖' },
    { id: 3, name: 'Giày sneaker', price: 800000, image: '👟' },
    { id: 4, name: 'Túi xách mini', price: 250000, image: '👜' },
  ];

  selectedProduct: any = null;

  constructor(private momoService: ServiceMomo) {}

  // Chọn sản phẩm
  selectProduct(product: any) {
    this.selectedProduct = product;
    this.amount = product.price;
    this.orderInfo = `Mua ${product.name} - ${product.price.toLocaleString()}đ`;
  }

  // Format số tiền
  formatCurrency(value: number): string {
    return value.toLocaleString('vi-VN') + ' đ';
  }

  // Bấm thanh toán
  onPayment() {
    if (!this.amount || this.amount < 1000) {
      this.errorMessage = 'Số tiền tối thiểu là 1,000đ';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.momoService.createPayment({
      amount: this.amount,
      orderInfo: this.orderInfo
    }).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('MoMo response:', response);

        if (response.resultCode === 0 && response.payUrl) {
          // ✅ Redirect sang trang thanh toán MoMo
          window.location.href = response.payUrl;
        } else {
          this.errorMessage = 'Lỗi: ' + response.message;
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Không kết nối được server. Kiểm tra NodeJS đang chạy chưa!';
        console.error(err);
      }
    });
  }
}
