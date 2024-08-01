import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { Poll } from 'src/app/interfaces/poll.interface';
import { NgFor, NgIf } from '@angular/common';
import { PollService } from 'src/app/services/poll.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {Ripple} from "primeng/ripple";


@Component({
  selector: 'app-survey',
  standalone: true,
  imports: [AvatarModule, ButtonModule, NgFor, NgIf, ReactiveFormsModule, Ripple],
  templateUrl: './survey.component.html',
  styleUrl: './survey.component.scss'
})
export class SurveyComponent {
  pollList: Poll[] = [];
  myPolls: FormGroup = this.formBuilder.group({});
  pollControlName = 'IdControl';
  pollID: string = '';
  pollSent: boolean[] = [];
  constructor(
    private pollService: PollService,
    private formBuilder: FormBuilder,
  ) { }
  ngOnInit(): void {
    this.pollService.getAllPolls().subscribe((polls: Poll[]) => {
      if (polls) {
        this.pollList = polls;
        this.pollSent = new Array(this.pollList.length).fill(false); // Inicializa pollSent con false
        this.buildForm();
      }
    });
  }
  buildForm() {
    this.myPolls.addControl(
      this.pollControlName,
      this.formBuilder.control(null, [Validators.required])
    );
  }
  sendPoll(pollId: string, index: number) {
    this.pollID = pollId;
    this.pollService.sendPoll(this.pollID);
    localStorage.setItem('PollID', this.pollID);
    this.pollSent[index] = true;
    setTimeout(() => {
      this.pollSent[index] = false;
    }, 3000);
  }
}
