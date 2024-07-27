import {Routes} from "@angular/router";
import { AppLayoutComponent } from './components/layout/app.layout.component';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { RoomInfoComponent } from "./pages/room-info/room-info.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { SurveyResultsComponent } from "./pages/survey/survey-results/survey-results.component";
import { SurveyComponent } from "./pages/survey/survey.component";
import { LoginComponent } from "./pages/login/login.component";
import { authDashboardGuard } from '../../guards/auth-dashboard.guard';
import { dashboardroleGuard } from '../../guards/dashboardrole.guard';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'panel',
    canActivate: [authDashboardGuard, dashboardroleGuard],
    component: AppLayoutComponent,
    children: [
      {path: '', data: { breadcrumb: 'home' }, component: AdminHomeComponent},
      { path: 'comments', data: { breadcrumb: 'comentarios' }, loadChildren: () => import('./pages/comments/comments.app.module').then(m => m.CommentsAppModule) },
      { path: 'roomInfo', data: { breadcrumb: 'sala' }, component: RoomInfoComponent},
      { path: 'dashboard', data: { breadcrumb: 'dashboard' }, component: DashboardComponent},
      { path: 'surveyResults', data: { breadcrumb: 'resultados encuesta' }, component: SurveyResultsComponent},
      { path: 'survey', data: { breadcrumb: 'enviar encuesta' }, component: SurveyComponent},
    ],
  },
  {
    path: 'login',
    component: LoginComponent
  }
];
