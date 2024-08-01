import { Component, Input } from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
    selector: 'student-button-icon',
    templateUrl: './button-icon.component.html',
    styleUrls: ['./button-icon.component.scss'],
    imports: [
        NgIf
    ],
    standalone: true
})
export class ButtonIconComponent {
  @Input() imageUrl = '';
  @Input() altImg = '';
  @Input() isActived = false;
  @Input() isEnabledPoll: boolean = false;
  @Input() buttonColor: string = '';
}
