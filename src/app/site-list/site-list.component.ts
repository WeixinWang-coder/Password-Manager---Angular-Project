import { Component } from '@angular/core';
import { PasswordManagerService } from '../password-manager.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.css'],
})
export class SiteListComponent {
  siteName!: string;
  siteImageURL!: string;
  siteURL!: string;
  id!: string;
  allSites!: Observable<Array<any>>;
  formState: string = 'Add New';
  isSuccess: boolean = false;
  successMessage!: string;

  constructor(private passwordManager: PasswordManagerService) {
    this.loadSites();
  }
  showAlert(message: string) {
    this.isSuccess = true;
    this.successMessage = message;
  }
  onSubmit(value: object) {
    if (this.formState == 'Add New') {
      this.passwordManager
        .addSite(value)
        .then(() => {
          this.showAlert('Data Saved Successfully');
        })
        .catch((err) => {
          this.isSuccess = false;
        });
    } else if (this.formState == 'Edit') {
      this.passwordManager
        .updateSite(this.id, value)
        .then(() => {
          this.showAlert('Data Edited Successfully');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  loadSites() {
    this.allSites = this.passwordManager.loadSites();
  }
  editSite(
    siteName: string,
    siteImageURL: string,
    siteURL: string,
    id: string
  ) {
    this.siteImageURL = siteImageURL;
    this.siteName = siteName;
    this.siteURL = siteURL;
    this.id = id;
    this.formState = 'Edit';
    console.log(id);
  }
  deleteSite(id: string) {
    this.passwordManager
      .deleteSite(id)
      .then(() => {
        this.showAlert('Data Deleted Successfully');
      })
      .catch((err) => {
        this.isSuccess = false;
      });
  }
}
