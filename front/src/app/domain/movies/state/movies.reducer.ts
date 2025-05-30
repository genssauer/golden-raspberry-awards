import { createReducer, on } from '@ngrx/store';

import { MoviesActions } from './movies.actions';
import { InitialMoviesState } from './movies.state';

export const MoviesReducer = createReducer(
  InitialMoviesState,
  on(MoviesActions.loadMovies, (state, { year, winner }) => ({
    ...state,
    loading: true,
    filters: {
      year,
      winner,
    },
  })),
  on(MoviesActions.loadMoviesSuccess, (state, { movies, page, year }) => ({
    ...state,
    movies: movies,
    moviesFiltered: year
      ? movies.filter((movie) => movie.year === year)
      : movies,
    page,
    loading: false,
    error: null,
  })),
  on(MoviesActions.loadMoviesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
