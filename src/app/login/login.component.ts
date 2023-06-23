import { Component } from '@angular/core';
import { PasswordManagerService } from '../password-manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  isError: boolean = false;

  constructor(
    private passwordManager: PasswordManagerService,
    private router: Router
  ) {}

  onSubmit(value: any) {
    this.passwordManager
      .login(value.email, value.password)
      .then(() => {
        this.router.navigate(['./site-list']);
      })
      .catch((err) => {
        this.isError = true;
      });
  }
  onSignUp() {
    this.router.navigate(['/signup']);
  }
  resetErrorStatus() {
    this.isError = false;
  }
}
