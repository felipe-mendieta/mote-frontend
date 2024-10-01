// import { Component, OnInit, Input, ViewChild, ChangeDetectionStrategy } from '@angular/core';
// import { MenuItem } from 'primeng/api';
// import { Menu, MenuModule } from 'primeng/menu';
// import { Task } from 'src/app/demo/api/comment';
// import { CommentsService } from '../service/comments.service';
// import { RippleModule } from 'primeng/ripple';
// import { ButtonModule } from 'primeng/button';
// import { AvatarModule } from 'primeng/avatar';
// import { AvatarGroupModule } from 'primeng/avatargroup';
// import { FormsModule } from '@angular/forms';
// import { CheckboxModule } from 'primeng/checkbox';
// import { NgFor, NgClass, NgIf, SlicePipe } from '@angular/common';

// @Component({
//     selector: 'app-task-list',
//     templateUrl: './comments-list.component.html',
//     changeDetection: ChangeDetectionStrategy.OnPush,
//     standalone: true,
//     imports: [NgFor, CheckboxModule, FormsModule, NgClass, NgIf, AvatarGroupModule, AvatarModule, ButtonModule, RippleModule, MenuModule, SlicePipe]
// })
// export class CommentsComponent implements OnInit {

//     @Input() comments!: Task[];

//     @Input() title!: string;

//     @ViewChild('menu') menu!: Menu;

//     menuItems: MenuItem[] = [];

//     clickedTask!: Task;

//     constructor(private taskService: CommentsService) { }

//     ngOnInit(): void {
//         this.menuItems = [
//             { label: 'Edit', icon: 'pi pi-pencil', command: () => this.onEdit() },
//             { label: 'Delete', icon: 'pi pi-trash', command: () => this.handleDelete() }
//         ];
//     }

// parseDate(date: Date) {
//     let d = new Date(date);
//     return d.toUTCString().split(' ').slice(1, 3).join(' ');
// }

//     handleDelete() {
//         this.taskService.removeTask(this.clickedTask.id);
//     }

//     toggleMenu(event: Event, task: Task) {
//         this.clickedTask = task;
//         this.menu.toggle(event);
//     }

//     onEdit() {
//         this.taskService.onTaskSelect(this.clickedTask);
//         this.taskService.showDialog('Edit Task', false);
//     }

// onCheckboxChange(event: any, task: Task) {
//     event.originalEvent.stopPropagation();
//     task.completed = event.checked;
//     this.taskService.markAsCompleted(task);
// }
// }
import {Component, OnInit, Input, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menu, MenuModule } from 'primeng/menu';
import { Task } from 'src/app/demo/api/comment';
import { CommentsService } from '../service/comments.service';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { NgFor, NgClass, NgIf, SlicePipe } from '@angular/common';
import { filter, tap } from 'rxjs';
import { Activity, CreateActivityCommentDTO, RecordActivity } from 'src/app/interfaces/activity.interface';
import { DataRealTimeService } from 'src/app/services/data-real-time.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
    selector: 'app-task-list',
    templateUrl: './comments-list.component.html',
    //styleUrls: ['./comment-card.component.scss'],
    standalone: true,
    imports: [NgFor, CheckboxModule, FormsModule, NgClass, NgIf, AvatarGroupModule, AvatarModule, ButtonModule, RippleModule, MenuModule, SlicePipe]
})
export class CommentsComponent implements OnInit {
  @Input() comments!: RecordActivity[];
  allComments: RecordActivity[] = [];

  constructor(
    private dataRealTimeService: DataRealTimeService,
    private taskService: CommentsService,
    private socketService: SocketService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.dataRealTimeService
      .getActivityComment$()
      .pipe(filter((activity: RecordActivity) => activity.activityType == 'comment'))
      .subscribe((activity) => {
        this.fetchRealTimeData(activity);
      });

    this.loadPreviousValues();
  }

  fetchRealTimeData(activity: RecordActivity) {
    if (!activity.date) {
      activity.date = new Date();
    } else {
      activity.date = new Date(activity.date);
    }

    this.allComments.push(activity);
    this.cdr.detectChanges();
  }

  loadPreviousValues() {
    this.dataRealTimeService.getCommentsAndDoubts().subscribe((data: RecordActivity[]) => {
      if (data != null) {
        this.loadCcomments(data);
      }
    });
  }

  loadCcomments(previousData: RecordActivity[]) {
    this.allComments = previousData.map((comment) => {
      if (comment.date) {
        comment.date = new Date(comment.date);
      } else {
        comment.date = new Date();
      }
      return comment;
    });
    this.cdr.detectChanges();
  }

  onCheckboxChange(event: any, task: RecordActivity) {
    event.originalEvent.stopPropagation();
    task.done = event.checked;
    this.socketService.emit('markAsDone', { id: task._id, done: task.done });
    this.taskService.markAsCompleted(task);
  }

  parseDate(date: Date | string) {
    let d = new Date(date);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}
