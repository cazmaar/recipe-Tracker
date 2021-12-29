
import { sortByRatings, convertDate } from "./main.js";

it("Should return recently visited restaurants sorted by highest to lowest ratings.", () => {
  //Arrange
  const expected = [
    {
      amount_spent: expect.any(Number),
      date: expect.any(String),
      id: expect.any(Number),
      id_ratings: expect.any(Number),
      location: expect.any(String),
      menu: expect.any(String),
      month: expect.any(String),
      restaurant_name: expect.any(String),
      restaurant_rating: 4,
      year: expect.any(Number),
    },
    {
      amount_spent: expect.any(Number),
      date: expect.any(String),
      id: expect.any(Number),
      id_ratings: expect.any(Number),
      location: expect.any(String),
      menu: expect.any(String),
      month: expect.any(String),
      restaurant_name: expect.any(String),
      restaurant_rating: 2,
      year: expect.any(Number),
    },
  ];

  const restaurants = [
    {
      amount_spent: 90,
      date: "2020-05-31T23:00:00.000Z",
      id: 1,
      id_ratings: 1,
      location: "london",
      menu: "wafsdghjw",
      month: "june",
      restaurant_name: "Mr Biggs",
      restaurant_rating: 2,
      year: 2020,
    },
    {
      amount_spent: 90,
      date: "2020-05-31T23:00:00.000Z",
      id: 1,
      id_ratings: 1,
      location: "london",
      menu: "wafsdghjw",
      month: "june",
      restaurant_name: "Mr Biggs",
      restaurant_rating: 4,
      year: 2020,
    },
  ];
  const actual = sortByRatings(restaurants);
  expect(actual).toStrictEqual(expected);
});

// it("Should return date in this format", () => {
//   // arrange
//   const restaurantArray = [
//     {
//       amount_spent: 90,
//       date: "2020-05-31T23:00:00.000Z",
//       id: 1,
//       id_ratings: 1,
//       location: "london",
//       menu: "wafsdghjw",
//       month: "june",
//       restaurant_name: "Mr Biggs",
//       restaurant_rating: 2,
//       year: 2020,
//     },
//   ];

//   const expected = [
//     {
//       amount_spent: 90,
//       date: "05/31/20",
//       id: 1,
//       id_ratings: 1,
//       location: "london",
//       menu: "wafsdghjw",
//       month: "june",
//       restaurant_name: "Mr Biggs",
//       restaurant_rating: 2,
//       year: 2020,
//     },
//   ];
//   const actual = convertDate(restaurantArray);
//   expect(actual).toStrictEqual(expected);
// });
