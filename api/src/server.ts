import { app } from "./app";
import { insertData } from "./utils/load-data";
import { env } from "./env";
import path from "path";

async function bootstrap() {
  try {
    console.log("Importing CSV into the database...");

    const csvPath = path.resolve(__dirname, "data", "movielist.csv");
    await insertData(csvPath);

    await app.listen({ host: "0.0.0.0", port: env.PORT });
    console.log(`Server is running on http://localhost:${env.PORT}`);
  } catch (err) {
    console.error("Error starting server:", err);
    process.exit(1);
  }
}

bootstrap();
