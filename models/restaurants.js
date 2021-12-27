import query from "../db/index.js";

// function to get all restaurants in the database
export async function getAllRestaurants() {
  const res = await query("SELECT * FROM restaurants_details  ");
  return res.rows;
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
    console.log(res);
  } else if (restaurantname !== undefined) {
    const res = await query(
      `SELECT * FROM restaurants_details JOIN restaurants_ratings on id = id_ratings WHERE restaurant_name ILIKE '%'||$1||'%'`,
      [restaurantname]
    );
    console.log(res);
  } else if (location !== undefined) {
    const res = await query(
      `SELECT * FROM restaurants_details JOIN restaurants_ratings on id = id_ratings WHERE location ILIKE '%'||$1||'%'`,
      [location]
    );
    console.log(res.rows);
  } else if (year !== undefined) {
    const res = await query(
      `SELECT * FROM restaurants_details JOIN restaurants_ratings ON id = id_ratings WHERE year = $1`,
      [year]
    );
    console.log(res.rows);
  } else if (month !== undefined) {
    const res = await query(
      `SELECT * FROM restaurants_details JOIN restaurants_ratings on id = id_ratings WHERE month ILIKE '%'||$1||'%'`,
      [month]
    );
    console.log(res.rows);
  } else if (ratings !== undefined) {
    const res = await query(
      `SELECT * FROM restaurants_details JOIN restaurants_ratings on id = id_ratings WHERE restaurant_rating = $1`,
      [ratings]
    );
    console.log(res.rows);
  } else if (menu !== undefined) {
    const res = await query(
      `SELECT * FROM restaurants_details JOIN restaurants_ratings on id = id_ratings WHERE menu ILIKE '%'||$1||'%'`,
      [menu]
    );
    console.log(res.rows);
  } else {
    const res = await query(
      `SELECT * FROM restaurants_details JOIN restaurants_ratings on id = id_ratings WHERE amount_spent = $1`,
      [amountspent]
    );
    console.log(res.rows);
  }
}

// function to get all restaurants in the database by id
export async function getRestaurantsById(id) {
  const res = await query(
    `SELECT * FROM restaurants_details JOIN restaurants_ratings ON id = id_ratings WHERE id = $1`,
    [id]
  );
  console.log(res.rows);
}

// // This function handles the post request to the restaurants details table.
export async function createRestaurantDetails(body) {
  const { date, name, location, year, month } = body;
  const res = await query(
    ` INSERT INTO restaurants_details(date, restaurant_name,location,year,month) VALUES ($1,$2,$3,$4,$5) RETURNING *`,
    [date, name, location, year, month]
  );
  console.log(res);
}

// This function handles the post request to the restaurant ratings table
export async function createRestaurantRating(body) {
  const { menu, amountSpent, restaurantRating } = body;
  const res = await query(
    `INSERT INTO restaurants_ratings (menu, amount_spent,restaurant_rating) VALUES($1,$2,$3) RETURNING *`,
    [menu, amountSpent, restaurantRating]
  );
  console.log(res.rows);
}
