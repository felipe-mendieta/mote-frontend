import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { StudentRoutingModule } from './student-routing.module';
import { HeaderComponent } from './components/header/header.component';

import { EngagementComponent } from './components/engagement/engagement.component';
import { EngagementIconQuestionComponent } from './components/engagement-icon-question/engagement-icon-question.component';

import { MyPollComponent } from './pages/my-poll/my-poll.component';
import { HomeComponent } from './pages/home/home.component';
import { MyEngagementPollComponent } from './pages/my-engagement-poll/my-engagement-poll.component';
import { LayoutComponent } from './components/layout/layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MyDoubtComponent } from './pages/my-doubt/my-doubt.component';
import { TitlePageComponent } from './components/title-page/title-page.component';
import { ButtonIconTextComponent } from './components/button-icon-text/button-icon-text.component';
import { ButtonIconComponent } from './components/button-icon/button-icon.component';
import { FooterComponent } from './components/footer/footer.component';
import { ButtonTextComponent } from './components/button-text/button-text.component';
import { MySuccessComponent } from './pages/my-success/my-success.component';
import { MyEmotionsComponent } from './pages/my-emotions/my-emotions.component';
import { LikertQuestionComponent } from './components/likert-question/likert-question.component';
import { SingleOptionQuestionComponent } from './components/single-option-question/single-option-question.component';
import { MultipleOptionQuestionComponent } from './components/multiple-option-question/multiple-option-question.component';
import { StudentProgressBarComponent } from './components/student-progress-bar/student-progress-bar.component';
import { MyCommentComponent } from './pages/my-comment/my-comment.component';

import { StudentDropdownOptionsComponent } from './components/student-dropdown-options/student-dropdown-options.component';
import { MyBadgeComponent } from './pages/my-badge/my-badge.component';


@NgModule({ imports: [CommonModule,
        StudentRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        HeaderComponent,
        EngagementComponent,
        EngagementIconQuestionComponent,
        MyPollComponent,
        HomeComponent,
        MyEngagementPollComponent,
        LayoutComponent,
        MyDoubtComponent,
        TitlePageComponent,
        ButtonIconTextComponent,
        ButtonIconComponent,
        FooterComponent,
        ButtonTextComponent,
        MySuccessComponent,
        MyEmotionsComponent,
        LikertQuestionComponent,
        SingleOptionQuestionComponent,
        MultipleOptionQuestionComponent,
        StudentProgressBarComponent,
        MyCommentComponent,
        StudentDropdownOptionsComponent,
        MyBadgeComponent], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class StudentModule {}
