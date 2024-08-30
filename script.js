
const products = [
  { id: 1, name: "Apple phone", price: 100 },
  { id: 2, name: "i watch seies  2", price: 80 },
  { id: 3, name: "Hair dryer", price: 30 },
  { id: 4, name: "Hp laptop", price: 90 },
  { id: 5, name: "video game", price: 15 },
];

// Elements
const productList = document.getElementById('product-list');
const cartList = document.getElementById('cart-list');
const clearCartBtn = document.getElementById('clear-cart-btn');

// Load cart from session storage
function loadCart() {
  const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
  cart.forEach(item => addToCart(item));
}

// Save cart to session storage
function saveCart() {
  const cartItems = [];
  cartList.querySelectorAll('li').forEach(li => {
    const id = li.getAttribute('data-id');
    const name = li.querySelector('.name').textContent;
    const price = parseFloat(li.querySelector('.price').textContent);
    cartItems.push({ id, name, price });
  });
  sessionStorage.setItem('cart', JSON.stringify(cartItems));
}

// Render products
function renderProducts() {
  products.forEach(product => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${product.name} - $${product.price}
      <button data-id="${product.id}" class="add-to-cart-btn">Add to Cart</button>
    `;
    productList.appendChild(li);
  });
}

// Add product to cart
function addToCart(product) {
  const li = document.createElement('li');
  li.setAttribute('data-id', product.id);
  li.innerHTML = `
    <span class="name">${product.name}</span> - $<span class="price">${product.price}</span>
  `;
  cartList.appendChild(li);
}

// Handle add to cart button click
productList.addEventListener('click', (e) => {
  if (e.target.classList.contains('add-to-cart-btn')) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const product = products.find(p => p.id === productId);
    if (product) {
      addToCart(product);
      saveCart();
    }
  }
});

// Handle clear cart button click
clearCartBtn.addEventListener('click', () => {
  cartList.innerHTML = '';
  sessionStorage.removeItem('cart');
});

// Initial setup
renderProducts();
loadCart();
