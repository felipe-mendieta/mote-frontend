import { Component, OnInit } from '@angular/core';
import { PollListComponent } from '../../components/poll-list/poll-list.component';

@Component({
    selector: 'my-polls',
    templateUrl: './my-polls.component.html',
    styleUrls: ['./my-polls.component.css'],
    standalone: true,
    imports: [PollListComponent],
})
export class MyPollsComponent {}
