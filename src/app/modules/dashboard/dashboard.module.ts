import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MyRealtimeComponent } from './pages/my-realtime/my-realtime.component';


@NgModule({
  declarations: [
    HomeComponent,
    LayoutComponent,
    HeaderComponent,
    DashboardComponent,
    MyRealtimeComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }