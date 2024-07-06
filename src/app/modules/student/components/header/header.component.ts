import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { StudentDropdownOptionsComponent } from '../student-dropdown-options/student-dropdown-options.component';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'student-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: true,
    imports: [
        RouterLink,
        NgIf,
        StudentDropdownOptionsComponent,
    ],
})
export class HeaderComponent {
  name: String = 'MOTE APP';
  showDropdown: boolean = false;

  constructor(private authservice: AuthService) {}
  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  redirect(option: string) {
    if (option === 'logout') {
      this.authservice.logout();
    }
  }
}
