import query from "../db/index.js";

// function to get all restaurants in the database
async function getAllRestaurants() {
  const res = await query("SELECT * FROM restaurants_details  ");
  console.log(res);
}

getAllRestaurants();

async function getRestaurantsByQuery(
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

getRestaurantsByQuery(
  undefined,
  undefined,
  undefined,
  2021,
  "june",
  1,
  "ww",
  90
);

// function to get all restaurants in the database by id
async function getRestaurantsById(id) {
  const res = await query(
    "SELECT * FROM restaurants_details JOIN restaurants_ratings ON id = id_ratings WHERE id = $1",
    [id]
  );
  console.log(res.rows);
}

getRestaurantsById(9);
