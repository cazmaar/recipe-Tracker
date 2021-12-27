import express from "express";

import { getAllRestaurants } from "../models/restaurants.js";

const router = express.Router();

router.get("/", async function (req, res) {
  const allRestaurant = await getAllRestaurants();
  res.json({ success: true, payload: getAllRestaurants });
});

export default router;
