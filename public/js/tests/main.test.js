import { sortByRatings } from "../utils/index.js";
import { pictureChange } from "../utils/index.js";

describe("it should change the image image_tracker to either salmon or healthy", () => {
  it("Change the image tracker to healthy if its salmon", () => {
    // arrange
    let image_tracker = "salmon";
    const expected = "healthy";
    const actual = pictureChange(image_tracker);
    expect(actual).toBe(expected);
  });
});

describe("it should sort the array by ratings from highest to lowest", () => {
  test("should sort the array", () => {
    // arrange
    const data = [
      {
        amount_spent: 20,
        date: "25/12/2021",
        id: 14,
        id_ratings: 14,
        location: "london",
        menu: "Boritos",
        month: "december",
        restaurant_name: "Cactus",
        restaurant_rating: 3
      },
      {
        amount_spent: 25,
        date: "25/12/2021",
        id: 14,
        id_ratings: 14,
        location: "london",
        menu: "Boritos",
        month: "december",
        restaurant_name: "Cactus",
        restaurant_rating: 5
      },
      {
        amount_spent: 11,
        date: "25/12/2021",
        id: 14,
        id_ratings: 14,
        location: "london",
        menu: "Boritos",
        month: "december",
        restaurant_name: "Cactus",
        restaurant_rating: 7
      }
    ];
    const expected = [
      {
        amount_spent: 11,
        date: "25/12/2021",
        id: 14,
        id_ratings: 14,
        location: "london",
        menu: "Boritos",
        month: "december",
        restaurant_name: "Cactus",
        restaurant_rating: 7
      },

      {
        amount_spent: 25,
        date: "25/12/2021",
        id: 14,
        id_ratings: 14,
        location: "london",
        menu: "Boritos",
        month: "december",
        restaurant_name: "Cactus",
        restaurant_rating: 5
      },
      {
        amount_spent: 20,
        date: "25/12/2021",
        id: 14,
        id_ratings: 14,
        location: "london",
        menu: "Boritos",
        month: "december",
        restaurant_name: "Cactus",
        restaurant_rating: 3
      }
    ];
    const actual = sortByRatings(data);
    expect(actual).toStrictEqual(expected);
  });
});
