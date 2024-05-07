// import {cart, addToCart, calculateQuantity} from '../data/cart.js';
import { cart } from '../data/cart-class.js';
import { products, loadProducts } from '../data/products.js';
// import {formatCurrency} from './utils/money.js';

const productsGrid = document.querySelector('.js-products-grid');
const caryQuantityElem = document.querySelector('.js-cart-quantity');

loadProducts(renderProductsGrid);

let timeoutId;

updateCartQuantity();

// console.log(products);

function renderProductsGrid() {
  let productsHTML = '';

  products.forEach((product) => {
    productsHTML += `
      <section class="product-container">
        <div class="product-image-container">
          <img class="product-image"
            src="${product.image}">
        </div>

        <p class="product-name limit-text-to-2-lines">
          ${product.name}
        </p>

        <div class="product-rating-container">
          <img class="product-rating-stars"
            src="${product.getStarsUrl()}">
          <p class="product-rating-count link-primary">
            ${product.rating.count}
          </p>
        </div>

        <p class="product-price">
          ${product.getPrice()}
        </p>

        <div class="product-quantity-container">
          <select class="js-quantity-selector-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        ${product.extraInfoHTML()}

        <div class="product-spacer"></div>

        <div class="added-to-cart js-added-to-cart-${product.id}">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart-button" data-product-id="${product.id}">
          Add to Cart
        </button>
      </section>
    `;
  });

  productsGrid.innerHTML = productsHTML;


  const addToCartBtn = document.querySelectorAll('.js-add-to-cart-button');
  addToCartBtn.forEach((button) => {
    button.addEventListener('click', () => {
      const { productId } = button.dataset;

      cart.addToCart(productId);
      updateCartQuantity();
      displayAddedText(productId);
    });
  });
}





function updateCartQuantity() {
  caryQuantityElem.innerHTML = cart.calculateQuantity();
}

function displayAddedText(productId) {
  const addedTextElem = document.querySelector(`.js-added-to-cart-${productId}`);

  addedTextElem.classList.add('make-text-visible');
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    addedTextElem.classList.remove('make-text-visible');
  }, 2000);
}
