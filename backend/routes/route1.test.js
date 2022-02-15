// import { expect } from "chai";

import request from "supertest";
import jest from "jest";
import app from "../app.js";

const expectedArray = {
  amount_spent: expect.any(Number),
  date: expect.any(String),
  id: expect.any(Number),
  id_ratings: expect.any(Number),
  location: expect.any(String),
  menu: expect.any(String),
  month: expect.any(String),
  restaurant_name: expect.any(String),
  restaurant_rating: expect.any(Number)
};

describe("Check to see if the routes work", () => {
  test("should return status code 200 if route works", async () => {
    const res = await request(app).get("/restaurants");
    expect(res.statusCode).toBe(200);
  });
  test("should return the specific json if route works", async () => {
    const res = await request(app).get("/restaurants");
    const expected = {
      success: true,
      payload: expect.any(Array)
    };
    const actual = res.body;
    expect(res.body).toEqual(expected);

    actual.payload.forEach((user) => {
      expect(user).toEqual(expectedArray);
    });
  });
  test("should return the specific json if route works", async () => {
    const res = await request(app).get("/restaurants/2");
    const expected = { success: true, payload: [expectedArray] };
    const actual = res.body;
    expect(actual).toEqual(expected);
  });

   test("should return the specific json if route works", async () => {
     const res = await request(app).get("/restaurants/2");
     const expected = { success: true, payload: [expectedArray] };
     const actual = res.body;
     expect(actual).toEqual(expected);
   });


});
