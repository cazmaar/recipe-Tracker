import query from "../db/index.js";
import moment from "moment";

// function to get all restaurants in the database
export async function getAllRestaurants() {
  // const res = await query(
  //   `SELECT * FROM restaurants_details JOIN restaurants_ratings ON id = id_ratings`
  // );
  // const response = res.rows;
  return 1;
}

// This function get information from the database based on the query given.
export async function getRestaurantsByQuery(
  date,
  restaurantname,
  location,
  year,
  month,
  ratings,
  menu,
  amountspent
) {
  if (date !== undefined) {
    const res = await query(
      `SELECT * FROM restaurants_details JOIN restaurants_ratings ON id = id_ratings WHERE date ILIKE '%'||$1||'%'`,
      [date]
    );
    return res.rows;
  } else if (restaurantname !== undefined) {
    const res = await query(
      `SELECT * FROM restaurants_details JOIN restaurants_ratings on id = id_ratings WHERE restaurant_name ILIKE '%'||$1||'%'`,
      [restaurantname]
    );
    return res.rows;
  } else if (location !== undefined) {
    const res = await query(
      `SELECT * FROM restaurants_details JOIN restaurants_ratings on id = id_ratings WHERE location ILIKE '%'||$1||'%'`,
      [location]
    );
    return res.rows;
  } else if (year !== undefined) {
    const res = await query(
      `SELECT * FROM restaurants_details JOIN restaurants_ratings ON id = id_ratings WHERE year = $1`,
      [year]
    );
    return res.rows;
  } else if (month !== undefined) {
    const res = await query(
      `SELECT * FROM restaurants_details JOIN restaurants_ratings on id = id_ratings WHERE month ILIKE '%'||$1||'%'`,
      [month]
    );
    return res.rows;
  } else if (ratings !== undefined) {
    const res = await query(
      `SELECT * FROM restaurants_details JOIN restaurants_ratings on id = id_ratings WHERE restaurant_rating = $1`,
      [ratings]
    );
    return res.rows;
  } else if (menu !== undefined) {
    const res = await query(
      `SELECT * FROM restaurants_details JOIN restaurants_ratings on id = id_ratings WHERE menu ILIKE '%'||$1||'%'`,
      [menu]
    );
    return res.rows;
  } else {
    const res = await query(
      `SELECT * FROM restaurants_details JOIN restaurants_ratings on id = id_ratings WHERE amount_spent = $1`,
      [amountspent]
    );
    return res.rows;
  }
}

// function to get all restaurants in the database by id
export async function getRestaurantsById(id) {
  const res = await query(
    `SELECT * FROM restaurants_details JOIN restaurants_ratings ON id = id_ratings WHERE id = $1`,
    [id]
  );
  console.log(res.rows)
  return res.rows;
}

// // This function handles the post request to the restaurants details table.
export async function createRestaurantDetails(body) {
  const { date, nameV, location, month } = body;
  console.log(body);
  const res = await query(
    ` INSERT INTO restaurants_details(date, restaurant_name,location,month) VALUES ($1,$2,$3,$4) RETURNING *`,
    [date, nameV, location, month]
  );
  return res.rows;
}

// This function handles the post request to the restaurant ratings table
export async function createRestaurantRating(body) {
  const { menu, amountSpent, restaurantRating } = body;
  const res = await query(
    `INSERT INTO restaurants_ratings (menu, amount_spent,restaurant_rating) VALUES($1,$2,$3) RETURNING *`,
    [menu, amountSpent, restaurantRating]
  );
  return res.rows;
}
