import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Answer, Question } from 'src/app/interfaces/poll.interface';
import { NgClass, NgFor } from '@angular/common';

@Component({
    selector: 'app-likert-question',
    templateUrl: './likert-question.component.html',
    styleUrls: ['./likert-question.component.scss'],
    standalone: true,
    imports: [
        ReactiveFormsModule,
        NgClass,
        NgFor,
    ],
})
export class LikertQuestionComponent implements OnInit{
  @Input() question!: Question;
  @Input() form!: FormGroup;
  myOption = this.formBuilder.group({});
  formInvalid: boolean = true;
  ngOnInit() {
    this.buildForm();
  }
  constructor(private formBuilder: FormBuilder) {}
  

  buildForm() {
    
    this.form.addControl(
      this.question._id,
      this.formBuilder.control(null, [Validators.required])
    );
  }

  get answers() {
    return this.question.answers;
  }

  get isAnswered() {
    return (
      this.form.dirty === true && !this.form.get(this.question._id)?.errors
    );
  }
}
