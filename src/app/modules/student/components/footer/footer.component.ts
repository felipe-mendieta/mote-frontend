import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SumService } from 'src/app/services/sum.service';
import { ButtonIconComponent } from '../button-icon/button-icon.component';
@Component({
    selector: 'student-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    standalone: true,
    imports: [ButtonIconComponent, RouterLink],
})
export class FooterComponent {
  constructor(private sumService: SumService, private router: Router) {}

  handlerButtonSendDoubts() {
    this.router.navigateByUrl('/student/my-doubt');
  }

  handlerButtonHome() {
    this.router.navigate(['/student/home']);
  }
}
