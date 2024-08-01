import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { DialogConfig, Task } from 'src/app/demo/api/comment';
import { RecordActivity } from 'src/app/interfaces/activity.interface';

@Injectable()
export class CommentsService {

    dialogConfig: DialogConfig = {
        visible: false,
        header: '',
        newTask: false
    };

    tasks: RecordActivity[] = [];

    private taskSource = new BehaviorSubject<RecordActivity[]>(this.tasks);

    private selectedTask = new Subject<RecordActivity>();

    private dialogSource = new BehaviorSubject<DialogConfig>(this.dialogConfig);

    taskSource$ = this.taskSource.asObservable();

    selectedTask$ = this.selectedTask.asObservable();

    dialogSource$ = this.dialogSource.asObservable();

    constructor(private http: HttpClient) {
        this.http.get<any>('assets/demo/data/tasks.json')
            .toPromise()
            .then(res => res.data as RecordActivity[])
            .then(data => {
                this.tasks = data;
                this.taskSource.next(data);
            });
    }

    addTask(task: RecordActivity) {
        if (this.tasks.includes(task)) {
            this.tasks = this.tasks.map(t => t._id === task._id ? task : t);
        }
        else {
            this.tasks = [...this.tasks, task];
        }

        this.taskSource.next(this.tasks);
    }

    removeTask(id: number) {
        this.tasks = this.tasks.filter(t => t._id !== id.toString());
        this.taskSource.next(this.tasks);
    }

    onTaskSelect(task: RecordActivity) {
        this.selectedTask.next(task);
    }

    markAsCompleted(task: RecordActivity) {
        this.tasks = this.tasks.map(t => t._id === task._id ? task : t);
        this.taskSource.next(this.tasks);
    }

    showDialog(header: string, newTask: boolean) {
        this.dialogConfig = {
            visible: true,
            header: header,
            newTask: newTask
        };

        this.dialogSource.next(this.dialogConfig);
    }

    closeDialog() {
        this.dialogConfig = {
            visible: false
        }

        this.dialogSource.next(this.dialogConfig);
    }

}
