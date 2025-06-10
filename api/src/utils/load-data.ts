import { loadDataFromCSV } from "./csv-loader";

interface MovieInput {
  year: number;
  title: string;
  studios: string;
  producers: string[];
  winner: boolean;
}

export const moviesMemory: MovieInput[] = [];
export const producersMemory: { id: number; name: string }[] = [];
export const movieProducersMemory: { movie_id: number; producer_id: number }[] =
  [];

let producerIdCounter = 1;
let movieIdCounter = 1;

export async function insertData(filePath: string): Promise<void> {
  if (moviesMemory.length > 0) {
    console.log("Importação de dados já realizada, ignorando novo import...");
    return;
  }

  const movies: MovieInput[] = await loadDataFromCSV(filePath);

  for (const movie of movies) {
    const movieId = movieIdCounter++;
    moviesMemory.push({ ...movie });

    for (const producerName of movie.producers) {
      let producer = producersMemory.find((p) => p.name === producerName);

      if (!producer) {
        producer = { id: producerIdCounter++, name: producerName };
        producersMemory.push(producer);
      }

      movieProducersMemory.push({
        movie_id: movieId,
        producer_id: producer.id,
      });
    }
  }

  console.log("Importação de dados finalizada com sucesso.");
}
