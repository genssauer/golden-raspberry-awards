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
  on(MoviesActions.loadMoviesSuccess, (state, { movies, page, year }) => {
    const newState = {
      ...state,
      movies,
      page,
      loading: false,
      error: null,
    };

    if (year) {
      newState.movies = state.movies;
      newState.moviesFiltered = movies;
    } else {
      newState.movies = movies;
    }

    return newState;
  }),
  on(MoviesActions.loadMoviesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
