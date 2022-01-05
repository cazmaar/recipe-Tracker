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
const image1 = document.querySelector(".restaurant-image1");
const visitedRest = document.querySelector(".visited-months");

// this function changes the food image after a set time interval
let image_tracker = "salmon";
function change() {
  if (image_tracker === "salmon") {
    image1.src = "./images/jay-wennington-N_Y88TWmGwA-unsplash.jpg";
    image_tracker = "healthy";
  } else if (image_tracker === "healthy") {
    image1.src = "./images/caroline-attwood-bpPTlXWTOvg-unsplash.jpg";
    image_tracker = "salmon";
  }
}
setInterval(change, 4000);

// an array of all the months in a year
const yearArr = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// gets all the restaurant data from the API
async function getter() {
  const response = await fetch("http://localhost:3000/restaurants");
  const data = await response.json();
  // This function sorts the restaurant data by ratings
  sortByRatings(data);
  // This function sorts the restaurant data by date
  sortBydate(data);
}

// This funtion sorts the restaurants fetched based on restaurant_ratings
function sortByRatings(data) {
  const arrayResponse = data.payload;
  arrayResponse.sort((a, b) => {
    return b.restaurant_rating - a.restaurant_rating;
  });
  // This function gets the top5 restaurants from the sorted array.
  getTopRatedRestaurants(arrayResponse);
}

// This function selects the top 5 restaurants with the highest restaurant ratings and displays them.
function getTopRatedRestaurants(sortedArray) {
  // This filters out restaurants with a rating of 3 and above.
  const topRatedRestaurants = sortedArray.filter((item) => {
    return item.restaurant_rating >= 3;
  });
  // this selects the top5 restaurants and displays it.
  topRatedRestaurants.slice(0, 5).forEach((item) => {
    const eachTopRestaurant = document.createElement("div");
    eachTopRestaurant.classList.add("eachList");
    const li1 = document.createElement("li");
    li1.classList.add("restaurantName");
    li1.innerText = `${item.restaurant_name}`;
    const li2 = document.createElement("p");
    li2.innerText = `Rating: ${item.restaurant_rating}`;
    eachTopRestaurant.appendChild(li1);
    eachTopRestaurant.appendChild(li2);
    topRestaurants.appendChild(eachTopRestaurant);
    topRestaurants.appendChild(eachTopRestaurant);
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
    const newDate = item.date;
    const day = newDate.getUTCDate();
    const month = newDate.getUTCMonth() + 1;
    const year = newDate.getUTCFullYear();
    item.date = `${day}/${month}/${year}`;
    const div = document.createElement("div");
    div.classList.add("eachList");
    const li1 = document.createElement("li");
    li1.innerText = ` ${item.restaurant_name}`;
    div.appendChild(li1);
    const li2 = document.createElement("p");
    li2.innerText = `Date Visited: ${item.date}`;
    div.appendChild(li2);
    const li3 = document.createElement("p");
    li3.innerText = `menu: ${item.menu}`;
    div.appendChild(li3);
    recentRestaurants.appendChild(div);
  });
}

// This function gathers restaurants data inputed inputed to be sent into the database.
async function addRestaurantDetails() {
  const response = await fetch("http://localhost:3000/restaurants", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(gatherFormData()),
  });
  const data = await response.json();
}

// This function gathers restaurants data inputed inputed to be sent into the database.
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
  const newDate = new Date(date);
  const monthEntered = newDate.getUTCMonth();
  const month = yearArr[monthEntered];
  console.log(monthEntered);
  const nameV = nameRest.value;
  const location = locationRest.value;
  return {
    date,
    nameV,
    location,
    month,
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
  const responseQuery = await fetch(
    `http://localhost:3000/restaurants?month=${monthValue}`
  );
  dataQuery = await responseQuery.json();
  createRestMonthList(dataQuery);
}

// This function calcualtes how much you spent in a month.
function createRestMonthList(dataQuery) {
  const amountSpentArray = [];
  const data = dataQuery.payload;
  console.log(data);
  const body = document.body;
  // new elements are created to display the fetched restaurant.
  const calcBackground = document.createElement("div");
  const miniBackground = document.createElement("div");
  miniBackground.classList.add("minibg");
  calcBackground.classList.add("calcbackground");
  const ul = document.createElement("ul");
  ul.classList.add("ul-spent");
  miniBackground.appendChild(ul);
  console.log(data);
  data.forEach((item) => {
    amountSpentArray.push(item.amount_spent);
  });
  const totalSpent = amountSpentArray.reduce((a, b) => a + b);
  const spentMonthHeading = document.createElement("h1");
  spentMonthHeading.classList.add("spentMonthHeading");
  spentMonthHeading.innerText = `Total amount spent in ${months.value}`;
  const li1 = document.createElement("li");
  li1.classList.add("amountspent");
  li1.innerText = `You spent ${totalSpent}£ in ${months.value}`;
  ul.appendChild(spentMonthHeading);
  ul.appendChild(li1);

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
  const responseQuery = await fetch(
    `http://localhost:3000/restaurants?location=${getListByLocationValue}`
  );
  dataQuery = await responseQuery.json();
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
  const locationheading = document.createElement("h2");
  locationheading.innerText = `Restaurants in ${getListByLocation.value} `;
  const ul = document.createElement("ul");
  ul.appendChild(locationheading);
  ul.classList.add("ul-location");
  miniBackground.appendChild(ul);
  data.forEach((item) => {
    const newDate = new Date(item.date);
    const day = newDate.getUTCDate();
    const month = newDate.getUTCMonth() + 1;
    const year = newDate.getUTCFullYear();
    item.date = `${day}/${month}/${year}`;
    console.log("date", newDate);
    console.log("hh", day);
    const div = document.createElement("div");
    div.classList.add("location-div");
    const li1 = document.createElement("li");
    li1.innerText = `${item.restaurant_name}`;
    div.appendChild(li1);
    const li2 = document.createElement("li");
    li2.innerText = `Date Visited: ${item.date}`;
    div.appendChild(li2);
    const li3 = document.createElement("li");
    li3.innerText = `Menu: ${item.menu}`;
    div.appendChild(li3);
    const li4 = document.createElement("li");
    li4.innerText = `Rating: ${item.restaurant_rating}`;
    div.appendChild(li4);
    ul.appendChild(div);
  });
  const docHeight = document.body.clientHeight;
  calcBackground.style.height = `${docHeight}px`;
  calcBackground.appendChild(miniBackground);
  body.appendChild(calcBackground);
  miniBackground.addEventListener("click", noremove);
}

getListByLocation.addEventListener("change", getDataFromAPIByLocation);
console.log(getListByLocation.value);

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
  ul.classList.add("ul-location");
  miniBackground.appendChild(ul);
  const ratingheading = document.createElement("h2");
  ratingheading.innerText = `Your Visited Restaurants with a rating of ${restaurantRating.value} `;
  ul.appendChild(ratingheading);
  data.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("location-div");
    const li1 = document.createElement("li");
    li1.innerText = `${item.restaurant_name}`;
    div.appendChild(li1);
    const li2 = document.createElement("li");
    li2.innerText = `Menu: ${item.menu}`;
    div.appendChild(li2);
    const li3 = document.createElement("li");
    li3.innerText = `Location: ${item.location}`;
    div.appendChild(li3);
    ul.appendChild(div);
  });
  const docHeight = document.body.clientHeight;
  calcBackground.style.height = `${docHeight}px`;
  calcBackground.appendChild(miniBackground);
  body.appendChild(calcBackground);
  miniBackground.addEventListener("click", noremove);
}

restaurantRating.addEventListener("change", getDataFromAPIByRating);

// // This function calculates the percentage increase of your expenses for the current month.
async function percentageIncrease() {
  const date = new Date();
  let monthNum = date.getUTCMonth();
  const month = yearArr[monthNum];
  if (monthNum === 0) {
    const spentArr = [];
    const responseQuery = await fetch(
      `http://localhost:3000/restaurants?month=${month}`
    );
    dataQuery = await responseQuery.json();

    spentArr.push(dataQuery);
    for (let i = 11; i >= 8; i--) {
      const newMonth = yearArr[monthNum + i];
      const responseQuery = await fetch(
        `http://localhost:3000/restaurants?month=${newMonth}`
      );
      dataQuery = await responseQuery.json();
      spentArr.push(dataQuery);
    }
    const month1 = spentArr[0].payload;
    const may = spentArr[1].payload;
    const april = spentArr[2].payload;
    const march = spentArr[3].payload;
    const february = spentArr[4].payload;
    const sumMonth1 = [];
    month1.forEach((item) => sumMonth1.push(item.amount_spent));
    const summa = sumMonth1.reduce((a, b) => a + b);
    const sumMonth2 = [];
    may.forEach((item) => sumMonth2.push(item.amount_spent));
    const summa1 = sumMonth2.reduce((a, b) => a + b);
    sumMonth3 = [];
    april.forEach((item) => sumMonth3.push(item.amount_spent));
    const summa2 = sumMonth3.reduce((a, b) => a + b);
    sumMonth4 = [];
    march.forEach((item) => sumMonth4.push(item.amount_spent));
    const summa3 = sumMonth4.reduce((a, b) => a + b);
    sumMonth5 = [];
    february.forEach((item) => sumMonth5.push(item.amount_spent));
    const summa4 = sumMonth5.reduce((a, b) => a + b);
    const difference = summa - summa1;
    if (difference < 0) {
      const percentageIncrease = ((difference * -1) / summa1) * 100;
      const percentageText = document.querySelector(".percentage-text");
      const rounded = Math.round(percentageIncrease);
      percentageText.innerText = `Your spending went down by ${rounded}% this month`;
    } else {
      const percentageIncrease = (difference / summa1) * 100;
      const rounded = Math.round(percentageIncrease);
      const percentageText = document.querySelector(".percentage-text");
      percentageText.innerText = `Your spending went up by ${rounded}% this month`;
    }
    const p1 = document.querySelector(".month1");
    p1.innerHTML = `<div class="display-moneysection">
    <div class="display-eachmonth">
    <p>${yearArr[0]}</p>
    <div class="one"><p class="money">£${summa}</p><i class="fas fa-wallet"></i></div>
    </div>
    <div class="display-eachmonth">
    <p>${yearArr[11]}</p>
    <div class="one"><p class="money">£${summa1}</p><i class="fas fa-wallet"></i></div>
    </div>
    <div class="display-eachmonth">
    <p>${yearArr[10]}</p>
    <div class="one"><p class="money">£${summa2}</p><i class="fas fa-wallet"></i></div>
    </div>
    <div class="display-eachmonth">
    <p>${yearArr[9]}</p>
    <div class="one"><p class="money">£${summa3}</p><i class="fas fa-wallet"></i></div>
    </div>
    <div class="display-eachmonth">
    <p>${yearArr[8]}</p>
    <div class="one"><p class="money">£${summa4}</p><i class="fas fa-wallet"></i></div>
    </div>
    </div>`;
  } else if (monthNum === 1) {
    const spentArr = [];
    const responseQuery = await fetch(
      `http://localhost:3000/restaurants?month=${month}`
    );
    const dataQuery = await responseQuery.json();
    spentArr.push(dataQuery);

    const newMonth = yearArr[monthNum - 1];
    console.log(newMonth);
    const responseQuery1 = await fetch(
      `http://localhost:3000/restaurants?month=${newMonth}`
    );
    const dataQuery1 = await responseQuery1.json();
    spentArr.push(dataQuery1);

    for (let i = 11; i >= 9; i--) {
      const newMonth1 = yearArr[i];
      const responseQuery = await fetch(
        `http://localhost:3000/restaurants?month=${newMonth1}`
      );
      const dataQuery = await responseQuery.json();

      spentArr.push(dataQuery);
    }
    const month1 = spentArr[0].payload;
    const may = spentArr[1].payload;
    const april = spentArr[2].payload;
    const march = spentArr[3].payload;
    const february = spentArr[4].payload;
    const sumMonth1 = [];
    month1.forEach((item) => sumMonth1.push(item.amount_spent));
    const summa = sumMonth1.reduce((a, b) => a + b);
    const sumMonth2 = [];
    may.forEach((item) => sumMonth2.push(item.amount_spent));
    const summa1 = sumMonth2.reduce((a, b) => a + b);
    console.log("this is me", summa, summa1);
    sumMonth3 = [];
    april.forEach((item) => sumMonth3.push(item.amount_spent));
    const summa2 = sumMonth3.reduce((a, b) => a + b);
    sumMonth4 = [];
    march.forEach((item) => sumMonth4.push(item.amount_spent));
    const summa3 = sumMonth4.reduce((a, b) => a + b);
    sumMonth5 = [];
    february.forEach((item) => sumMonth5.push(item.amount_spent));
    const summa4 = sumMonth5.reduce((a, b) => a + b);
    const difference = summa - summa1;
    console.log(difference);
    if (difference < 0) {
      const percentageIncrease = ((difference * -1) / summa1) * 100;
      console.log(percentageIncrease);
      const percentageText = document.querySelector(".percentage-text");
      const rounded = Math.round(percentageIncrease);
      percentageText.innerText = `Your spending went down by ${rounded}% this month`;
    } else {
      const percentageIncrease = (difference / summa1) * 100;
      const rounded = Math.round(percentageIncrease);
      const percentageText = document.querySelector(".percentage-text");
      percentageText.innerText = `Your spending went up by ${rounded}% this month`;
    }
    const p1 = document.querySelector(".month1");
    p1.innerHTML = `<div class="display-moneysection">
    <div class="display-eachmonth">
    <p>${yearArr[1]}</p>
    <div class="one"><p class="money">${summa}£</p><i class="fas fa-wallet"></i></div>
    </div>
    <div class="display-eachmonth">
    <p>${yearArr[0]}</p>
    <div class="one"><p class="money">${summa1}£</p><i class="fas fa-wallet"></i></div>
    </div>
    <div class="display-eachmonth">
    <p>${yearArr[11]}</p>
    <div class="one"><p class="money">${summa2}£</p><i class="fas fa-wallet"></i></div>
    </div>
    <div class="display-eachmonth">
    <p>${yearArr[10]}</p>
    <div class="one"><p class="money">${summa3}£</p><i class="fas fa-wallet"></i></div>
    </div>
    <div class="display-eachmonth">
    <p>${yearArr[9]}</p>
    <div class="one"><p class="money">${summa4}£</p><i class="fas fa-wallet"></i></div>
    </div>
    </div>`;
  } else if (monthNum === 2) {
    const spentArr = [];
    for (let i = monthNum; i >= monthNum - 2; i--) {
      const newMonth = yearArr[i];
      const responseQuery = await fetch(
        `http://localhost:3000/restaurants?month=${newMonth}`
      );
      const dataQuery = await responseQuery.json();

      spentArr.push(dataQuery);
    }
    for (let i = 11; i >= 10; i--) {
      const newMonth = yearArr[i];
      const responseQuery = await fetch(
        `http://localhost:3000/restaurants?month=${newMonth}`
      );
      const dataQuery = await responseQuery.json();
      spentArr.push(dataQuery);
    }
    const month1 = spentArr[0].payload;
    const may = spentArr[1].payload;
    const april = spentArr[2].payload;
    const march = spentArr[3].payload;
    const february = spentArr[4].payload;
    const sumMonth1 = [];
    month1.forEach((item) => sumMonth1.push(item.amount_spent));
    const summa = sumMonth1.reduce((a, b) => a + b);
    const sumMonth2 = [];
    may.forEach((item) => sumMonth2.push(item.amount_spent));
    const summa1 = sumMonth2.reduce((a, b) => a + b);
    sumMonth3 = [];
    april.forEach((item) => sumMonth3.push(item.amount_spent));
    const summa2 = sumMonth3.reduce((a, b) => a + b);
    sumMonth4 = [];
    march.forEach((item) => sumMonth4.push(item.amount_spent));
    const summa3 = sumMonth4.reduce((a, b) => a + b);
    sumMonth5 = [];
    february.forEach((item) => sumMonth5.push(item.amount_spent));
    const summa4 = sumMonth5.reduce((a, b) => a + b);
    const difference = summa - summa1;
    if (difference < 0) {
      const percentageIncrease = ((difference * -1) / summa1) * 100;
      const percentageText = document.querySelector(".percentage-text");
      const rounded = Math.round(percentageIncrease);
      percentageText.innerText = `Your spending went down by ${rounded}% this month`;
    } else {
      const percentageIncrease = (difference / summa1) * 100;
      const rounded = Math.round(percentageIncrease);
      const percentageText = document.querySelector(".percentage-text");
      percentageText.innerText = `Your spending went up by ${rounded}% this month`;
    }
    const p1 = document.querySelector(".month1");
    p1.innerHTML = `<div class="display-moneysection">
    <div class="display-eachmonth">
    <p>${yearArr[2]}</p>
    <div class="one"><p class="money">${summa}£</p><i class="fas fa-wallet"></i></div>
    </div>
    <div class="display-eachmonth">
    <p>${yearArr[1]}</p>
    <div class="one"><p class="money">${summa1}£</p><i class="fas fa-wallet"></i></div>
    </div>
    <div class="display-eachmonth">
    <p>${yearArr[0]}</p>
    <div class="one"><p class="money">${summa2}£</p><i class="fas fa-wallet"></i></div>
    </div>
    <div class="display-eachmonth">
    <p>${yearArr[11]}</p>
    <div class="one"><p class="money">${summa3}£</p><i class="fas fa-wallet"></i></div>
    </div>
    <div class="display-eachmonth">
    <p>${yearArr[10]}</p>
    <div class="one"><p class="money">${summa4}£</p><i class="fas fa-wallet"></i></div>
    </div>
    </div>`;
  } else if (monthNum === 3) {
    const spentArr = [];
    for (let i = monthNum; i >= monthNum - 3; i--) {
      const newMonth = yearArr[i];
      const responseQuery = await fetch(
        `http://localhost:3000/restaurants?month=${newMonth}`
      );
      const dataQuery = await responseQuery.json();
      spentArr.push(dataQuery);
    }
    for (let i = 11; i >= 11; i--) {
      const newMonth = yearArr[i];
      const responseQuery = await fetch(
        `http://localhost:3000/restaurants?month=${newMonth}`
      );
      const dataQuery = await responseQuery.json();
      spentArr.push(dataQuery);
    }
    console.log("dd", spentArr);
    const month1 = spentArr[0].payload;
    const may = spentArr[1].payload;
    const april = spentArr[2].payload;
    const march = spentArr[3].payload;
    const february = spentArr[4].payload;
    const sumMonth1 = [];
    month1.forEach((item) => sumMonth1.push(item.amount_spent));
    const summa = sumMonth1.reduce((a, b) => a + b);
    console.log(summa);
    const sumMonth2 = [];
    may.forEach((item) => sumMonth2.push(item.amount_spent));
    const summa1 = sumMonth2.reduce((a, b) => a + b);
    sumMonth3 = [];
    april.forEach((item) => sumMonth3.push(item.amount_spent));
    const summa2 = sumMonth3.reduce((a, b) => a + b);
    sumMonth4 = [];
    march.forEach((item) => sumMonth4.push(item.amount_spent));
    const summa3 = sumMonth4.reduce((a, b) => a + b);
    sumMonth5 = [];
    february.forEach((item) => sumMonth5.push(item.amount_spent));
    const summa4 = sumMonth5.reduce((a, b) => a + b);
    const difference = summa - summa1;
    if (difference < 0) {
      const percentageIncrease = ((difference * -1) / summa1) * 100;
      const percentageText = document.querySelector(".percentage-text");
      const rounded = Math.round(percentageIncrease);
      percentageText.innerText = `Your spending went down by ${rounded}% this month`;
    } else {
      const percentageIncrease = (difference / summa1) * 100;
      const rounded = Math.round(percentageIncrease);
      const percentageText = document.querySelector(".percentage-text");
      percentageText.innerText = `Your spending went up by ${rounded}% this month`;
    }
    const p1 = document.querySelector(".month1");
    p1.innerHTML = `<div class="display-moneysection">
    <div class="display-eachmonth">
    <p>${yearArr[3]}</p>
    <div class="one"><p class="money">${summa}£</p><i class="fas fa-wallet"></i></div>
    </div>
    <div class="display-eachmonth">
    <p>${yearArr[2]}</p>
    <div class="one"><p class="money">${summa1}£</p><i class="fas fa-wallet"></i></div>
    </div>
    <div class="display-eachmonth">
    <p>${yearArr[1]}</p>
    <div class="one"><p class="money">${summa2}£</p><i class="fas fa-wallet"></i></div>
    </div>
    <div class="display-eachmonth">
    <p>${yearArr[0]}</p>
    <div class="one"><p class="money">${summa3}£</p><i class="fas fa-wallet"></i></div>
    </div>
    <div class="display-eachmonth">
    <p>${yearArr[11]}</p>
    <div class="one"><p class="money">${summa4}£</p><i class="fas fa-wallet"></i></div>
    </div>
    </div>`;
  } else {
    const spentArr = [];
    for (let i = monthNum; i >= monthNum - 4; i--) {
      const newMonth = yearArr[i];
      const responseQuery = await fetch(
        `http://localhost:3000/restaurants?month=${newMonth}`
      );
      const dataQuery = await responseQuery.json();
      // console.log(dataQuery);
      spentArr.push(dataQuery);
    }

    const month1 = spentArr[0].payload;
    const may = spentArr[1].payload;
    const april = spentArr[2].payload;
    const march = spentArr[3].payload;
    const february = spentArr[4].payload;
    const sumMonth1 = [];
    month1.forEach((item) => sumMonth1.push(item.amount_spent));
    const summa = sumMonth1.reduce((a, b) => a + b);
    console.log(summa);
    const sumMonth2 = [];
    may.forEach((item) => sumMonth2.push(item.amount_spent));
    const summa1 = sumMonth2.reduce((a, b) => a + b);
    sumMonth3 = [];
    april.forEach((item) => sumMonth3.push(item.amount_spent));
    const summa2 = sumMonth3.reduce((a, b) => a + b);
    sumMonth4 = [];
    march.forEach((item) => sumMonth4.push(item.amount_spent));
    const summa3 = sumMonth4.reduce((a, b) => a + b);
    sumMonth5 = [];
    february.forEach((item) => sumMonth5.push(item.amount_spent));
    const difference = summa - summa1;
    if (difference < 0) {
      const percentageIncrease = ((difference * -1) / summa1) * 100;
      const percentageText = document.querySelector(".percentage-text");
      const rounded = Math.round(percentageIncrease);
      percentageText.innerText = `Your spending went down by ${rounded}% this month`;
    } else {
      const percentageIncrease = (difference / summa1) * 100;
      const rounded = Math.round(percentageIncrease);
      const percentageText = document.querySelector(".percentage-text");
      percentageText.innerText = `Your spending went up by ${rounded}% this month`;
    }
    const summa4 = sumMonth5.reduce((a, b) => a + b);
    const p1 = document.querySelector(".month1");
    p1.innerHTML = `<div class="display-moneysection">
    <div class="display-eachmonth">
    <p>${yearArr[0]}</p>
    <div class="one"><p class="money">${summa}£</p><i class="fas fa-wallet"></i></div>
    </div>
    <div class="display-eachmonth">
    <p>${yearArr[11]}</p>
    <div class="one"><p class="money">${summa1}£</p><i class="fas fa-wallet"></i></div>
    </div>
    <div class="display-eachmonth">
    <p>${yearArr[10]}</p>
    <div class="one"><p class="money">${summa2}£</p><i class="fas fa-wallet"></i></div>
    </div>
    <div class="display-eachmonth">
    <p>${yearArr[9]}</p>
    <div class="one"><p class="money">${summa3}£</p><i class="fas fa-wallet"></i></div>
    </div>
    <div class="display-eachmonth">
    <p>${yearArr[8]}</p>
    <div class="one"><p class="money">${summa4}£</p><i class="fas fa-wallet"></i></div>
    </div>
    </div>`;
  }
}

percentageIncrease();

// This function fetches restaurant visited by month
async function getDataFromAPIByMonth(event) {
  const monthRestValue = event.target.value;
  const responseQuery = await fetch(
    `http://localhost:3000/restaurants?month=${monthRestValue}`
  );
  dataQuery = await responseQuery.json();
  createVisitedMonthList(dataQuery);
}

// This displays the visited restaurants in a particular month
function createVisitedMonthList(dataQuery) {
  const data = dataQuery.payload;
  console.log(data)
  const body = document.body;
  // new elements are created to display the fetched restaurant.
  const calcBackground = document.createElement("div");
  const miniBackground = document.createElement("div");
  miniBackground.classList.add("minibg");
  calcBackground.classList.add("calcbackground");
  const monthHeading = document.createElement("h2");
  monthHeading.innerText = `Restaurants  Visited in ${visitedRest.value} `;
  const ul = document.createElement("ul");
  ul.appendChild(monthHeading);
  miniBackground.appendChild(ul);
  ul.classList.add("ul-location");
  data.forEach((item) => {
    const newDate = new Date(item.date);
    const day = newDate.getUTCDate();
    const month = newDate.getUTCMonth() + 1;
    const year = newDate.getUTCFullYear();
    item.date = `${day}/${month}/${year}`;
    console.log("date", newDate);
    console.log("hh", day);
    const div = document.createElement("div");
    div.classList.add("location-div");
    const li1 = document.createElement("li");
    li1.innerText = `${item.restaurant_name}`;
    div.appendChild(li1);
    const li2 = document.createElement("li");
    li2.innerText = `Date Visited: ${item.date}`;
    div.appendChild(li2);
    const li3 = document.createElement("li");
    li3.innerText = `Menu: ${item.menu}`;
    div.appendChild(li3);
    const li4 = document.createElement("li");
    li4.innerText = `Rating: ${item.restaurant_rating}`;
    div.appendChild(li4);
    ul.appendChild(div);
  });
  const docHeight = document.body.clientHeight;
  calcBackground.style.height = `${docHeight}px`;
  calcBackground.appendChild(miniBackground);
  body.appendChild(calcBackground);
  miniBackground.addEventListener("click", noremove);
}

visitedRest.addEventListener("change", getDataFromAPIByMonth);
