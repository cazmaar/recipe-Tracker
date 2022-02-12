import { restaurant_details } from "../../data/data.js";
import query from "../index.js";

// function to put already existing data into the table in the database.
async function populateCreateRestaurantDetails() {
  restaurant_details.forEach(async (item) => {
    const date = item.date;
    const name = item.name;
    const location = item.location;
    const month = item.month;
    const res = await query(
      "INSERT INTO restaurants_details(date, restaurant_name,location,month) VALUES ($1,$2,$3,$4) RETURNING *",
      [date, name, location,month]
    );
    console.log(res);
  });
}

populateCreateRestaurantDetails();
