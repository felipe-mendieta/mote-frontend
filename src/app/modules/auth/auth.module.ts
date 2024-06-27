import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginDashboardComponent } from './pages/login-dashboard/login-dashboard.component';

@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        LayoutComponent, LoginComponent, LoginFormComponent, LoginDashboardComponent
    ],
})
export class AuthModule { }
