
const products = [
  { id: 1, name: "Apple phone", price: 100 },
  { id: 2, name: "i watch seies  2", price: 80 },
  { id: 3, name: "Hair dryer", price: 30 },
  { id: 4, name: "Hp laptop", price: 90 },
  { id: 5, name: "video game", price: 15 },
];

document.addEventListener('DOMContentLoaded', () => {
  const productList = document.getElementById('product-list');
  const cartList = document.getElementById('cart-list');
  const clearCartBtn = document.getElementById('clear-cart-btn');

  // Render products
  products.forEach(product => {
    const li = document.createElement('li');
    li.textContent = `${product.name} - $${product.price} `;
    const addButton = document.createElement('button');
    addButton.textContent = 'Add to Cart';
    addButton.addEventListener('click', () => addToCart(product));
    li.appendChild(addButton);
    productList.appendChild(li);
  });

  // Load cart from sessionStorage
  function loadCart() {
    const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    cartList.innerHTML = '';
    cart.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.name} - $${item.price}`;
      cartList.appendChild(li);
    });
  }

  // Add product to cart and save to sessionStorage
  function addToCart(product) {
    const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    cart.push(product);
    sessionStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
  }

  // Clear cart
  clearCartBtn.addEventListener('click', () => {
    sessionStorage.removeItem('cart');
    loadCart();
  });

  loadCart();
});