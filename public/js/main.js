const recentRestaurants = document.querySelector(".recentrestaurant-list");
const topRestaurants = document.querySelector(".topratedrestaurant-list");
const submitbutton = document.querySelector(".submit-button");
const dateRest = document.querySelector("#inputdate");
const nameRest = document.querySelector("#inputname");
const locationRest = document.querySelector("#inputlocation");
const menuRest = document.querySelector("#inputmenu");
const amountspentRest = document.querySelector("#inputspent");
const ratingRest = document.querySelector("#inputrating");

let data;
// // fetches all the restaurant data from the API
async function getter() {
  const response = await fetch("http://localhost:3000/restaurants");
  data = await response.json();
  console.log(data);
  sortByRatings(data);
  sortBydate(data);
}

// This funtion sorts the restaurants fetched based on restaurant_ratings
function sortByRatings(data) {
  const arrayResponse = data.payload;
  arrayResponse.sort((a, b) => {
    return b.restaurant_rating - a.restaurant_rating;
  });
  getTopRatedRestaurants(arrayResponse);
}

// This function selects the top 5 restaurants with the highest restaurant ratings and displays them.
function getTopRatedRestaurants(sortedArray) {
  const topRatedRestaurants = sortedArray.filter((item) => {
    return item.restaurant_rating >= 3;
  });

  topRatedRestaurants.slice(0, 5).forEach((item) => {
    const li1 = document.createElement("li");
    li1.classList.add("restaurantName");
    li1.innerText = item.restaurant_name;
    const li2 = document.createElement("li");
    li2.innerText = `location: ${item.location}`;
    const li3 = document.createElement("li");
    li3.innerText = `Rating: ${item.restaurant_rating}`;
    topRestaurants.appendChild(li1);
    topRestaurants.appendChild(li2);
    topRestaurants.appendChild(li3);
  });
}

// This function sorts the arrays by date.
function sortBydate(data) {
  const fetchedArray = data.payload;

  fetchedArray.forEach((item) => {
    return (item.date = new Date(item.date));
  });
  fetchedArray.sort((a, b) => {
    return b.date - a.date;
  });
  createRecentList(fetchedArray);
}

// This function creates a new list of recently visited restaurants.
function createRecentList(fetchedArray) {
  fetchedArray.slice(0, 5).forEach((item) => {
    // const div = document.createElement("div");
    const li1 = document.createElement("li");
    li1.innerText = `Restaurant: ${item.restaurant_name}`;
    const li2 = document.createElement("li");
    li2.innerText = `Date: ${item.date}`;
    const li3 = document.createElement("li");
    li3.innerText = `menu: item.menu`;
    recentRestaurants.appendChild(li1);
    recentRestaurants.appendChild(li2);
    recentRestaurants.appendChild(li3);
  });
}
getter();

// This function gathers restaurants inputed to be sent into the database.
async function addRestaurantDetails() {
  const response = await fetch("http://localhost:3000/restaurants", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(gatherFormData()),
  });
  const data = await response.json();
}

async function addRestaurantRatings() {
  const response = await fetch("http://localhost:3000/restaurants", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(gatherFormRatings()),
  });
  const data = await response.json();
}

// function gather form data.
function gatherFormData() {
  const date = dateRest.value;
  const nameV = nameRest.value;
  const location = locationRest.value;
  return {
    date,
    nameV,
    location,
  };
}

function gatherFormRatings() {
  const menu = menuRest.value;
  const amountSpent = amountspentRest.value;
  const restaurantRating = ratingRest.value;
  return { menu, amountSpent, restaurantRating };
}

submitbutton.addEventListener("click", addRestaurantDetails);
submitbutton.addEventListener("click", addRestaurantRatings);
