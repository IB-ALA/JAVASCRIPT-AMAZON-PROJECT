import {cart, removeFromCart, calculateQuantity, updateQuantity} from '../data/cart.js';
import {products} from '../data/products.js';
import {formatCurrency} from './utils/money.js';

const checkoutCartQuantityElem = document.querySelector('.js-checkout-nav-cart-quantity');
const orderSummaryElem = document.querySelector('.js-order-summary');


updateCartQuantity();

let cartSummaryHTML = '';
cart.forEach((cartItem) => {
  const { productId } = cartItem;

  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  console.log(matchingProduct);

  cartSummaryHTML += `
    <section class="cart-item-container js-cart-item-container-${matchingProduct.id}">
      <p class="delivery-date">
        Delivery date: Tuesday, June 21
      </p>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <p class="product-name">
            ${matchingProduct.name}
          </p>
          <p class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
          </p>
          <p class="product-quantity">
            <span>
              Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${matchingProduct.id}">
              Update
            </span>
            <input type="number" class="quantity-input js-quantity-input-${matchingProduct.id}">
            <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id="${matchingProduct.id}">Save</span>
            <span class="delete-quantity-link link-primary js-delete-quantity-link" data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </p>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          <div class="delivery-option">
            <input type="radio" checked
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Wednesday, June 15
              </div>
              <div class="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Monday, June 13
              </div>
              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
});

orderSummaryElem.innerHTML = cartSummaryHTML;

const deleteBtns = document.querySelectorAll('.js-delete-quantity-link');
const updateBtns = document.querySelectorAll('.js-update-quantity-link');
const saveBtns = document.querySelectorAll('.js-save-quantity-link');

deleteBtns.forEach((link) => {
  link.addEventListener('click', () => {
    const { productId } = link.dataset;

    removeFromCart(productId);
    console.log(cart);
    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.remove();
    updateCartQuantity();
  });
});

updateBtns.forEach((link) => {
  link.addEventListener('click', () => {
    const { productId } = link.dataset;
    
    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.classList.add('is-editing-quantity');

    // added this myself
    const quantityInputElem = document.querySelector(`.js-quantity-input-${productId}`);
    quantityInputElem.focus();
    cart.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        quantityInputElem.value = cartItem.quantity;
      }
    });
    // ends here.

    
    quantityInputElem.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const quantityInputElem = document.querySelector(`.js-quantity-input-${productId}`);
        const quantityLabelElem = document.querySelector(`.js-quantity-label-${productId}`);
        const newQuantity = Number(quantityInputElem.value);

        if (newQuantity > 0 && newQuantity < 1000) {
          console.log('valid');
    
          container.classList.remove('is-editing-quantity');
          updateQuantity(productId, newQuantity);
          updateCartQuantity();
          quantityLabelElem.innerHTML = newQuantity;
        } else {
          cart.forEach((cartItem) => {
            if (cartItem.productId === productId) {
              quantityInputElem.value = cartItem.quantity;
            }
          });
        }
      }
    });
  });
});


saveBtns.forEach((link) => {
  link.addEventListener('click', ()=> {
    const { productId } = link.dataset;
    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    const quantityInputElem = document.querySelector(`.js-quantity-input-${productId}`);
    const quantityLabelElem = document.querySelector(`.js-quantity-label-${productId}`);
    const newQuantity = Number(quantityInputElem.value);

    if (newQuantity > 0 && newQuantity < 1000) {
      console.log('valid');

      container.classList.remove('is-editing-quantity');
      updateQuantity(productId, newQuantity);
      updateCartQuantity();
      quantityLabelElem.innerHTML = newQuantity;
    } else {
      cart.forEach((cartItem) => {
        if (cartItem.productId === productId) {
          quantityInputElem.value = cartItem.quantity;
        }
      });
    }
  });
});


function updateCartQuantity() {
  checkoutCartQuantityElem.innerHTML = `${calculateQuantity()} items`;
}