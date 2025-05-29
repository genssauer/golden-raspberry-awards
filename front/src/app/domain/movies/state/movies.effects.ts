import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { MoviesService } from '../services/movies.service';
import { MoviesActions } from './movies.actions';

@Injectable()
export class MoviesEffects {
  private readonly actions$ = inject(Actions);

  private readonly moviesService = inject(MoviesService);

  public readonly loadMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.loadMovies),
      switchMap(({ page, size, year, winner }) =>
        this.moviesService.find(page, size, year, winner).pipe(
          map((response) =>
            MoviesActions.loadMoviesSuccess({
              movies: response._embedded.movies,
              page: response.page,
              year,
            })
          ),
          catchError((error: HttpErrorResponse) =>
            of(MoviesActions.loadMoviesFailure({ error }))
          )
        )
      )
    )
  );
}
