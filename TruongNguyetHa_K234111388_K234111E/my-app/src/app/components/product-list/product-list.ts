import { Component, OnInit } from '@angular/core';
import { Data } from '../../data';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.html',
  standalone: false,
  styleUrl: './product-list.css'
})
export class ProductList implements OnInit {
  products: any[] = [];
  categories: any[] = [];
  selectedCat: string = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  searchText: string = '';

  constructor(private data: Data, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.data.getProducts().subscribe(res => this.products = res);
    this.data.getCategories().subscribe(res => this.categories = res);
    this.route.queryParams.subscribe(params => {
      this.selectedCat = params['category'] || '';
    });
  }

  get filteredProducts() {
    return this.products.filter(p => {
      const matchCat = !this.selectedCat || p.categoryId === this.selectedCat;
      const matchMin = this.minPrice === null || p.price >= this.minPrice;
      const matchMax = this.maxPrice === null || p.price <= this.maxPrice;
      
      const term = this.searchText.toLowerCase().trim();
      // Tìm kiếm không phân biệt hoa thường theo Tên, Model và Brand
      const matchText = !term || 
                        p.name.toLowerCase().includes(term) || 
                        p.model.toLowerCase().includes(term) || 
                        p.made_by.toLowerCase().includes(term);
      
      return matchCat && matchMin && matchMax && matchText;
    });
  }

  // Q10: Xử lý thêm hàng vào giỏ và chuyển hướng nếu cần
  handlePurchase(product: any, qty: string, isBuyNow: boolean) {
    const user = localStorage.getItem('mickeyUser');
    if (!user) {
      alert("Bạn cần đăng nhập để mua hàng!");
      return;
    }

    const quantity = parseInt(qty);
    if (isNaN(quantity) || quantity <= 0) {
      alert("Số lượng không hợp lệ.");
      return;
    }

    let cart = JSON.parse(localStorage.getItem('mickeyCart') || '[]');
    const index = cart.findIndex((i: any) => i.name === product.name);
    
    if (index > -1) {
      cart[index].quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }

    localStorage.setItem('mickeyCart', JSON.stringify(cart));

    if (isBuyNow) {
      this.router.navigate(['/order']); // Chuyển thẳng đến thanh toán (Q11)
    } else {
      alert(`Đã thêm ${quantity} sản phẩm vào giỏ hàng! 💜`);
    }
  }
}