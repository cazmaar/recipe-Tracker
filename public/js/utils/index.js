


export function sortByRatings(data) {
  const clonedData = [...data];

  clonedData.sort((a, b) => {
    return b.restaurant_rating - a.restaurant_rating;
  });

  return clonedData;
}

