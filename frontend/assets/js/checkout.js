// 🛒 Load cart data
const cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartItems = document.getElementById("cartItems");
const totalPriceEl = document.getElementById("totalPrice");

let total = 0;
cart.forEach(item => {
  const div = document.createElement("div");
  div.classList.add("cart-item");
  div.innerHTML = `
    <img src="${item.image}" alt="${item.name}">
    <div>
      <h4>${item.name}</h4>
      <p>${item.price} SAR × ${item.quantity}</p>
    </div>
  `;
  cartItems.appendChild(div);
  total += item.price * item.quantity;
});
totalPriceEl.textContent = total.toFixed(2);

// 💳 Handle checkout
document.getElementById("checkoutForm").addEventListener("submit", (e) => {
  e.preventDefault();

  // ✅ Validate
  const name = document.getElementById("name").value.trim();
  const address = document.getElementById("address").value.trim();
  const phone = document.getElementById("phone").value.trim();
  if (!name || !address || !phone) {
    alert("⚠️ Please fill in your info before confirming payment.");
    return;
  }


  // Send order to backend
fetch("http://localhost/technest/backend/place_order.php", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name,
    address,
    phone,
    items: cart,
    total,
  }),
})


  // 💬 Show popup
  const popup = document.getElementById("successPopup");
  popup.classList.remove("hidden");
  popup.classList.add("show");

  // 🕒 Hide popup & redirect
  setTimeout(() => {
    popup.classList.remove("show");
    setTimeout(() => {
      popup.classList.add("hidden");
      localStorage.removeItem("cart");
      window.location.href = "index.html";
    }, 600);
  }, 2000);
});
