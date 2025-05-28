import { knex } from "../database";
import { loadDataFromCSV } from "./csv-loader";

interface MovieInput {
  year: number;
  title: string;
  studios: string;
  producers: string[];
  winner: boolean;
}

export async function insertData(filePath: string): Promise<void> {
  const existing = await knex("movies").count("id as total").first();
  if (Number(existing?.total ?? 0) > 0) {
    console.log("Importação de dados já realizada, ignorando novo import...");
    return;
  }

  const movies: MovieInput[] = await loadDataFromCSV(filePath);

  for (const movie of movies) {
    const [movieId] = await knex("movies").insert({
      year: movie.year,
      title: movie.title,
      studios: movie.studios,
      winner: movie.winner,
    });

    for (const producerName of movie.producers) {
      let producer = await knex("producers")
        .where({ name: producerName })
        .first();

      if (!producer) {
        const [producerId] = await knex("producers").insert({
          name: producerName,
        });
        producer = { id: producerId };
      }

      await knex("movie_producers").insert({
        movie_id: movieId,
        producer_id: producer.id,
      });
    }
  }

  console.log("Importação de dados finalizada com sucesso.");
}
