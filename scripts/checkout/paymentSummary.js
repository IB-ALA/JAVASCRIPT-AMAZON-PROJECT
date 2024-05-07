// import { cart, calculateQuantity } from '../../data/cart.js';
import { cart } from '../../data/cart-class.js';
import { getProduct } from '../../data/products.js';
import formatCurrency from '../utils/money.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';
import { addOrder, orders } from '../../data/orders.js';


const paymentSummaryElem = document.querySelector('.js-payment-summary');



export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;

  cart.cartItems.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);

    productPriceCents += product.priceCents * cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);

    shippingPriceCents += deliveryOption.priceCents;
  });

  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;

  // console.log(formatCurrency(productPriceCents));
  // console.log(shippingPriceCents);
  // console.log(totalBeforeTaxCents);
  // console.log(taxCents);
  // console.log(totalCents);

  const html = `
    <p class="payment-summary-title">
      Order Summary
    </p>

    <div class="payment-summary-row">
      <p>Items (${cart.calculateQuantity()}):</p>
      <p class="payment-summary-money">
        $${formatCurrency(productPriceCents)}
      </p>
    </div>

    <div class="payment-summary-row">
      <p>Shipping &amp; handling:</p>
      <p class="payment-summary-money 
      js-payment-summary-money-shipping">
        $${formatCurrency(shippingPriceCents)}
      </p>
    </div>

    <div class="payment-summary-row subtotal-row">
      <p>Total before tax:</p>
      <p class="payment-summary-money">
        $${formatCurrency(totalBeforeTaxCents)}
      </p>
    </div>

    <div class="payment-summary-row">
      <p>Estimated tax (10%):</p>
      <p class="payment-summary-money">
        $${formatCurrency(taxCents)}
      </p>
    </div>

    <div class="payment-summary-row total-row">
      <p>Order total:</p>
      <p class="payment-summary-money 
      js-payment-summary-money-total">
        $${formatCurrency(totalCents)}
      </p>
    </div>

    <button class="place-order-button button-primary js-place-order-button">
      Place your order
    </button>
  `;

  // paymentSummaryElem.innerHTML = html;
  document.querySelector('.js-payment-summary').innerHTML = html;

  document.querySelector('.js-place-order-button').addEventListener('click', async () => {
    try {
      const response = await fetch('https://supersimplebackend.dev/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cart: cart.cartItems
        })
      });
  
      const order = await response.json();
  
      addOrder(order);
      console.log(orders);
    } catch (error) {
      console.log('Unexpected error, Please try again later.');
      console.log(error)
    }

    window.location.href = 'orders.html';

  });
}