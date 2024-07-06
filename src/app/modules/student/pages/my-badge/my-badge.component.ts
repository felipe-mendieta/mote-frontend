import { Component, Renderer2 } from '@angular/core';
import { ProgressBarService } from 'src/app/services/progress-bar.service';
import { NgIf } from '@angular/common';
import { FooterComponent } from '../../components/footer/footer.component';
import { ButtonIconTextComponent } from '../../components/button-icon-text/button-icon-text.component';

@Component({
    selector: 'app-my-badge',
    templateUrl: './my-badge.component.html',
    styleUrls: ['./my-badge.component.scss'],
    standalone: true,
    imports: [ButtonIconTextComponent, FooterComponent, NgIf]
})
export class MyBadgeComponent {
  percentProgress = this.progressBarService.getProgress$();
  titleButton = 'Reclamar mi premio: ' + this.percentProgress + '%';
  isShowedBadge = this.percentProgress >= 90 ? true : false;
  constructor(
    // Add any needed services here
    private progressBarService: ProgressBarService,
  ) {
    console.log(progressBarService.getProgress$());
  }
  badges = [
    { title: 'Reclamar mi premio' },
    { title: 'Badge 2' },
    { title: 'Badge 3' },
    // Add more badges as needed
  ];

}
