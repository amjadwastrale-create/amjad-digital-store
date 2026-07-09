console.log("Amjad Digital Store Loaded");
alert("Welcome to Amjad Digital Store!");
let cart = [];

function addToCart(productName, price) {
  cart.push({
    name: productName,
    price: price
  });

  alert(productName + " Cart me add ho gaya!");

  console.log(cart);
}

