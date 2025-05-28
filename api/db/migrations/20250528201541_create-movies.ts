import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("movies", (table) => {
    table.increments("id").primary();
    table.integer("year").notNullable();
    table.string("title").notNullable();
    table.string("studios").notNullable();
    table.boolean("winner").defaultTo(false);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("movies");
}
