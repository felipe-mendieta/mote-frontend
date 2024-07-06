import { Component, Input } from '@angular/core';

@Component({
    selector: 'student-button-icon',
    templateUrl: './button-icon.component.html',
    styleUrls: ['./button-icon.component.scss'],
    standalone: true
})
export class ButtonIconComponent {
  @Input() imageUrl = '';
  @Input() altImg = '';
  @Input() isActived = false;
}
