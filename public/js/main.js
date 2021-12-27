async function getter() {
  const response = await fetch("http://localhost:3000/restaurants");
  const data = await response.json();
  console.log(data.payload[1]);
}

getter();
