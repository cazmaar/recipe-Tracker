import query from "../index.js";

const sqlString =
  "CREATE TABLE IF NOT EXISTS restaurants_details (id SERIAL PRIMARY KEY, date DATE, restaurant_name TEXT, location TEXT, month TEXT)";

// function to create table is postgreSQL
const createRestaurantDetails = async () => {
  const res = await query(sqlString);
  console.log(res);
};

createRestaurantDetails();
