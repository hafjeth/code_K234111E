import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: false,
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  student_id: string = "K234111388";
  student_name: string = "Truong Nguyet Ha";
  student_uni:string ="University of Economic and Laws"
  student_email: string = "hatn234111e@st.uel.edu.vn";
  my_img = "assets/ha.jpg";
}
