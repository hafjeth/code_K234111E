import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listcustomer',
  imports: [CommonModule],
  templateUrl: './listcustomer.html',
  styleUrl: './listcustomer.css',
})
export class Listcustomer {
  customers = [
    { "id": "c1", "name": "Putin", "age": 72, "picture": "putin.jpg" },
    { "id": "c2", "name": "Trump", "age": 61, "picture": "trump.png" },
    { "id": "c3", "name": "Obama", "age": 61, "picture": "obama.png" },
    { "id": "c4", "name": "Biden", "age": 79, "picture": "biden.png" },
  ]
}
