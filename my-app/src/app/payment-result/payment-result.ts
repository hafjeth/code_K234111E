import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment-result',
  standalone: false,
  templateUrl: './payment-result.html',
  styleUrl: './payment-result.css',
})
export class PaymentResult {
  resultData: any = null;
  isSuccess: boolean = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // MoMo trả về các params trên URL sau khi thanh toán
    this.route.queryParams.subscribe(params => {
      this.resultData = {
        orderId: params['orderId'] || 'N/A',
        amount: params['amount'] || 0,
        orderInfo: params['orderInfo'] || 'N/A',
        resultCode: params['resultCode'] || -1,
        message: params['message'] || 'Không xác định',
      };
      // resultCode = 0 là thành công
      this.isSuccess = params['resultCode'] === '0';
    });
  }

  formatAmount(amount: any): string {
    return Number(amount).toLocaleString('vi-VN') + ' đ';
  }
}
