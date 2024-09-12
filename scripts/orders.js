
import { cart } from '../data/cart-class.js';
import { MMMMDDDateFormat } from '../data/deliveryOptions.js';
import { getOrdersFromStorage } from '../data/orders.js';
import { getProduct, loadProductsFetch } from '../data/products.js';
import formatCurrency from './utils/money.js';

updateCartQuantity()
try {
  await loadProductsFetch();
  renderOrders();
} catch (error) {
  console.error(error); 
}

function renderOrders() {
  const orders = getOrdersFromStorage();
  let ordersHTML = '';
  orders.forEach(order => {
    const { id, orderTime, totalCostCents, products } = order;

    // orderTime : "2024-05-07T22:22:03.089Z"

    let orderPorductsHTML = '';
    products.forEach(product => {
      const { estimatedDeliveryTime, productId, quantity, variation } = product;
      const productDetails = getProduct(productId);

      orderPorductsHTML += `
        <div class="product-image-container">
          <img src="${productDetails.getImage()}">
        </div>

        <div class="product-details">
          <p class="product-name">
            ${productDetails.name}
          </p>
          <p class="product-delivery-date">
            Arriving on: ${MMMMDDDateFormat(estimatedDeliveryTime)}
          </p>
          <p class="product-quantity">
            Quantity: ${quantity}
          </p>
          <button class="buy-again-button button-primary js-buy-again-button" data-product-id="${productId}">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>

        <div class="product-actions">
          <a href="tracking.html?orderId=${id}&productId=${productId}">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
      `;
    });


    ordersHTML += `
      <section class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <p class="order-header-label">Order Placed:</p>
              <p>${MMMMDDDateFormat(orderTime)}</p>
            </div>
            <div class="order-total">
              <p class="order-header-label">Total:</p>
              <p>$${formatCurrency(totalCostCents)}</p>
            </div>
          </div>

          <div class="order-header-right-section">
            <p class="order-header-label">Order ID:</p>
            <p>${id}</p>
          </div>
        </div>

        <div class="order-details-grid">
          ${orderPorductsHTML}
        </div>
      </section>
    `;
  });

  document.querySelector('.js-orders-grid').innerHTML = ordersHTML;

  const addToCartBtn = document.querySelectorAll('.js-buy-again-button');
  addToCartBtn.forEach((button) => {
    button.addEventListener('click', () => {
      const { productId } = button.dataset;

      cart.addToCart(productId);
      updateCartQuantity();
    });
  });
}

function updateCartQuantity() {
  document.querySelector('.js-cart-quantity').innerHTML = cart.calculateQuantity();
}