import query from "../index.js";

const sqlString =
  "CREATE TABLE IF NOT EXISTS restaurants_ratings (id_ratings SERIAL PRIMARY KEY, menu TEXT, amount_spent INT, restaurant_rating INT) ";
// function to create table in postgreSQL
const createRestaurantRatings = async () => {
  const res = await query(sqlString);
  console.log(res);
};

createRestaurantRatings();
