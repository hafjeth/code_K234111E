import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  sendContact():void 
  {
    const input_name = document.getElementById("name") as HTMLInputElement
    const input_email = document.getElementById("email") as HTMLInputElement
    const tdphanhoi = document.getElementById("tdphanhoi")
    alert("Contact form submitted! + ["+input_name.value+"]");
  }
}