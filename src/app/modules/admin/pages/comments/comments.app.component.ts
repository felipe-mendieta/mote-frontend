import { Component, OnDestroy } from '@angular/core';
import { Task } from 'src/app/demo/api/comment';
import { CommentsService } from './service/comments.service';
import { Subscription } from 'rxjs';
import { CreateCommentComponent } from './create-comment/create-comment.component';
import { CommentsComponent } from './comments-list/comments-list.component';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { RecordActivity } from 'src/app/interfaces/activity,interface';

@Component({
    templateUrl: './comments.app.component.html',
    standalone: true,
    imports: [ButtonModule, RippleModule, CommentsComponent, CreateCommentComponent]
})
export class CommentsAppComponent implements OnDestroy {

    subscription: Subscription;

    todo: RecordActivity[] = [];

    completed: RecordActivity[] = [];

    constructor(private taskService: CommentsService) {
        this.subscription = this.taskService.taskSource$.subscribe(data => this.categorize(data));
    }

    categorize(tasks: RecordActivity[]) {
        this.todo = tasks.filter(t => t.done !== true);
        this.completed = tasks.filter(t => t.done);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    showDialog() {
        this.taskService.showDialog('Create Task', true);
    }
}