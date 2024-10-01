import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommentsAppRoutingModule } from './comments.app-routing.module';
import { CommentsAppComponent } from './comments.app.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { EditorModule } from 'primeng/editor'
import { CalendarModule } from 'primeng/calendar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ToastModule } from 'primeng/toast';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { CommentsComponent } from './comments-list/comments-list.component'
import { CommentsService } from './service/comments.service';
import { RippleModule } from 'primeng/ripple';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CommentsAppRoutingModule,
        ButtonModule,
        InputTextModule,
        EditorModule,
        CalendarModule,
        ToastModule,
        AutoCompleteModule,
        AvatarModule,
        AvatarGroupModule,
        CheckboxModule,
        MenuModule,
        DialogModule,
        RippleModule,
        CommentsAppComponent, CommentsAppComponent
    ],
    providers: [CommentsService]
})
export class CommentsAppModule { }
