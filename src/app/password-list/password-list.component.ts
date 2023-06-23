import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PasswordManagerService } from '../password-manager.service';
import { Observable } from 'rxjs';
import { AES, enc } from 'crypto-js';

@Component({
  selector: 'app-password-list',
  templateUrl: './password-list.component.html',
  styleUrls: ['./password-list.component.css'],
})
export class PasswordListComponent {
  siteId!: string;
  siteName!: string;
  siteURL!: string;
  siteImgURL!: string;
  passwordList!: Array<any>;

  email!: string;
  username!: string;
  password!: string;
  passwordId!: string;

  formState: string = 'Add New';

  isSuccess: boolean = false;
  successMessage!: string;
  constructor(
    private route: ActivatedRoute,
    private passwordManager: PasswordManagerService
  ) {
    this.route.queryParams.subscribe((val: any) => {
      this.siteId = val.id;
      this.siteName = val.siteName;
      this.siteURL = val.siteURL;
      this.siteImgURL = val.siteImgURL;
    });
    this.loadPasswords();
  }

  showAlert(message: string) {
    this.isSuccess = true;
    this.successMessage = message;
  }
  resetForm() {
    this.email = '';
    this.username = '';
    this.password = '';
    this.passwordId = '';
  }
  onSubmit(values: any) {
    console.log(values);
    const encryptedPassword = this.encryptPassword(values.password);
    values.password = encryptedPassword;
    console.log(values);

    if (this.formState == 'Add New') {
      this.passwordManager
        .addPassword(values, this.siteId)
        .then(() => {
          this.showAlert('Data Saved Successfully');
          this.resetForm();
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (this.formState == 'Edit') {
      this.passwordManager
        .updatePassword(this.siteId, this.passwordId, values)
        .then(() => {
          console.log('Data Updated');
          this.showAlert('Data update successfully');
          this.resetForm();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  loadPasswords() {
    this.passwordManager.loadPassword(this.siteId).subscribe((val) => {
      this.passwordList = val;
    });
  }
  editPassword(
    email: string,
    username: string,
    password: string,
    passwordId: string
  ) {
    this.email = email;
    this.username = username;
    this.password = password;
    this.passwordId = passwordId;
    this.formState = 'Edit';
  }
  deletePassword(passwordId: string) {
    this.passwordManager
      .deletePassword(this.siteId, passwordId)
      .then(() => {
        this.showAlert('Data Deleted Successfully');
      })
      .catch((err) => {
        console.log(err);
      });
  }
  encryptPassword(password: string) {
    const secreKey = 'T4zC6mXkH69HSs5';
    return AES.encrypt(password, secreKey).toString();
  }
  decryptPassword(password: string) {
    const secreKey = 'T4zC6mXkH69HSs5';
    const decPassword = AES.decrypt(password, secreKey).toString(enc.Utf8);
    return decPassword;
  }
  onDecrypt(password: string, index: number) {
    const decPassword = this.decryptPassword(password);
    this.passwordList[index].password = decPassword;
  }
}
