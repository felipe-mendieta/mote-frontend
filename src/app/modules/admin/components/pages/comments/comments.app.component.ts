import { Component, OnDestroy } from '@angular/core';
import { Task } from 'src/app/demo/api/comment';
import { CommentsService } from './service/comments.service';
import { Subscription } from 'rxjs';
import { CreateCommentComponent } from './create-comment/create-comment.component';
import { CommentsComponent } from './comments-list/comments-list.component';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';

@Component({
    templateUrl: './comments.app.component.html',
    standalone: true,
    imports: [ButtonModule, RippleModule, CommentsComponent, CreateCommentComponent]
})
export class CommentsAppComponent implements OnDestroy {

    subscription: Subscription;

    todo: Task[] = [];

    completed: Task[] = [];

    constructor(private taskService: CommentsService) {
        this.subscription = this.taskService.taskSource$.subscribe(data => this.categorize(data));
    }

    categorize(tasks: Task[]) {
        this.todo = tasks.filter(t => t.completed !== true);
        this.completed = tasks.filter(t => t.completed);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    showDialog() {
        this.taskService.showDialog('Create Task', true);
    }
}