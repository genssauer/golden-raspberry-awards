import { createFeature } from '@ngrx/store';

import { MoviesReducer } from './movies.reducer';

export const MoviesFeature = createFeature({
  name: 'movies',
  reducer: MoviesReducer,
});
