import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { iMoviesResponse } from '../interfaces/movies.interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private readonly http = inject(HttpClient);

  public find(
    page: number,
    size: number,
    year?: number,
    winner?: boolean
  ): Observable<iMoviesResponse> {
    const params: { [key: string]: string } = {
      page: page.toString(),
      size: size.toString(),
    };

    if (year) {
      params['year'] = year.toString();
    }

    if (winner) {
      params['winner'] = winner.toString();
    }

    if (year || winner !== undefined) {
      return this.http.get<iMoviesResponse>(
        `${environment.api}/movies/search/findByWinnerAndYear`,
        {
          params,
        }
      );
    }

    return this.http.get<iMoviesResponse>(`${environment.api}/movies`, {
      params,
    });
  }
}
