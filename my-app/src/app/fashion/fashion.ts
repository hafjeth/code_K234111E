import { Component } from '@angular/core';
import { FashionApiService } from '../myservices/fashion-api-service';

@Component({
  selector: 'app-fashion',
  standalone: false,
  templateUrl: './fashion.html',
  styleUrl: './fashion.css',
})
export class Fashion {
  fashions:any;
  errMessage:string='';
  fashionId: string = '';
  constructor(public _service: FashionApiService){
  this._service.getFashion(this.fashionId).subscribe({
  next:(data)=>{this.fashions=data},
  error:(err)=>{this.errMessage=err}
  })
  } 
  parse_image(base64str:string)
  {
    let prefix="data:image/jpeg;base64,"
    if(base64str==null)
      return ""
    if (base64str.startsWith(prefix))
      return base64str
    return prefix+base64str
  }
}