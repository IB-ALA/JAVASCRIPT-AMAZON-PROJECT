import { cart } from '../data/cart-class.js';
import { calculateDeliveryProgressPercent, formatDate } from '../data/deliveryOptions.js';
import { getOrdersFromStorage } from '../data/orders.js';
import { getProduct, loadProductsFetch } from '../data/products.js';

document.querySelector('.js-cart-quantity').innerHTML = cart.calculateQuantity();

const url = new URL(window.location.href);
const orderId = url.searchParams.get('orderId');
const productId = url.searchParams.get('productId');
// console.log(orderId);
// console.log(productId);

try {
  await loadProductsFetch();
  renderOrderItem(orderId, productId);
} catch (error) {
  console.error(error); 
}

function renderOrderItem(orderId, productId) {

  const orders = getOrdersFromStorage();
  let productOrder;
  let trackingProduct;
  orders.forEach(order => {
    const { id } = order;
    if (orderId === id) {
      productOrder = order;
      console.log(productOrder); 
    }
  });

  productOrder.products.forEach(orderItem => {
    if (productId === orderItem.productId) {
      trackingProduct = orderItem;
    }
  });

  const { quantity, estimatedDeliveryTime } = trackingProduct;
  const productDetails = getProduct(productId);
  console.log(productDetails);
  

  const deliveryProgressPercent = calculateDeliveryProgressPercent(productOrder.orderTime, estimatedDeliveryTime);
  

  document.querySelector('.js-order-tracking').innerHTML = `
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>

    <p class="delivery-date">
      Arriving on ${formatDate(estimatedDeliveryTime, 'dddd, MMMM DD')}
    </p>

    <p class="product-info">
      ${productDetails.name}
    </p>

    <p class="product-info">
      Quantity: ${quantity}
    </p>

    <img class="product-image" src="${productDetails.getImage()}">

    <div class="progress-labels-container">
      <p class="progress-label ${(deliveryProgressPercent >= 0 && deliveryProgressPercent <= 49) ? 'current-status' : ''}">
        Preparing
      </p>
      <p class="progress-label  ${(deliveryProgressPercent >= 50 && deliveryProgressPercent <= 99) ? 'current-status' : ''}">
        Shipped
      </p>
      <p class="progress-label ${(deliveryProgressPercent >= 100) ? 'current-status' : ''}">
        Delivered
      </p>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar" style="width: ${deliveryProgressPercent}%;"></div>
    </div>
  `;
  
}