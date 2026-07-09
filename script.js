/* ===========================
   AMJAD DIGITAL STORE
   SCRIPT.JS - PART 1
=========================== */

let cart = [];
let wishlist = [];
let couponDiscount = 0;

/* Notification */

function showToast(message){

let toast = document.getElementById("toast");

if(!toast){

toast = document.createElement("div");

toast.id="toast";

toast.className="toast";

document.body.appendChild(toast);

}

toast.innerHTML = message;

toast.style.display="block";

setTimeout(function(){

toast.style.display="none";

},2500);

}

/* Save Cart */

function saveCart(){

localStorage.setItem("cart",JSON.stringify(cart));

}

/* Load Cart */

function loadCart(){

let data = localStorage.getItem("cart");

if(data){

cart = JSON.parse(data);

updateCart();

}

}

/* Save Wishlist */

function saveWishlist(){

localStorage.setItem("wishlist",JSON.stringify(wishlist));

}

/* Load Wishlist */

function loadWishlist(){

let data = localStorage.getItem("wishlist");

if(data){

wishlist = JSON.parse(data);

}

}

/* Currency */

function money(price){

return "₹"+price.toLocaleString("en-IN");

}

/* Startup */

window.onload=function(){

loadCart();

loadWishlist();

showToast("Welcome To AMJAD DIGITAL STORE ❤️");

};
/* ===========================
   ADD TO CART
=========================== */

function addToCart(name, price, image = "") {

    const item = cart.find(product => product.name === name);

    if (item) {
        item.qty++;
    } else {
        cart.push({
            name: name,
            price: price,
            image: image,
            qty: 1
        });
    }

    saveCart();
    updateCart();

    showToast(name + " added to cart 🛒");
}

/* ===========================
   REMOVE FROM CART
=========================== */

function removeFromCart(index) {

    cart.splice(index, 1);

    saveCart();

    updateCart();

    showToast("Item removed");

}

/* ===========================
   CART TOTAL
=========================== */

function getCartTotal() {

    let total = 0;

    cart.forEach(item => {

        total += item.price * item.qty;

    });

    return total;

}

/* ===========================
   CART COUNT
=========================== */

function getCartCount() {

    let count = 0;

    cart.forEach(item => {

        count += item.qty;

    });

    return count;

}/* ===========================
   UPDATE CART
=========================== */

function updateCart() {

    let cartItems = document.getElementById("cartItems");
    let cartTotal = document.getElementById("cartTotal");

    if (!cartItems || !cartTotal) return;

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
        cartTotal.innerHTML = "₹0";
        return;
    }

    cart.forEach(function(item, index) {

        cartItems.innerHTML += `
        <div class="cart-item">

            <div>

                <h4>${item.name}</h4>

                <p>${money(item.price)} × ${item.qty}</p>

            </div>

            <div>

                <button onclick="decreaseQty(${index})">-</button>

                <button onclick="increaseQty(${index})">+</button>

                <button onclick="removeFromCart(${index})">🗑️</button>

            </div>

        </div>
        `;

    });

    cartTotal.innerHTML = money(getCartTotal());

}

/* ===========================
   INCREASE QUANTITY
=========================== */

function increaseQty(index){

    cart[index].qty++;

    saveCart();

    updateCart();

}

/* ===========================
   DECREASE QUANTITY
=========================== */

function decreaseQty(index){

    if(cart[index].qty>1){

        cart[index].qty--;

    }else{

        cart.splice(index,1);

    }

    saveCart();

    updateCart();

}

/* ===========================
   EMPTY CART
=========================== */

function clearCart(){

    cart=[];

    saveCart();

    updateCart();

    showToast("Cart Cleared");

    }/* ===========================
   LIVE SEARCH
=========================== */

function searchProducts() {

    let input = document.getElementById("search");

    if (!input) return;

    let filter = input.value.toLowerCase();

    let products = document.querySelectorAll(".product-card");

    products.forEach(function(product) {

        let name = product.querySelector("h3").innerText.toLowerCase();

        if (name.indexOf(filter) > -1) {

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }

    });

}

/* ===========================
   CATEGORY FILTER
=========================== */

function filterCategory(category){

    let products=document.querySelectorAll(".product-card");

    products.forEach(function(product){

        let type=product.getAttribute("data-category");

        if(category=="all"){

            product.style.display="block";

        }else if(type==category){

            product.style.display="block";

        }else{

            product.style.display="none";

        }

    });

}

/* ===========================
   SORT PRICE
=========================== */

function sortProducts(){

    let grid=document.querySelector(".product-grid");

    if(!grid) return;

    let cards=Array.from(grid.children);

    cards.sort(function(a,b){

        let p1=parseInt(a.querySelector(".price").innerText.replace(/[^\d]/g,""));

        let p2=parseInt(b.querySelector(".price").innerText.replace(/[^\d]/g,""));

        return p1-p2;

    });

    cards.forEach(function(card){

        grid.appendChild(card);

    });

}

/* ===========================
   SCROLL TO PRODUCTS
=========================== */

function goProducts(){

    let section=document.getElementById("products");

    if(section){

        section.scrollIntoView({

            behavior:"smooth"

        });

    }

                     }/* ===========================
   WISHLIST
=========================== */

function addToWishlist(name, price, image = "") {

    const exist = wishlist.find(item => item.name === name);

    if (exist) {
        showToast("Already in Wishlist ❤️");
        return;
    }

    wishlist.push({
        name: name,
        price: price,
        image: image
    });

    saveWishlist();

    updateWishlist();

    showToast(name + " added to Wishlist ❤️");
}

/* ===========================
   REMOVE WISHLIST
=========================== */

function removeWishlist(index) {

    wishlist.splice(index, 1);

    saveWishlist();

    updateWishlist();

    showToast("Removed from Wishlist");

}

/* ===========================
   UPDATE WISHLIST
=========================== */

function updateWishlist() {

    let box = document.getElementById("wishlistItems");

    if (!box) return;

    box.innerHTML = "";

    if (wishlist.length === 0) {

        box.innerHTML = "<p>No items in wishlist.</p>";

        return;

    }

    wishlist.forEach(function(item, index) {

        box.innerHTML += `
        <div class="wishlist-item">
            <strong>${item.name}</strong><br>
            <span>${money(item.price)}</span><br>
            <button onclick="addToCart('${item.name}',${item.price},'${item.image}')">Add To Cart</button>
            <button onclick="removeWishlist(${index})">Remove</button>
        </div>
        `;

    });

}

/* ===========================
   QUICK VIEW
=========================== */

function quickView(name, price) {

    alert(
        "Product : " + name +
        "\nPrice : " + money(price) +
        "\n\nPremium Quality Product."
    );

}/* ===========================
   WHATSAPP BUY NOW
=========================== */

const STORE_PHONE = "919142956411";

function buyNow(name, price) {

    let message =
`🛍️ AMJAD DIGITAL STORE

I want to order:

Product: ${name}
Price: ${money(price)}

Please confirm my order.`;

    window.open(
        "https://wa.me/" + STORE_PHONE + "?text=" + encodeURIComponent(message),
        "_blank"
    );

}

/* ===========================
   CHECKOUT
=========================== */

function checkout() {

    if (cart.length === 0) {

        showToast("Your cart is empty.");

        return;

    }

    let order = "🛒 AMJAD DIGITAL STORE ORDER\n\n";

    cart.forEach(function(item){

        order +=
`${item.name}
Qty : ${item.qty}
Price : ${money(item.price)}

`;

    });

    order += "Total : " + money(getCartTotal());

    window.open(

"https://wa.me/" + STORE_PHONE + "?text=" + encodeURIComponent(order),

"_blank"

    );

}

/* ===========================
   COUPON
=========================== */

function applyCoupon(code){

    code = code.toUpperCase();

    if(code==="AMJAD100"){

        couponDiscount=100;

        showToast("₹100 Coupon Applied");

    }

    else if(code==="SAVE10"){

        couponDiscount=getCartTotal()*0.10;

        showToast("10% Discount Applied");

    }

    else{

        couponDiscount=0;

        showToast("Invalid Coupon");

    }

    updateCart();

}

/* ===========================
   DELIVERY CHARGE
=========================== */

function deliveryCharge(){

    if(getCartTotal()>=999){

        return 0;

    }

    return 80;

}

/* ===========================
   FINAL BILL
=========================== */

function finalBill(){

    let total=getCartTotal();

    let delivery=deliveryCharge();

    return total+delivery-couponDiscount;

}/* ===========================
   DARK MODE
=========================== */

function toggleDarkMode(){

    document.body.classList.toggle("dark-mode");

    localStorage.setItem(
        "theme",
        document.body.classList.contains("dark-mode")
        ? "dark"
        : "light"
    );

}

/* ===========================
   LOAD THEME
=========================== */

(function(){

    let theme = localStorage.getItem("theme");

    if(theme === "dark"){

        document.body.classList.add("dark-mode");

    }

})();

/* ===========================
   SCROLL TO TOP
=========================== */

window.addEventListener("scroll", function(){

    let btn = document.getElementById("topBtn");

    if(!btn) return;

    if(window.scrollY > 300){

        btn.style.display = "block";

    }else{

        btn.style.display = "none";

    }

});

function topFunction(){

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}

/* ===========================
   FLASH SALE COUNTDOWN
=========================== */

let saleSeconds = 24 * 60 * 60;

setInterval(function(){

    let h = Math.floor(saleSeconds / 3600);

    let m = Math.floor((saleSeconds % 3600) / 60);

    let s = saleSeconds % 60;

    let timer = document.getElementById("countdown");

    if(timer){

        timer.innerHTML =
            h + "h : " + m + "m : " + s + "s";

    }

    if(saleSeconds > 0){

        saleSeconds--;

    }

},1000);

/* ===========================
   WELCOME MESSAGE
=========================== */

setTimeout(function(){

    showToast("🔥 Welcome! Check today's special offers.");

},3000);/* ===========================
   RECENTLY VIEWED PRODUCTS
=========================== */

let recentProducts = [];

function viewProduct(name){

    if(!recentProducts.includes(name)){

        recentProducts.unshift(name);

    }

    if(recentProducts.length>8){

        recentProducts.pop();

    }

    localStorage.setItem(

        "recentProducts",

        JSON.stringify(recentProducts)

    );

}

/* ===========================
   LOAD RECENT PRODUCTS
=========================== */

function loadRecentProducts(){

    let data = localStorage.getItem("recentProducts");

    if(data){

        recentProducts = JSON.parse(data);

    }

}

/* ===========================
   STOCK STATUS
=========================== */

function stockStatus(stock){

    if(stock > 10){

        return "🟢 In Stock";

    }

    if(stock > 0){

        return "🟠 Only Few Left";

    }

    return "🔴 Out Of Stock";

}

/* ===========================
   PRODUCT RATING
=========================== */

function productStars(rate){

    let stars="";

    for(let i=1;i<=5;i++){

        if(i<=rate){

            stars+="⭐";

        }else{

            stars+="☆";

        }

    }

    return stars;

}

/* ===========================
   OFFER POPUP
=========================== */

function showOffer(){

    setTimeout(function(){

        alert(

"🎉 BIG SALE\n\nUse Coupon Code:\nAMJAD100\n\nGet ₹100 OFF"

        );

    },6000);

}

/* ===========================
   STARTUP
=========================== */

loadRecentProducts();

showOffer();/* ===========================
   PART 9
   ORDER TRACKING & UTILITIES
=========================== */

/* Order ID */

function generateOrderId(){

    return "ADS-" + Date.now();

}

/* Order Tracking */

function trackOrder(orderId){

    showToast("Tracking Order : " + orderId);

}

/* Wishlist Counter */

function updateWishlistCount(){

    let count=document.getElementById("wishlistCount");

    if(count){

        count.innerHTML=wishlist.length;

    }

}

/* Cart Counter */

function updateCartCount(){

    let count=document.getElementById("cartCount");

    if(count){

        count.innerHTML=getCartCount();

    }

}

/* Notification Bell */

function notify(title,msg){

    if("Notification" in window){

        if(Notification.permission==="granted"){

            new Notification(title,{

                body:msg

            });

        }

    }

}

/* Ask Permission */

function askNotification(){

    if("Notification" in window){

        Notification.requestPermission();

    }

}

/* Share Product */

function shareProduct(name,price){

    let text=

name +

" - " +

money(price) +

"\nhttps://amjadwastrale-create.github.io/amjad-digital-store/";

    if(navigator.share){

        navigator.share({

            title:name,

            text:text

        });

    }else{

        navigator.clipboard.writeText(text);

        showToast("Product link copied");

    }

}

/* Copy Coupon */

function copyCoupon(){

    navigator.clipboard.writeText("AMJAD100");

    showToast("Coupon Copied");

}

/* Contact Store */

function callStore(){

    window.location.href="tel:+919142956411";

}

/* Email Store */

function emailStore(){

    window.location.href=

"mailto:amjaddigitalstore@gmail.com";

        }/* ===========================
   PART 10
   FINAL INITIALIZATION
=========================== */

document.addEventListener("DOMContentLoaded", function () {

    loadCart();
    loadWishlist();

    updateCart();

    if (typeof updateWishlist === "function") {
        updateWishlist();
    }

    if (typeof updateCartCount === "function") {
        updateCartCount();
    }

    if (typeof updateWishlistCount === "function") {
        updateWishlistCount();
    }

    let search = document.getElementById("search");

    if (search) {
        search.addEventListener("keyup", searchProducts);
    }

    askNotification();

    console.log("AMJAD DIGITAL STORE Loaded Successfully");

});

/* ===========================
   PRODUCT CLICK
=========================== */

document.querySelectorAll(".product-card").forEach(function(card){

    card.addEventListener("click",function(){

        let title=this.querySelector("h3");

        if(title){

            viewProduct(title.innerText);

        }

    });

});

/* ===========================
   NETWORK STATUS
=========================== */

window.addEventListener("offline",function(){

    showToast("No Internet Connection");

});

window.addEventListener("online",function(){

    showToast("Internet Connected");

});

/* ===========================
   THANK YOU
=========================== */

console.log("Website Developed For AMJAD DIGITAL STORE");
console.log("Version 1.0");/* ===========================
   BONUS PART 11
=========================== */

/* Copy Store Link */

function copyStoreLink(){

    navigator.clipboard.writeText(window.location.href);

    showToast("Store link copied");

}

/* Print Invoice */

function printInvoice(){

    window.print();

}

/* Fake Loading */

function showLoader(){

    let loader=document.getElementById("loader");

    if(loader){

        loader.style.display="block";

        setTimeout(function(){

            loader.style.display="none";

        },2000);

    }

}

/* Festival Greeting */

function festivalOffer(){

    let hour=new Date().getHours();

    if(hour<12){

        console.log("Good Morning 🌞");

    }else if(hour<18){

        console.log("Good Afternoon ☀️");

    }else{

        console.log("Good Evening 🌙");

    }

}

/* Visit Counter */

let visits=localStorage.getItem("visits");

if(!visits){

    visits=0;

}

visits++;

localStorage.setItem("visits",visits);

console.log("Visits :",visits);

/* Lucky Coupon */

function luckyCoupon(){

    let coupons=["SAVE10","AMJAD100","SALE50"];

    let coupon=coupons[Math.floor(Math.random()*coupons.length)];

    showToast("🎁 Lucky Coupon : "+coupon);

}

/* Welcome Offer */

setTimeout(function(){

    luckyCoupon();

},8000);
