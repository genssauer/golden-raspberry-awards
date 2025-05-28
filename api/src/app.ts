import fastify from "fastify";
import { producersRoutes } from "./routes/producers";

export const app = fastify();

app.register(producersRoutes, {
  prefix: "producers",
});
