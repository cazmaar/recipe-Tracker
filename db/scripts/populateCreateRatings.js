import query from "../index.js";
import { restaurantRating } from "../../data/data.js";

// function to put already existing datas into the table in the database.
async function populateRestaurantRatings() {
  restaurantRating.forEach(async (item) => {
    const menu = item.menu;
    const amount_spent = item.amount_spent;
    const restaurant_rating = item.restaurant_rating;
    const res = await query(
      "INSERT INTO restaurants_ratings (menu, amount_spent,restaurant_rating) VALUES($1,$2,$3)RETURNING *",
      [menu, amount_spent, restaurant_rating]
    );
    console.log(res);
  });
}

populateRestaurantRatings();
