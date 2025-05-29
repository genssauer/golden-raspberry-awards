export interface iMovie {
  year: number;
  title: string;
  studios: string[];
  producers: string[];
  winner: boolean;
}

export type iMovies = iMovie[];

export interface iMoviesResponse {
  _embedded: iEmbedded;
  _links: iLinks;
  page: iPage;
}

export interface iEmbedded {
  movies: iMovies;
}

export interface iPage {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}

export interface iLinks {
  first: iUrl;
  self: iUrl;
  next: iUrl;
  last: iUrl;
  profile: iUrl;
  search: iUrl;
}

export interface iUrl {
  href: string;
  templated?: boolean;
}
