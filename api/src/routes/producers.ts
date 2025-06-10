import { FastifyInstance } from "fastify";
import {
  moviesMemory,
  producersMemory,
  movieProducersMemory,
} from "../utils/load-data";

export async function producersRoutes(app: FastifyInstance) {
  app.get("/intervals", async (request, reply) => {
    const winners = movieProducersMemory
      .map((mp) => {
        const movie = moviesMemory[mp.movie_id - 1];
        const producer = producersMemory.find((p) => p.id === mp.producer_id);
        if (movie && producer && movie.winner) {
          return {
            producer: producer.name,
            year: movie.year,
          };
        }
        return null;
      })
      .filter(Boolean) as { producer: string; year: number }[];

    const byProducer: Record<string, number[]> = {};
    for (const row of winners) {
      byProducer[row.producer] ||= [];
      byProducer[row.producer].push(row.year);
    }

    const intervals: {
      producer: string;
      interval: number;
      previousWin: number;
      followingWin: number;
    }[] = [];

    for (const producer in byProducer) {
      const years = byProducer[producer].sort((a, b) => a - b);
      for (let i = 0; i < years.length - 1; i++) {
        intervals.push({
          producer,
          interval: years[i + 1] - years[i],
          previousWin: years[i],
          followingWin: years[i + 1],
        });
      }
    }

    if (intervals.length === 0) {
      return { min: [], max: [] };
    }

    const minInterval = Math.min(...intervals.map((i) => i.interval));
    const maxInterval = Math.max(...intervals.map((i) => i.interval));

    return {
      min: intervals.filter((i) => i.interval === minInterval),
      max: intervals.filter((i) => i.interval === maxInterval),
    };
  });
}
