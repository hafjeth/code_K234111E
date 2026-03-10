import { Component, OnInit } from '@angular/core';
import { FashionService } from '../fashion.service';
import { Fashion } from '../fashion';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-fashion',
  standalone: false,
  templateUrl: './client-fashion.html'
})
export class ClientFashion implements OnInit {
  fashions: any[] = [];
  searchStyle: string = ''; 

  constructor(public _service: FashionService, public _router: Router) {}

  ngOnInit() { this.loadAll(); }

  loadAll() { this._service.getFashions().subscribe(res => this.fashions = res); }

  viewDetail(id: string) {
    this._router.navigate(['/ex58-client-detail', id]);
  }

  filterByStyle() {
    this._service.getFashionsByStyle(this.searchStyle).subscribe(res => this.fashions = res);
  }
}