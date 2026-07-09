function buyNow(productName) {
    let phone = "9142956411";
    let message = "Hello AMJAD DIGITAL STORE,%0A%0AI want to buy: " + productName;
    window.open("https://wa.me/91" + phone + "?text=" + message, "_blank");
}

function searchProducts() {
    let input = document.getElementById("search").value.toLowerCase();
    let products = document.querySelectorAll(".product");

    products.forEach(function(product) {
        let name = product.querySelector("h3").innerText.toLowerCase();

        if (name.includes(input)) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
}
