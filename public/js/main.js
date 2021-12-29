const recentRestaurants = document.querySelector(".recentrestaurant-list");
const topRatedRestaurants = document.querySelector(".topratedrestaurant-list");

// fetches all the restaurant data from the API
async function getter() {
  const response = await fetch("http://localhost:3000/restaurants ");
  const data = await response.json();
  const actualResponse = data.payload;
  sortByRatings(actualResponse);
}

// This funtion sorts the restaurants fetched based on restaurant_ratings
function sortByRatings(arrayResponse) {
  arrayResponse.sort((a, b) => {
    return b.restaurant_rating - a.restaurant_rating;
  });
  getTopRatedRestaurants(arrayResponse);
  return arrayResponse;
}

// This function selects the top 5 restaurants with the highest restaurant ratings.
function getTopRatedRestaurants(sortedArray) {
  const topRatedRestaurants = sortedArray.filter((item) => {
    return item.restaurant_rating >= 3;
  });
  const topRated5Restaurants = [
    topRatedRestaurants[0],
    topRatedRestaurants[1],
    topRatedRestaurants[2],
    topRatedRestaurants[3],
    topRatedRestaurants[4],
  ];
  console.log(topRated5Restaurants);
  createTopRatedList(topRated5Restaurants);
}

// This function creates a list for the top rated elements and appends it to the Ul node
function createTopRatedList(ratedlist) {
  ratedlist.forEach((item) => {
    const li1 = document.createElement("li");
    li1.classList.add("restaurantName")
    li1.innerText = item.restaurant_name;
    const li2 = document.createElement("li");
    li2.innerText = `location: ${item.location}`;
    const li3 = document.createElement("li");
    li3.innerText = `Rating: ${item.restaurant_rating}`;
    topRatedRestaurants.appendChild(li1);
    topRatedRestaurants.appendChild(li2);
    topRatedRestaurants.appendChild(li3);
  });
}



getter();
