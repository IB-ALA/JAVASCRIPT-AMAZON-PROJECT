import {cart, removeFromCart, calculateQuantity, updateQuantity, updateDeliveryOptions} from '../../data/cart.js';
import {getProduct} from '../../data/products.js';
import {formatCurrency} from '../utils/money.js';
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';

const checkoutCartQuantityElem = document.querySelector('.js-checkout-nav-cart-quantity');
const orderSummaryElem = document.querySelector('.js-order-summary');


export function renderOrderSummary() {
  let cartSummaryHTML = '';
  cart.forEach((cartItem) => {
    const { productId } = cartItem;

    const matchingProduct = getProduct(productId);

    console.log(matchingProduct);
    const deliveryOptionId = cartItem.deliveryOptionId;
    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');

    cartSummaryHTML += `
      <section class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <p class="delivery-date">
          Delivery date: ${dateString}
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
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
          </div>
        </div>
      </section>
    `;
  });
  orderSummaryElem.innerHTML = cartSummaryHTML;


  const deleteBtns = document.querySelectorAll('.js-delete-quantity-link');
  const updateBtns = document.querySelectorAll('.js-update-quantity-link');
  const saveBtns = document.querySelectorAll('.js-save-quantity-link');
  const deliveryOptionElems = document.querySelectorAll('.js-delivery-option');

  updateCartQuantity();

  deleteBtns.forEach((link) => {
    link.addEventListener('click', () => {
      const { productId } = link.dataset;
      removeFromCart(productId);
      console.log(cart);
      // const container = document.querySelector(`.js-cart-item-container-${productId}`);
      // container.remove();
      renderOrderSummary();
      renderPaymentSummary();
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
            renderPaymentSummary();
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
        renderPaymentSummary();
      } else {
        cart.forEach((cartItem) => {
          if (cartItem.productId === productId) {
            quantityInputElem.value = cartItem.quantity;
          }
        });
      }
    });
  });

  deliveryOptionElems.forEach((element) => {
    element.addEventListener('click', () => {
      const {productId, deliveryOptionId} = element.dataset;

      updateDeliveryOptions(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}


export function updateCartQuantity() {
  checkoutCartQuantityElem.innerHTML = `${calculateQuantity()} items`;
}


function deliveryOptionsHTML(matchingProduct, cartItem) {
  let html = '';

  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');
    const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} -`;

    const ischecked = deliveryOption.id === cartItem.deliveryOptionId;

    html += `
      <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
        <input type="radio"
          ${ischecked ? 'checked' : ''}
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>
    `;
  });

  return html;
}