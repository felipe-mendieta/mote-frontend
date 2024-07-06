import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StudentDropdownOptionsComponent } from '../student-dropdown-options/student-dropdown-options.component';
import { NgIf } from '@angular/common';
import { HeaderComponent } from '../header/header.component';

@Component({
    selector: 'student-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    standalone: true,
    imports: [
        HeaderComponent,
        NgIf,
        StudentDropdownOptionsComponent,
        RouterOutlet,
    ],
})
export class LayoutComponent {
  displayModal: boolean = false;

  openModal() {
    this.displayModal = true;
  }

  onOptionSelected(option: string) {
    this.navigateToHomePage();
    this.displayModal = false;
  }

  navigateToHomePage() {
    // Redirect to the home page
    // Example:
    // import { Router } from '@angular/router';
    // constructor(private router: Router) {}
    // this.router.navigate(['/home']);
  }
}
