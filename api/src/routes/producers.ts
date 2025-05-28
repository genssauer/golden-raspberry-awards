import { knex } from "../database";
import { FastifyInstance } from "fastify";

export async function producersRoutes(app: FastifyInstance) {
  app.get("/intervals", async (request, reply) => {
    const winners = await knex("movie_producers")
      .join("movies", "movie_producers.movie_id", "movies.id")
      .join("producers", "movie_producers.producer_id", "producers.id")
      .select("producers.name as producer", "movies.year as year")
      .where("movies.winner", true)
      .orderBy("producers.name")
      .orderBy("movies.year", "asc");

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
      const years = byProducer[producer];
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
