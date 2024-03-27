import { calculateQuantity } from '../../data/cart.js';


export function renderCheckoutHeader() {
  const checkoutHeaderMidSecElem = document.querySelector('.js-checkout-header-middle-section');

  let html = `
    Checkout (<a class="return-to-home-link js-checkout-nav-cart-quantity"
      href="amazon.html">${calculateQuantity()} ${calculateQuantity() === 1 ? 'item' : 'items'}</a>)
  `;

  // checkoutHeaderMidSecElem.innerHTML = html;
  document.querySelector('.js-checkout-header-middle-section').innerHTML = html;
}