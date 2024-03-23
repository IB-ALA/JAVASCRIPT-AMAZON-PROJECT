import { calculateQuantity } from '../../data/cart.js';


export function renderCheckoutHeader() {
  const checkoutHeaderMidSecElem = document.querySelector('.js-checkout-header-middle-section');

  let html = `
    Checkout (<a class="return-to-home-link js-checkout-nav-cart-quantity"
      href="amazon.html">${calculateQuantity()} items</a>)
  `;

  checkoutHeaderMidSecElem.innerHTML = html;
}