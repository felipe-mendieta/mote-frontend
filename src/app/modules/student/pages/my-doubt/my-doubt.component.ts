import {Component, ElementRef, inject, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { ACTIVITY } from '../../enums/activity.enum';
import { ActivityService } from 'src/app/services/activity.service';
import { RoomService } from 'src/app/services/room.service';
import { SumService } from 'src/app/services/sum.service';
import { FooterComponent } from '../../components/footer/footer.component';
import { ButtonTextComponent } from '../../components/button-text/button-text.component';
import { TitlePageComponent } from '../../components/title-page/title-page.component';
import {FlashquestionsService} from "../../../../services/flashquestions.service";
import {SocketService} from "../../../../services/socket.service";

@Component({
    selector: 'app-my-doubt',
    templateUrl: './my-doubt.component.html',
    styleUrls: ['./my-doubt.component.scss'],
    standalone: true,
    imports: [
        TitlePageComponent,
        ButtonTextComponent,
        FooterComponent,
    ],
})
export class MyDoubtComponent  {
  ACTIVITY = ACTIVITY;
  roomId = this.roomService.getRoomId();
  constructor(
    private router: Router,
    private serviceActivity: ActivityService,
    private roomService: RoomService,
    private sumService: SumService,

  ) {}
  flashquestionService = inject(FlashquestionsService);
  socketService = inject(SocketService);
  flashquestion = this.flashquestionService.getQuestionAdmin();

  @ViewChild('textAreaDoubts') textAreaComment!: ElementRef;
  submitQuestion(activity: ACTIVITY) {
    //get text from textarea
    const text = this.textAreaComment.nativeElement.value.trim();
    if (text && this.roomId) {
      this.flashquestionService.sendFlashAnswertoAdmin(
        this.roomId,
        this.ACTIVITY.flashquestion,
        text
      );
      this.sumService.addValuePointsDoubts();
      this.flashquestion.set('');
      this.router.navigate(['/student/home']);

    } else {
      //console.log('text area is empty or contains only blank spaces');
    }
  }
}
