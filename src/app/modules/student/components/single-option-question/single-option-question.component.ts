import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Answer, Question } from 'src/app/interfaces/poll.interface';
import { MyValidators } from 'src/app/utils/validators';
import { NgClass, NgFor } from '@angular/common';
@Component({
    selector: 'app-single-option-question',
    templateUrl: './single-option-question.component.html',
    styleUrls: ['./single-option-question.component.css'],
    standalone: true,
    imports: [
        ReactiveFormsModule,
        NgClass,
        NgFor,
    ],
})
export class SingleOptionQuestionComponent implements OnInit {
  @Input() question!: Question;
  @Input() form!: FormGroup;
  myOption = this.formBuilder.group({});
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
  }
  buildForm() {
   
    let idQuestion = this.question._id;

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
