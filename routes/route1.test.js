import request from "supertest";

import app from "../app.js";
// import getAllRestaurants

describe("API PATHS TEST", () => {
  test("get all restaurants request", async () => {
    await request(app)
      .get("/restaurants")
      .expect(200)
      .expect((res) => {
        const actual = res.body;
        console.log(actual);
      
        const expected = { success: true, payload: expect.any(Object) };
        expect(actual).toStrictEqual(expected);
      });
  });
});
