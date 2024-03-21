import {cart} from '../data/cart.js';


const productsGrid = document.querySelector('.js-products-grid');
const caryQuantityElem = document.querySelector('.js-cart-quantity');

let timeoutId;


// console.log(products);

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
          src="images/ratings/rating-${product.rating.stars * 10}.png">
        <p class="product-rating-count link-primary">
          ${product.rating.count}
        </p>
      </div>

      <p class="product-price">
        $${(product.priceCents / 100).toFixed(2)}
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
    // const productId = button.dataset.productId;
    const selectorElem = document.querySelector(`.js-quantity-selector-${productId}`);
    const quantity = Number(selectorElem.value);
    const addedTextElem = document.querySelector(`.js-added-to-cart-${productId}`);

    let matchingItem;
    cart.forEach((item) => {
      if (item.productId === productId) {
        matchingItem = item;
      }
    });

    if (matchingItem) {
      // matchingItem returns an object if there exist any and object is a truthy value!
      matchingItem.quantity += quantity; 
    } else {
      cart.push({
        productId,
        quantity
      });
    }

    let caryQuantity = 0;
    cart.forEach((item) => {
      caryQuantity += item.quantity;
    });
    caryQuantityElem.innerHTML = caryQuantity;

    addedTextElem.classList.add('make-text-visible');
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      addedTextElem.classList.remove('make-text-visible');
    }, 2000);
    // console.log(cart);
  });
});
