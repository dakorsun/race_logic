import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  providers: [FormControl],
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  // emailValue = '';
  emailControl = new FormControl('');
  emailValue = '';
  passwordControl = new FormControl('');
  passwordValue = '';

  constructor() { }

  ngOnInit(): void {
  }

}
