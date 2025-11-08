document.addEventListener("DOMContentLoaded", () => {
  const productGrid = document.querySelector(".product-grid");
  const cartButton = document.querySelector('.cart-link');
  const cartSidebar = document.getElementById('cartSidebar');
  const closeCartBtn = document.querySelector('.close-cart');
  const cartItemsContainer = document.querySelector('.cart-items');
  const totalPriceElement = document.querySelector('.total-price');
  const cartCount = document.querySelector('.cart-count');

  // 🛒 Sidebar Cart Toggle
  cartButton.addEventListener('click', (e) => {
    e.preventDefault();
    cartSidebar.classList.add('active');
    updateCartUI(); // ✅ تأكد يحدث السلة كل مرة تفتح
  });

  closeCartBtn.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
  });

  // 🛍️ Load products from backend
  fetch("http://localhost/technest/backend/get_products.php")
    .then(response => response.json())
    .then(products => {
      productGrid.innerHTML = "";

      products.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("product-card");

        card.innerHTML = `
          <img src="assets/images/${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <span class="price">${product.price} SAR</span>
          <button class="add-btn">Add to Cart</button>
        `;

        productGrid.appendChild(card);
      });

      // 🛒 Handle Add to Cart
      const addButtons = document.querySelectorAll('.add-btn');
      addButtons.forEach(button => {
        button.addEventListener('click', (e) => {
          let cart = JSON.parse(localStorage.getItem('cart')) || []; // ✅ تحديث مباشر

          const card = e.target.closest('.product-card');
          const name = card.querySelector('h3').textContent;
          const price = parseFloat(card.querySelector('.price').textContent);
          const image = card.querySelector('img').src;

          const existingItem = cart.find(item => item.name === name);

          if (existingItem) {
            existingItem.quantity += 1;
          } else {
            cart.push({ name, price, image, quantity: 1 });
          }

          localStorage.setItem('cart', JSON.stringify(cart));
          updateCartUI(); // ✅ بعد كل تعديل
          cartSidebar.classList.add('active'); // Auto open sidebar
        });
      });
    })
    .catch(error => {
      console.error("Error loading products:", error);
    });

  // 🛍️ Update the cart and UI
  function updateCartUI() {
    let cart = JSON.parse(localStorage.getItem('cart')) || []; // ✅ تحديث فوري من التخزين
    cartItemsContainer.innerHTML = '';
    let total = 0;
    let totalQuantity = 0;

    cart.forEach((item, index) => {
      const itemElement = document.createElement('div');
      itemElement.classList.add('cart-item');
      itemElement.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="info">
          <p>${item.name}</p>
          <span>${item.price} SAR</span>
          <div class="qty-controls">
            <button class="decrease">-</button>
            <span class="qty-number">${item.quantity}</span>
            <button class="increase">+</button>
          </div>
        </div>
      `;
      cartItemsContainer.appendChild(itemElement);

      total += item.price * item.quantity;
      totalQuantity += item.quantity;

      // 🔹 Increase button
      itemElement.querySelector('.increase').addEventListener('click', () => {
        let currentCart = JSON.parse(localStorage.getItem('cart')) || [];
        currentCart[index].quantity += 1;
        localStorage.setItem('cart', JSON.stringify(currentCart));
        updateCartUI();
      });

      // 🔹 Decrease button
      itemElement.querySelector('.decrease').addEventListener('click', () => {
        let currentCart = JSON.parse(localStorage.getItem('cart')) || [];
        if (currentCart[index].quantity > 1) {
          currentCart[index].quantity -= 1;
        } else {
          currentCart.splice(index, 1);
        }
        localStorage.setItem('cart', JSON.stringify(currentCart));
        updateCartUI();
      });
    });

    totalPriceElement.textContent = total.toFixed(2);
    cartCount.textContent = totalQuantity;
  }

  // 🚀 Update the cart when the page loads
  updateCartUI();


});
// ==================== 🔍 Simple Search with Scroll ====================

// لما المستخدم يكتب في السيرش
document.getElementById("searchInput").addEventListener("input", function () {
  const query = this.value.toLowerCase();
  const products = document.querySelectorAll(".product-card");

  products.forEach(product => {
    const name = product.querySelector("h3").textContent.toLowerCase();
    const desc = product.querySelector("p").textContent.toLowerCase();

    if (name.includes(query) || desc.includes(query)) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
});

// لما يضغط الزر أو إنتر
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");

function scrollToProducts() {
  const productsSection = document.getElementById("products");
  productsSection.scrollIntoView({ behavior: "smooth" });
}

// زر البحث
searchBtn.addEventListener("click", () => {
  scrollToProducts();
  filterProducts(searchInput.value.toLowerCase());
});

// الضغط على Enter
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    scrollToProducts();
    filterProducts(searchInput.value.toLowerCase());
  }
});

// فلترة المنتجات
function filterProducts(query) {
  const products = document.querySelectorAll(".product-card");
  let found = false;

  products.forEach(product => {
    const name = product.querySelector("h3").textContent.toLowerCase();
    const desc = product.querySelector("p").textContent.toLowerCase();

    if (name.includes(query) || desc.includes(query)) {
      product.style.display = "block";
      found = true;
    } else {
      product.style.display = "none";
    }
  });

  if (!found && query !== "") {
    alert("No products found 😢");
  }
}
