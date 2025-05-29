import { createSelector } from '@ngrx/store';
import { MoviesFeature } from './movies.feature';

const {
  selectMovies,
  selectPage,
  selectMoviesFiltered,
  selectLoading,
  selectError,
} = MoviesFeature;

export const selectYearsWithMultipleWinners = createSelector(
  selectMovies,
  (movies) => {
    const yearMap: { [year: number]: number } = {};
    movies.forEach((movie) => {
      if (movie.winner) {
        yearMap[movie.year] = (yearMap[movie.year] || 0) + 1;
      }
    });
    return {
      years: Object.entries(yearMap)
        .filter(([, winnerCount]) => winnerCount > 1)
        .map(([year, winnerCount]) => ({
          year: Number(year),
          winnerCount,
        })),
    };
  }
);

export const selectStudiosWithWinCount = createSelector(
  selectMovies,
  (movies) => {
    const studioMap: { [studio: string]: number } = {};
    movies.forEach((movie) => {
      if (movie.winner) {
        movie.studios.forEach((studio) => {
          studioMap[studio] = (studioMap[studio] || 0) + 1;
        });
      }
    });
    const studios = Object.entries(studioMap)
      .map(([name, winCount]) => ({
        name,
        winCount,
      }))
      .sort((a, b) => b.winCount - a.winCount)
      .slice(0, 3);
    return {
      studios,
    };
  }
);

export const selectMaxMinWinIntervalForProducers = createSelector(
  selectMovies,
  (movies) => {
    const producerWins: { [producer: string]: number[] } = {};
    movies.forEach((movie) => {
      if (movie.winner) {
        movie.producers.forEach((producer) => {
          if (!producerWins[producer]) {
            producerWins[producer] = [];
          }
          producerWins[producer].push(movie.year);
        });
      }
    });

    const intervals: {
      producer: string;
      interval: number;
      previousWin: number;
      followingWin: number;
    }[] = [];

    Object.entries(producerWins).forEach(([producer, years]) => {
      if (years.length > 1) {
        const sortedYears = years.sort((a, b) => a - b);
        for (let i = 1; i < sortedYears.length; i++) {
          intervals.push({
            producer,
            interval: sortedYears[i] - sortedYears[i - 1],
            previousWin: sortedYears[i - 1],
            followingWin: sortedYears[i],
          });
        }
      }
    });

    if (intervals.length === 0) {
      return { min: [], max: [] };
    }

    const minInterval = Math.min(...intervals.map((i) => i.interval));
    const maxInterval = Math.max(...intervals.map((i) => i.interval));

    return {
      min: intervals.filter((i) => i.interval === minInterval),
      max: intervals.filter((i) => i.interval === maxInterval),
    };
  }
);

export const MoviesSelectors = {
  selectMovies,
  selectPage,
  selectMoviesFiltered,
  selectLoading,
  selectError,
  selectYearsWithMultipleWinners,
  selectStudiosWithWinCount,
  selectMaxMinWinIntervalForProducers,
};
