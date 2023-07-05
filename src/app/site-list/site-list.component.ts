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
  allSites!: Array<any>;
  formState: string = 'Add New';
  isSuccess: boolean = false;
  successMessage!: string;
  index = 0;

  constructor(private passwordManager: PasswordManagerService) {
    this.loadSites();
  }
  showAlert(message: string) {
    this.isSuccess = true;
    this.successMessage = message;
  }
  onSubmit(value: object) {
    let newObject = { ...value, index: this.index++ };
    console.log('new object');
    console.log(newObject);
    if (this.formState == 'Add New') {
      this.passwordManager
        .addSite(value)
        .then(() => {
          this.showAlert('Data Saved Successfully');
          setTimeout(() => {
            this.isSuccess = false;
          }, 3000);
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
    this.passwordManager.loadSites().subscribe((val) => {
      this.allSites = val;
      console.log(val);
    });
  }
  //
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
  onImgError(event: any) {
    event.target.src =
      'https://th.bing.com/th/id/OIP.vDf037OKUo0H03weRxdWuAHaHa?pid=ImgDet&rs=1';
  }
}
