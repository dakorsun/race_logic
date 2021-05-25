import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  providers: [FormControl],
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  emailValue = '';
  passwordValue = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onLoginClick() {
    this.authService.doLogin({
      email: this.emailValue,
      password: this.passwordValue
    });
  }
}
