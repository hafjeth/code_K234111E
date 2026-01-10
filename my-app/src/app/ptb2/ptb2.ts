import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ptb2',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './ptb2.html',
  styleUrls: ['./ptb2.css'],
})
export class Ptb2 {
  hsa: string = '100';
  hsb: string = '200';
  hsc: string = '300';
  result:string="......"
  get_solution() {
  let a = parseFloat(this.hsa);
  let b = parseFloat(this.hsb);
  let c = parseFloat(this.hsc);

  if (a == 0) {
    if (b == 0 && c == 0) {
      this.result = "Phương trình vô số nghiệm";
    } else if (b == 0 && c != 0) {
      this.result = "Phương trình vô nghiệm";
    } else {
      let x = -c / b;
      this.result = "Phương trình có nghiệm x = " + x;
    }
  } else {
    let delta = b * b - 4 * a * c;

    if (delta < 0) {
      this.result = "Phương trình vô nghiệm";
    } else if (delta == 0) {
      let x = -b / (2 * a);
      this.result = "Phương trình có nghiệm kép x = " + x;
    } else {
      let x1 = (-b + Math.sqrt(delta)) / (2 * a);
      let x2 = (-b - Math.sqrt(delta)) / (2 * a);
      this.result = "x₁ = " + x1 + ", x₂ = " + x2;
    }
    }
  }
}
