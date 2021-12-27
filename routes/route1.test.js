// import { expect } from "chai";

import request from "supertest";
import jest from "jest";

import app from "../app.js";
// import getAllRestaurants

// describe("API PATHS TEST", () => {
//   jest.setTimeout(10000); 
//   test("get all restaurants request", async () => {
//     await request(app)
//       .get("/restaurants")
//       .expect(200)
//       .expect((res) => {
//         const actual = res.body;
//         const expected = {
//           success: true,
//           payload: expect.any(Object),
//         };
//         expect(actual).toStrictEqual(expected);
//       });
//   });
// });
