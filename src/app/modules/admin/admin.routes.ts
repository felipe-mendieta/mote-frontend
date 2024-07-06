import {Routes} from "@angular/router";
import { AppLayoutComponent } from './components/layout/app.layout.component';
import { AdminHomeComponent } from './components/pages/admin-home/admin-home.component';
import { RoomInfoComponent } from "./components/pages/room-info/room-info.component";
import { DashboardComponent } from "./components/pages/dashboard/dashboard.component";
export const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {path: '', data: { breadcrumb: 'home' }, component: AdminHomeComponent},
      { path: 'comments', data: { breadcrumb: 'comentarios' }, loadChildren: () => import('./components/pages/comments/comments.app.module').then(m => m.CommentsAppModule) },
      { path: 'roomInfo', data: { breadcrumb: 'sala' }, component: RoomInfoComponent},
      { path: 'dashboard', data: { breadcrumb: 'dashboard' }, component: DashboardComponent},
    ]
  },
];
