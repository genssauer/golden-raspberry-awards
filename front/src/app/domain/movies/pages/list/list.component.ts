import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MoviesActions, MoviesSelectors } from '../../state';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTableModule } from 'ng-zorro-antd/table';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzGridModule,
    NzTableModule,
    NzFormModule,
    NzSelectModule,
    NzDatePickerModule,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  private readonly store = inject(Store);

  private readonly destroyRef = inject(DestroyRef);

  protected readonly movies = this.store.selectSignal(
    MoviesSelectors.selectMovies
  );

  protected readonly loading = this.store.selectSignal(
    MoviesSelectors.selectLoading
  );

  protected readonly page = this.store.selectSignal(MoviesSelectors.selectPage);

  protected searchForm = new FormGroup({
    year: new FormControl<Date | null>(null),
    winner: new FormControl<boolean | null>(null),
  });

  ngOnInit(): void {
    this.store.dispatch(
      MoviesActions.loadMovies({
        page: 0,
        size: 10,
      })
    );

    this.observeSearchForm();
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

  protected observeSearchForm(): void {
    const year$ = this.searchForm.controls.year.valueChanges;
    const winner$ = this.searchForm.controls.winner.valueChanges;

    combineLatest([year$, winner$])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(([year, winner]) => {
        this.store.dispatch(
          MoviesActions.loadMovies({
            page: 0,
            size: 10,
            year: year?.getFullYear(),
            winner: winner ?? undefined,
          })
        );
      });
  }
}
