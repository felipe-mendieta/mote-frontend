import {computed, inject, Injectable, OnInit, signal} from '@angular/core';
import {SocketService} from "./socket.service";
import {HttpClient} from "@angular/common/http";
import {RoomService} from "./room.service";
import {ACTIVITY} from "../modules/student/enums/activity.enum";
import {Activity} from "../interfaces/activity.interface";

@Injectable({
  providedIn: 'root'
})
export class FlashquestionsService {

  private _flashQuestion = signal('');
  private answers = signal<Activity[]>([]);
  private socketService = inject(SocketService);
  private http = inject(HttpClient);
  private roomService = inject(RoomService);
  private questionAdminNotification = computed(() => !this._flashQuestion() );
  private changeColor = signal('');
  constructor() {
    this.socketService.on<string>('putFlashQuestionsAdmin').subscribe((question: string) => {
      console.log("recibiendo", question);
      this._flashQuestion.set(question);
    });

    this.socketService.on<Activity>('activityFlashquestionRealTime').subscribe((flashanswer: Activity) => {
      console.log("recibiendo flashquestion", flashanswer);
      this.answers.update((currentAnswers) => [...currentAnswers, flashanswer]);
    });
  }
  getNotificationQuestionUser() {
    return this.questionAdminNotification;
  }
  getColor() {
    return this.changeColor;
  }

  sendQuestion(question: string) {
    this.socketService.emit('sendFlashQuestion', {
      roomId: this.roomService.getRoomId(),
      roomCode: this.roomService.getRoomCode(),
      question,
      userId: this.roomService.getUserId(),
    });
    this.changeColor.set('fffec8');
  }

  getQuestionAdmin() {
    return this._flashQuestion;
  }

  getAnswers() {
    return this.answers;
  }

  sendFlashAnswertoAdmin(roomId: string, activityType: ACTIVITY, text: string) {
    this.socketService.emit('saveActivityFlashAnswer', {
      roomId,
      activityType: activityType,
      text,
      userId: this.roomService.getUserId(),
      done: false,
    });

    console.log('saveAnswerFlashquestion');
  }
}
