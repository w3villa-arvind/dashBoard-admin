import { Component, OnInit } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [NgbDropdownConfig],
})
export class NavbarComponent {
  public sidebarOpened = false;
  location: string = 'Noida';
  isDropdownOpen = false;
  isActive: boolean = false;

  getSelectValue(value: string) {
    this.location = value;
  }

  toggleOffcanvas() {
    this.sidebarOpened = !this.sidebarOpened;
  }
  constructor(
    config: NgbDropdownConfig,
    private router: Router,
    private userService: UserService
  ) {
    config.placement = 'bottom-right';
  }
  ngOnInit() {}
  sendActive() {
    this.isActive =!this.isActive
    this.userService.sendData(this.isActive );
  }
}
