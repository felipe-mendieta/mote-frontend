import { Component, Input } from '@angular/core';

@Component({
    selector: 'student-title-page',
    templateUrl: './title-page.component.html',
    styleUrls: ['./title-page.component.css'],
    standalone: true
})
export class TitlePageComponent {
  @Input() displayText: string ="Título por defecto";
}
