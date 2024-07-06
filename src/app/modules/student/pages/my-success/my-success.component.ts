import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { TitlePageComponent } from '../../components/title-page/title-page.component';

@Component({
    selector: 'student-my-success',
    templateUrl: './my-success.component.html',
    styleUrls: ['./my-success.component.scss'],
    standalone: true,
    imports: [TitlePageComponent, FooterComponent],
})
export class MySuccessComponent {}
