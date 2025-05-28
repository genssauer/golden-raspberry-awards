import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("movie_producers", function (table) {
    table.integer("movie_id").unsigned().notNullable();
    table.integer("producer_id").unsigned().notNullable();

    table.foreign("movie_id").references("movies.id").onDelete("CASCADE");
    table.foreign("producer_id").references("producers.id").onDelete("CASCADE");

    table.primary(["movie_id", "producer_id"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("movie_producers");
}
