import { Component, OnInit } from '@angular/core';
import { Data } from '../../data';

@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.html',
  styleUrl: './revenue.css',
  standalone: false
})
export class Revenue implements OnInit {
  orders: any[] = [];
  selectedMonth: number = new Date().getMonth() + 1;
  selectedYear: number = new Date().getFullYear();
  filteredOrders: any[] = [];
  totalRevenue: number = 0;

  constructor(private data: Data) {}

  ngOnInit() {
    this.data.getOrders().subscribe(res => {
      this.orders = res;
      this.calculate();
    });
  }

  calculate() {
    // Q12: Chỉ lấy các đơn hàng đã thanh toán
    this.filteredOrders = this.orders.filter(o => {
      const date = new Date(o.orderDate);
      return o.status === 'Paid' && 
             (date.getMonth() + 1) == this.selectedMonth && 
             date.getFullYear() == this.selectedYear;
    });

    // Tính tổng doanh thu
    this.totalRevenue = this.filteredOrders.reduce((sum, o) => sum + o.totalAmount, 0);
  }
}