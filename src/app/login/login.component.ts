import { Component, OnInit } from '@angular/core';
import { PasswordManagerService } from '../password-manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  isError: boolean = false;
  isLoading = false;
  backgroundImg =
    'https://th.bing.com/th/id/R.2c2faf8dec960a788544ea54f0d2a73c?rik=sjMdO9nWcq%2fm6A&riu=http%3a%2f%2fgetwallpapers.com%2fwallpaper%2ffull%2f4%2f7%2f8%2f910313-free-desktop-backgrounds-1920x1200.jpg&ehk=nQnASHgxQvl9tKDPIhOaUOyTZ61c7qOY7Rt4z523QpY%3d&risl=&pid=ImgRaw&r=0';
  constructor(
    private passwordManager: PasswordManagerService,
    private router: Router
  ) {}
  ngOnInit(): void {}

  onSubmit(value: any) {
    this.isLoading = true;
    this.passwordManager
      .login(value.email, value.password)
      .then(() => {
        this.isLoading = false;
        this.router.navigate(['./site-list']);
      })
      .catch((err) => {
        this.isError = true;
        this.isLoading = false;
      });
  }
  onSignUp() {
    this.router.navigate(['/signup']);
  }
  resetErrorStatus() {
    this.isError = false;
  }
}
