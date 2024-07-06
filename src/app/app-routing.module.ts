import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
/*Componentes propios*/

import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { redirectGuard } from './guards/redirect.guard';
import { authGuard } from './guards/auth.guard';
import { authDashboardGuard } from './guards/auth-dashboard.guard';
import { roleGuard } from './guards/role.guard';
import { dashboardroleGuard } from './guards/dashboardrole.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((module) => module.AuthModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin/admin.routes').then(m=> m.routes),
  },
  {
    path: 'student',
    canActivate: [authGuard, roleGuard],
    loadChildren: () =>
      import('./modules/student/student.module').then(
        (module) => module.StudentModule
      ),
  },
  {
    path: 'dashboard',
    //canActivate: [authDashboardGuard, dashboardroleGuard],
    loadChildren: () =>
      import('./modules/dashboard/dashboard-routing.module').then(
        (m=> m.routes)
      ),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      bindToComponentInputs: true,
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
