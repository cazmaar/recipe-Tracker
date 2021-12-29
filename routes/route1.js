import express from "express";
import jest from "jest";

import {
  getAllRestaurants,
  getRestaurantsById,
  getRestaurantsByQuery,
  createRestaurantDetails,
  createRestaurantRating,
} from "../models/restaurants.js";

const router = express.Router();

// listen to get request to the restaurants path. Also checks if a query was entered.
router.get("/", async function (req, res) {
  // destructures the properties from the req.query object
  const {
    date,
    restaurantname,
    location,
    year,
    month,
    ratings,
    menu,
    amountspent,
  } = req.query;

  // checks if a query was entered
  if (
    date !== undefined ||
    restaurantname !== undefined ||
    location !== undefined ||
    year ||
    undefined ||
    month !== undefined ||
    ratings !== undefined ||
    menu !== undefined ||
    amountspent !== undefined
  ) {
    // arguments are passed into the getRestaurantsByQuery function.
    const restaurantByQuery = await getRestaurantsByQuery(
      date,
      restaurantname,
      location,
      year,
      month,
      ratings,
      menu,
      amountspent
    );
    // A response is sent based on what was requested.
    res.json({ success: true, payload: restaurantByQuery });
  }
  // if no query was entered a request is sent to get all restaurants.
  else {
    const allRestaurant = await getAllRestaurants();
    res.json({
      success: true,
      payload: allRestaurant,
    });
  }
});

// this listens to get request by id
router.get("/:id", async function (req, res) {
  // destructures the id from the req.params object.
  const { id } = req.params;

  // The id is entered into the getRestaurantsById function.
  const restaurantById = await getRestaurantsById();

  // A response is sent based on what was requested.
  res.json({
    success: true,
    payload: restaurantById,
  });
});

// This handles post request to the restaurants details table.
router.post("/", async (req, res) => {
  
  // destructures the parameters from the req.body object.
  const { menu, amountSpent, restaurantRating } = req.body;

  // checks if the parameters destructured actually exist.
  if (
    menu !== undefined &&
    amountSpent !== undefined &&
    restaurantRating !== undefined
  ) {
    // if the parameters exist it creates a new restaurant restaurant rating table.
    const body = req.body;
    const created = await createRestaurantRating(body);
    res.json({ success: true, payload: created });
  }
  // this creates a new restaurant in the restaurant details table.
  else {
    const body = req.body;
    const created = await createRestaurantDetails(body);
    res.json({ success: true, payload: created });
  }
});
export default router;
