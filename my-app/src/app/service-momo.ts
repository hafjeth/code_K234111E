import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PaymentRequest {
  amount: number;
  orderInfo: string;
}

export interface PaymentResponse {
  partnerCode: string;
  orderId: string;
  requestId: string;
  amount: number;
  responseTime: number;
  message: string;
  resultCode: number;
  payUrl: string;      
  shortLink: string;
}

@Injectable({
  providedIn: 'root',
})
export class ServiceMomo {
  private apiUrl = 'http://localhost:3000/api/payment';

  constructor(private http: HttpClient) {}

  // Tạo đơn thanh toán → nhận về payUrl
  createPayment(data: PaymentRequest): Observable<PaymentResponse> {
    return this.http.post<PaymentResponse>(`${this.apiUrl}/create`, data);
  }

  // Kiểm tra trạng thái đơn hàng
  checkPayment(orderId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/check`, { orderId });
  }


}