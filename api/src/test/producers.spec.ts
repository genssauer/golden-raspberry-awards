import { it, beforeAll, afterAll, describe, expect, beforeEach } from "vitest";
import { execSync } from "node:child_process";
import request from "supertest";
import { app } from "../app";
import path from "node:path";
import { insertData } from "../utils/load-data";

describe("Producers routes", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    execSync("npm run knex migrate:rollback --all");
    execSync("npm run knex migrate:latest");

    const csvPath = path.resolve(__dirname, "..", "data", "movielist.csv");
    await insertData(csvPath);
  });

  it("should list min and max interval producers after inserting data", async () => {
    const response = await request(app.server)
      .get("/producers/intervals")
      .expect(200);

    expect(response.body.min).toEqual([
      expect.objectContaining({
        producer: "Joel Silver",
        interval: 1,
        previousWin: 1990,
        followingWin: 1991,
      }),
    ]);
    expect(response.body.max).toEqual([
      expect.objectContaining({
        producer: "Matthew Vaughn",
        interval: 13,
        previousWin: 2002,
        followingWin: 2015,
      }),
    ]);
  });
});
