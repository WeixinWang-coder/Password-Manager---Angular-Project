import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  router: boolean = false;

  constructor(private rou: Router) {
    console.log(rou.url);
    this.router = rou.url.indexOf('password-list') > -1 ? true : false;
  }
}
