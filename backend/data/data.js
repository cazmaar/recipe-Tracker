export const restaurant_details = [
  {
    date: "2021-01-03",
    name: "Hibox",
    location: "london",
    month: "january",
  },
  {
    date: "2021-01-09",
    name: "Nandos",
    location: "london",
    month: "january",
  },
  {
    date: "2021-01-17",
    name: "Laki Kane",
    location: "london",
    month: "january",
  },
  {
    date: "2021-01-24",
    name: "Hakansan",
    location: "birmingham",
    month: "january",
  },
  {
    date: "2021-02-14",
    name: "Maddisons",
    location: "birmingham",
    month: "February",
  },
  {
    date: "2021-02-28",
    name: "Berners Tavern",
    location: "manchester",
    month: "February",
  },
  {
    date: "2021-03-05",
    name: "Mr-Biggs",
    location: "amsterdam",
    month: "march",
  },
  {
    date: "2021-03-20",
    name: "Scarlett green",
    location: "liverpool",
    month: "march",
  },
  {
    date: "2021-04-07",
    name: "Tavern",
    location: "london",
    month: "april",
  },
  {
    date: "2021-04-14",
    name: "Madders",
    location: "manchester",
    month: "april",
  },
  {
    date: "2021-04-24",
    name: "Chelshit",
    location: "manchester",
    month: "april",
  },
  {
    date: "2021-05-06",
    name: "Berners",
    location: "liverpool",
    month: "may",
  },
  {
    date: "2021-05-18",
    name: "Berners Tavern",
    location: "london",
    month: "may",
  },
  {
    date: "2021-06-07",
    name: "Frilan",
    location: "london",
    month: "june",
  },
  {
    date: "2021-12-12",
    name: "Berners Tavern",
    location: "coventry",
    month: "december",
  },
  {
    date: "2021-12-25",
    name: "Cactus",
    location: "london",
    month: "december",
  },
];
("CREATE TABLE IF NOT EXISTS restaurants_details (id SERIAL PRIMARY KEY, date DATE, restaurant_name TEXT, location TEXT, year INT, month TEXT)");

("CREATE TABLE IF NOT EXISTS restaurants_ratings (id_ratings SERIAL PRIMARY KEY, menu TEXT, amount_spent INT, restaurant_rating INT) ");
export const restaurantRating = [
  { menu: "Pasta", amount_spent: 80, restaurant_rating: 5 },
  { menu: "steak", amount_spent: 70, restaurant_rating: 4 },
  { menu: "Chicken and Chips", amount_spent: 80, restaurant_rating: 3 },
  { menu: "Bread and Egg", amount_spent: 90, restaurant_rating: 2 },
  { menu: "Pasta", amount_spent: 100, restaurant_rating: 1 },
  { menu: "Rice and Chicken", amount_spent: 120, restaurant_rating: 4 },
  { menu: "Garlic bread and Chicken", amount_spent: 40, restaurant_rating: 4 },
  { menu: "Pasta", amount_spent: 50, restaurant_rating: 3 },
  { menu: "Pork Ribs and Chips", amount_spent: 60, restaurant_rating: 3 },
  { menu: "Chicken and Chips", amount_spent: 70, restaurant_rating: 4 },
  { menu: "Potato", amount_spent: 30, restaurant_rating: 5 },
  { menu: "Lasagna", amount_spent: 50, restaurant_rating: 4 },
  { menu: "Pizza", amount_spent: 40, restaurant_rating: 3 },
  { menu: "Boritos", amount_spent: 25, restaurant_rating: 3 },
  { menu: "Sea-food Pasta", amount_spent: 87, restaurant_rating: 3 },
  { menu: "Lamb Chops", amount_spent: 93, restaurant_rating: 4 },
];
