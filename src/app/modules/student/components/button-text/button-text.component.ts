import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
    selector: 'student-button-text',
    templateUrl: './button-text.component.html',
    styleUrls: ['./button-text.component.scss'],
    standalone: true,
    imports: [NgClass],
})
export class ButtonTextComponent {
  @Input() textButton = '';
  @Input() isAnswered: boolean = true;
  @Input() isButtonEnabled: boolean = false;
  @Output() buttonClick = new EventEmitter<void>();
}
