import { Component, inject, OnInit, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { MoviesActions, MoviesSelectors } from '../../state';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTableModule } from 'ng-zorro-antd/table';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [NzGridModule, NzTableModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  private readonly store = inject(Store);

  protected readonly movies = this.store.selectSignal(
    MoviesSelectors.selectMovies
  );

  protected readonly loading = this.store.selectSignal(
    MoviesSelectors.selectLoading
  );

  protected readonly page = this.store.selectSignal(MoviesSelectors.selectPage);

  ngOnInit(): void {
    this.store.dispatch(
      MoviesActions.loadMovies({
        page: 0,
        size: 10,
      })
    );
  }

  protected onChangePage(page: number): void {
    const pageSize = this.page().size;
    this.store.dispatch(
      MoviesActions.loadMovies({
        page: page - 1,
        size: pageSize,
      })
    );
  }
}
