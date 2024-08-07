import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { RoomService } from '../../../../services/room.service';
import { ACTIVITY } from '../../enums/activity.enum';
import { PollService } from 'src/app/services/poll.service';
import { ActivityService } from 'src/app/services/activity.service';
import { Observable, of } from 'rxjs';

import { SumService } from 'src/app/services/sum.service';
import { Router, RouterLink } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';
import { ButtonIconTextComponent } from '../../components/button-icon-text/button-icon-text.component';
import { StudentProgressBarComponent } from '../../components/student-progress-bar/student-progress-bar.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: true,
    imports: [
        StudentProgressBarComponent,
        ButtonIconTextComponent,
        RouterLink,
        FooterComponent,
    ],
})
export class HomeComponent implements OnInit {
  roomCode = this.roomService.getRoomCode(); //get data from URL
  roomId = this.roomService.getRoomId();
  ACTIVITY = ACTIVITY; //This is for bind enum in html
  buttonColor: string = '';
  isButtonDisabled: boolean = true;
  constructor(
    private roomService: RoomService,
    private pollService: PollService,
    private activityService: ActivityService,
    private sumService: SumService,
    private router: Router
  ) {
    this.pollService.isPollActive$().subscribe((isPollActive) => {
      const isPollSaved = this.pollService.getPollSavedLocalStorage();
      if (isPollActive && !isPollSaved) {
        console.log('notificacion de poll activada');
        this.buttonColor = '#fffec8';
        this.isButtonDisabled = false;
        //change opacity of button
      } else {
        console.log('notificacion de poll desactivada');
        this.buttonColor = '';
        this.isButtonDisabled = true;
      }
    });
  }

  ngOnInit(): void {
    if (this.roomCode) {
      this.roomService.joinRoom(this.roomCode);
    }

  }


  buttonSaveActivity(activity: ACTIVITY) {
    if (this.roomCode) {
      if (this.roomId) {
        this.activityService.saveActivity(this.roomId, activity);
      }
    }
  }

  handlerButtonLoveClass() {
    this.buttonSaveActivity(ACTIVITY.iloveit);
    this.sumService.addValuePointsLoveClass();
  }
  handlerButtonSleep() {
    this.buttonSaveActivity(ACTIVITY.sleep);
    this.sumService.addValuePointsSleep();
  }

  handlerButtonTakeBreak() {
    this.buttonSaveActivity(ACTIVITY.break);
    this.sumService.addValuePointsTakeBreak();
  }

  handlerButtonDonotGetIt() {
    this.buttonSaveActivity(ACTIVITY.iDontGetIt);
    this.sumService.addValuePointsDoNotGetIt();
  }

  handlerButtonSendComment() {
    this.router.navigateByUrl('/student/my-comment');
  }

  handlerButtonEmotions() {
    this.sumService.addValuePointsEmotions();
    this.router.navigateByUrl('/student/my-emotions');
  }
}
