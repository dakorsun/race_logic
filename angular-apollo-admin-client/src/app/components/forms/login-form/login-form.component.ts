import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  providers: [FormControl],
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ], ),
    password: new FormControl('', [
      Validators.required
    ])
  });

  commonError: string | null = null;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.loginError.subscribe(commonError => {
      this.commonError = commonError;
    });
  }

  get email(): AbstractControl | null {
    return this.loginForm.get('email');
  }

  getEmailErrorMessage(): string {
    if (this.email?.hasError('required')) {
      return 'Email is required';
    }
    if (this.email?.hasError('email')) {
      return 'Email should be in \"user@address.domain\" format';
    }
    return 'Email is wrong';
  }

  getPasswordErrorMessage(): string {
    if (this.email?.hasError('required')) {
      return 'Password is required';
    }
    return 'Password is wrong';
  }

  get password(): AbstractControl | null {
    return this.loginForm.get('password');
  }

  onSubmit() {
    this.authService.doLogin({
      email: this.email?.value,
      password: this.password?.value,
    });
  }
}
