import { Component, OnInit } from '@angular/core';
import { FashionService } from '../fashion.service';
import { Fashion } from '../fashion';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-fashion',
  standalone: false,
  templateUrl: './admin-fashion.html'
})
export class AdminFashion {
  fashions: Fashion[] = [];

  constructor(
  public _router: Router, 
  public _service: FashionService,
  public _route: ActivatedRoute
) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this._service.getFashions().subscribe(res => this.fashions = res);
  }

  deleteFashion(id: string) {
    if (confirm("Are you sure you want to delete this item?")) { 
      this._service.deleteFashion(id).subscribe(() => this.getData());
    }
  }
}