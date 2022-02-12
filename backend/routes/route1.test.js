// import { expect } from "chai";

import request from "supertest";
import jest from "jest";
import app from "../app.js";

describe("Check to see if the routes work", () => {
  test("should return status code 200 if route works", async () => {
    const res = await request(app).get("/restaurants");
    expect(res.statusCode).toBe(200);
  });
});
