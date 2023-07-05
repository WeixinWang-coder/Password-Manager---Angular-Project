import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordManagerService } from '../password-manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  form!: FormGroup;
  isSuccessAlert: boolean = false;
  successMessage!: string;
  isErrorAlert: boolean = false;
  errorMessage!: string;
  isLoading = false;

  constructor(
    private passwordmanagerService: PasswordManagerService,
    private router: Router
  ) {}
  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      rePassword: new FormControl('', Validators.required),
    });
  }

  showAlert(message: string) {
    this.isSuccessAlert = true;
    this.successMessage = message;
  }

  onSignUp() {
    this.isLoading = true;
    if (this.form.value['password'] != this.form.value['rePassword']) {
      this.showAlert('passwords are not match');
      this.isLoading = false;
    } else {
      this.isLoading = false;
      this.passwordmanagerService
        .signUp(this.form.value['email'], this.form.value['password'])
        .then(() => {
          this.showAlert('New User Created');
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 2000);
        })
        .catch((err) => {
          this.showAlert(err.code);
        });
    }
  }
  signIn() {
    this.router.navigate(['/']);
  }
}
