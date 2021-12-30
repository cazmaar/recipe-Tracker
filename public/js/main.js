const recentRestaurants = document.querySelector(".recentrestaurant-list");
const topRestaurants = document.querySelector(".topratedrestaurant-list");
const submitbutton = document.querySelector(".submit-button");
const dateRest = document.querySelector("#inputdate");
const nameRest = document.querySelector("#inputname");
const locationRest = document.querySelector("#inputlocation");
const menuRest = document.querySelector("#inputmenu");
const amountspentRest = document.querySelector("#inputspent");
const ratingRest = document.querySelector("#inputrating");
const months = document.querySelector("#months");
const getListByLocation = document.querySelector("#restaurantlocation");
const restaurantRating = document.querySelector("#restaurant-rating");

let data;
// // fetches all the restaurant data from the API
async function getter() {
  const response = await fetch("http://localhost:3000/restaurants");
  data = await response.json();
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
    li3.innerText = `menu: ${item.menu}`;
    recentRestaurants.appendChild(li1);
    recentRestaurants.appendChild(li2);
    recentRestaurants.appendChild(li3);
  });
}

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

// This function gather form data to post to the details table.
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

// This function gather form data to post to the ratings table.
function gatherFormRatings() {
  const menu = menuRest.value;
  const amountSpent = amountspentRest.value;
  const restaurantRating = ratingRest.value;
  return { menu, amountSpent, restaurantRating };
}

// This function gets restaurants based on a particular month by query
async function getDataFromAPIByQuery(event) {
  const monthValue = event.target.value;
  console.log(monthValue);
  const responseQuery = await fetch(
    `http://localhost:3000/restaurants?month=${monthValue}`
  );
  dataQuery = await responseQuery.json();
  createRestMonthList(dataQuery);
}

// This function creates a list of restaurants visited by month.
function createRestMonthList(dataQuery) {
  const data = dataQuery.payload;
  const body = document.body;
  // new elements are created to display the fetched restaurant.
  const calcBackground = document.createElement("div");
  const miniBackground = document.createElement("div");
  miniBackground.classList.add("minibg");
  calcBackground.classList.add("calcbackground");
  const ul = document.createElement("ul");
  ul.classList.add("ul");
  miniBackground.appendChild(ul);
  console.log(data);
  data.forEach((item) => {
    const li1 = document.createElement("li");
    li1.innerText = `${item.restaurant_name}`;
    ul.appendChild(li1);
    const li2 = document.createElement("li");
    li2.innerText = `${item.location}`;
    ul.appendChild(li2);
    const li3 = document.createElement("li");
    li3.innerText = `${item.menu}`;
    ul.appendChild(li3);
    const li4 = document.createElement("li");
    li4.innerText = `${item.amount_spent}£`;
    ul.appendChild(li4);
  });
  const docHeight = document.body.clientHeight;
  calcBackground.style.height = `${docHeight}px`;
  calcBackground.appendChild(miniBackground);
  body.appendChild(calcBackground);
  miniBackground.addEventListener("click", noremove);
}

months.addEventListener("change", getDataFromAPIByQuery);
submitbutton.addEventListener("click", addRestaurantDetails);
submitbutton.addEventListener("click", addRestaurantRatings);

// This function removes the created background
function removeCalcBackground() {
  const calcbackground = document.querySelector(".calcbackground");
  document.body.removeChild(calcbackground);
}
document.body.addEventListener("click", removeCalcBackground);

function noremove(event) {
  event.stopPropagation();
}
getter();

// This function gets you list of restaurant in a particulart location.
async function getDataFromAPIByLocation(event) {
  const getListByLocationValue = event.target.value;
  console.log(getListByLocationValue);
  const responseQuery = await fetch(
    `http://localhost:3000/restaurants?location=${getListByLocationValue}`
  );
  dataQuery = await responseQuery.json();
  console.log(dataQuery);
  createRestLocationList(dataQuery);
}

// This function creates a list of restaurants visited by location.
function createRestLocationList(dataQuery) {
  const data = dataQuery.payload;
  const body = document.body;
  // new elements are created to display the fetched restaurant.
  const calcBackground = document.createElement("div");
  const miniBackground = document.createElement("div");
  miniBackground.classList.add("minibg");
  calcBackground.classList.add("calcbackground");
  const ul = document.createElement("ul");
  ul.classList.add("ul");
  miniBackground.appendChild(ul);
  console.log(data);
  data.forEach((item) => {
    const li1 = document.createElement("li");
    li1.innerText = `${item.restaurant_name}`;
    ul.appendChild(li1);
    const li2 = document.createElement("li");
    li2.innerText = `${item.date}`;
    ul.appendChild(li2);
    const li3 = document.createElement("li");
    li3.innerText = `${item.menu}`;
    ul.appendChild(li3);
    const li4 = document.createElement("li");
    li4.innerText = `${item.restaurant_rating}`;
    ul.appendChild(li4);
  });
  const docHeight = document.body.clientHeight;
  calcBackground.style.height = `${docHeight}px`;
  calcBackground.appendChild(miniBackground);
  body.appendChild(calcBackground);
  miniBackground.addEventListener("click", noremove);
}

getListByLocation.addEventListener("change", getDataFromAPIByLocation);

// This function gets you list of restaurants with a particular rating.
async function getDataFromAPIByRating(event) {
  const restaurantRatingValue = event.target.value;
  console.log(restaurantRatingValue);
  const responseQuery = await fetch(
    `http://localhost:3000/restaurants?restaurant_rating=${restaurantRatingValue}`
  );
  dataQuery = await responseQuery.json();
  console.log(dataQuery);
  createRestRatingList(dataQuery);
}

// This function displays a list of restaurants found by rating
function createRestRatingList(dataQuery) {
  const data = dataQuery.payload;
  const body = document.body;
  // new elements are created to display the fetched restaurant.
  const calcBackground = document.createElement("div");
  const miniBackground = document.createElement("div");
  miniBackground.classList.add("minibg");
  calcBackground.classList.add("calcbackground");
  const ul = document.createElement("ul");
  ul.classList.add("ul");
  miniBackground.appendChild(ul);
  console.log(data);
  data.forEach((item) => {
    const li1 = document.createElement("li");
    li1.innerText = `${item.restaurant_name}`;
    ul.appendChild(li1);
    const li2 = document.createElement("li");
    li2.innerText = `${item.date}`;
    ul.appendChild(li2);
    const li3 = document.createElement("li");
    li3.innerText = `${item.menu}`;
    ul.appendChild(li3);
    const li4 = document.createElement("li");
    li4.innerText = `${item.location}`;
    ul.appendChild(li4);
  });
  const docHeight = document.body.clientHeight;
  calcBackground.style.height = `${docHeight}px`;
  calcBackground.appendChild(miniBackground);
  body.appendChild(calcBackground);
  miniBackground.addEventListener("click", noremove);
}

restaurantRating.addEventListener("change", getDataFromAPIByRating);
