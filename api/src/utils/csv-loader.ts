import fs from "fs";
import path from "path";
import csvParser from "csv-parser";

export interface MovieInput {
  year: number;
  title: string;
  studios: string;
  producers: string[];
  winner: boolean;
}

export function loadDataFromCSV(filePath: string): Promise<MovieInput[]> {
  return new Promise((resolve, reject) => {
    const results: MovieInput[] = [];

    fs.createReadStream(path.resolve(filePath))
      .pipe(csvParser({ separator: ";" }))
      .on("data", (data: any) => {
        const cleanProducers = (data.producers || "")
          .replace(/ and /gi, ",")
          .split(",")
          .map((p: string) => p.trim())
          .filter((p: string) => p.length > 0);

        results.push({
          year: parseInt(data.year),
          title: data.title?.trim(),
          studios: data.studios?.trim(),
          producers: cleanProducers,
          winner: (data.winner || "").toLowerCase() === "yes",
        });
      })
      .on("end", () => resolve(results))
      .on("error", reject);
  });
}
