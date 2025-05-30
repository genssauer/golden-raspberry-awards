import { Routes } from '@angular/router';
import { ListComponent } from '../pages/list/list.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';

export const MOVIES_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'list',
    component: ListComponent,
  },
];
