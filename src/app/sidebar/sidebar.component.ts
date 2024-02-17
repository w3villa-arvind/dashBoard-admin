import { Component ,OnInit} from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent  implements OnInit{

  permissions: any = [];
  allItemsVisible = false;
  menuItems: any[] = [];
  submenuData: any = [];
  getUserActive:boolean = false


  constructor(private userService: UserService) {
      this.initializeMenuItems();
  }
  ngOnInit(): void {
    this.userService.data$.subscribe(res => {
      this.getUserActive = res;
    });
  }
  openSubManu(menuItem:any) {
    this.hideAllSubCategories(menuItem);
    menuItem.active = menuItem.active ? false : true;
    this.submenuData = menuItem.children;
  }
  clearStorgae(){
    localStorage.clear();
  }
  hideAllSubCategories(menuItem:any) {
    this.menuItems.forEach(item => {
      if (menuItem.name != item.name && item.active) {
        item.active = false;
      }
    })
  }

  initializeMenuItems() {
    this.menuItems = [
      {
        name: 'dashboard',
        text: 'Dashboard',
        icon: 'mdi-view-dashboard',
        active: true,
      },
      {
        name: 'project',
        text: 'Project',
        icon: 'mdi-text-box-outline',
        active: true,
      },
      {
        name: 'department',
        text: 'Department',
        icon: 'mdi-briefcase-variant-outline',
        active: true,
      },
      {
        name: 'user',
        text: 'User',
        icon: 'mdi-account-multiple-plus-outline',
        active: true,
      },
      {
        name: 'filght',
        text: 'Flight Planning',
        icon: 'mdi-apple-keyboard-command',
        active: true,
      },
      {
        name: 'workspace',
        text: 'Workspace',
        icon: 'mdi-image-multiple-outline',
        active: true,
      },
      {
        name: 'asset',
        text: 'Asset',
        icon: 'mdi-archive-outline',
        active: true,
      },
      {
        name: 'vendor',
        text: 'Vendor',
        icon: 'mdi-plus-circle-multiple-outline',
        active: true,
      },
      {
        name: 'client',
        text: 'Client',
        icon: 'mdi-text-account',
        active: true,
      },
      {
        name: 'location',
        text: 'Location',
        icon: 'mdi-map-marker-plus-outline',
        active: true,
      },
    ];

  }

}
