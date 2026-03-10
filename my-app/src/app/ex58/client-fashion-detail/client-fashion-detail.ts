import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FashionService } from '../fashion.service';
import { ActivatedRoute , RouterModule } from '@angular/router';

@Component({
  selector: 'app-client-fashion-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './client-fashion-detail.html',
  styleUrl: './client-fashion-detail.css',
})
export class ClientFashionDetail implements OnInit {
  fashion: any;

  constructor(private _service: FashionService, private _route: ActivatedRoute) {}

  ngOnInit() {
  const id = this._route.snapshot.paramMap.get('id');
  console.log("ID nhận được từ URL:", id); 
  
  if (id) {
    this._service.getFashionById(id).subscribe(res => {
      console.log("Dữ liệu API trả về:", res); 
      this.fashion = res; 
    });
  }
}
}