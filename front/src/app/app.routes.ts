import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '' },
  {
    path: '',
    loadChildren: () =>
      import('./domain/movies/routes/movies.routes').then(
        (m) => m.MOVIES_ROUTES
      ),
  },
];
