import { HttpErrorResponse } from '@angular/common/http';

import { iMovies, iPage } from '../interfaces/movies.interface';

export interface MoviesState {
  movies: iMovies;
  moviesFiltered: iMovies;
  loading: boolean;
  error: HttpErrorResponse | null;
  page: iPage;
}

export const InitialMoviesState: MoviesState = {
  movies: [],
  moviesFiltered: [],
  loading: false,
  error: null,
  page: {
    size: 0,
    totalElements: 0,
    totalPages: 0,
    number: 0,
  },
};
