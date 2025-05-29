import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';

import { iMovies, iPage } from '../interfaces/movies.interface';

export const MoviesActions = {
  loadMovies: createAction(
    '[Movies] Load Moviess',
    props<{
      page: number;
      size: number;
      year?: number;
      winner?: boolean;
    }>()
  ),
  loadMoviesSuccess: createAction(
    '[Movies] Load Movies Success',
    props<{
      movies: iMovies;
      page: iPage;
      year?: number;
    }>()
  ),
  loadMoviesFailure: createAction(
    '[Movies] Load Movies Failure',
    props<{ error: HttpErrorResponse }>()
  ),
};
