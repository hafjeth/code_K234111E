import { Component } from '@angular/core';

@Component({
  selector: 'app-learnbinding',
  imports: [],
  templateUrl: './learnbinding.html',
  styleUrl: './learnbinding.css',
})
export class Learnbinding {
  student_id:string="K234111E"
  student_name:string="Nguyen Thi Long Lanh"
  student_address:string="Ho Chi Minh city"
  red_text_style={
    color:'red'
  }
}
