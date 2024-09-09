import {Component, inject, signal} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {MultiSelectModule} from "primeng/multiselect";
import {CascadeSelectModule} from "primeng/cascadeselect";
import {InputNumberModule} from "primeng/inputnumber";
import {InputMaskModule} from "primeng/inputmask";
import {DropdownModule} from "primeng/dropdown";
import {ChipsModule} from "primeng/chips";
import {CalendarModule} from "primeng/calendar";
import {AutoCompleteModule} from "primeng/autocomplete";
import {FlashquestionsService} from "../../../../services/flashquestions.service";
import {Poll} from "../../../../interfaces/poll.interface";


@Component({
  selector: 'app-flashquestions',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AutoCompleteModule,
    CalendarModule,
    ChipsModule,
    DropdownModule,
    InputMaskModule,
    InputNumberModule,
    CascadeSelectModule,
    MultiSelectModule,
    InputTextareaModule,
    InputTextModule
  ],
  templateUrl: './flashquestions.component.html',
  styleUrl: './flashquestions.component.scss'
})
export class FlashquestionsComponent {
  isQuestionsend = signal(false);
  flashquestionsService = inject(FlashquestionsService);
  questionAdmin: string = '';
  answers = this.flashquestionsService.getAnswers();

  saveQuestion() {
    this.flashquestionsService.sendQuestion(this.questionAdmin);
    this.isQuestionsend.set(true);
    // You can add additional logic to save the question here
  }
}
