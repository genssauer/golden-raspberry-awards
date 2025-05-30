import { Component, inject, OnInit, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { MoviesActions, MoviesSelectors } from '../../state';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTableModule } from 'ng-zorro-antd/table';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NzGridModule,
    NzTableModule,
    FormsModule,
    NzButtonModule,
    NzDatePickerModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private readonly store = inject(Store);

  protected readonly yearsWithMultipleWinners = this.store.selectSignal(
    MoviesSelectors.selectYearsWithMultipleWinners
  );

  protected readonly studiosWithWinCount = this.store.selectSignal(
    MoviesSelectors.selectStudiosWithWinCount
  );

  protected readonly maxMinWinIntervalForProducers = this.store.selectSignal(
    MoviesSelectors.selectMaxMinWinIntervalForProducers
  );

  protected readonly moviesFiltered = this.store.selectSignal(
    MoviesSelectors.selectMoviesFiltered
  );

  protected date = signal<Date | null>(null);

  ngOnInit(): void {
    this.store.dispatch(
      MoviesActions.loadMovies({
        page: 0,
        size: 206,
      })
    );
  }

  protected onChange(date: Date): void {
    this.store.dispatch(
      MoviesActions.loadMovies({
        page: 0,
        size: 206,
        year: date.getFullYear(),
        winner: true,
      })
    );
  }
}
