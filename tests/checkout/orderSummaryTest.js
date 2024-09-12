import { renderOrderSummary } from '../../scripts/checkout/orderSummary.js';
// import { loadFromStorage, cart } from '../../data/cart.js';
import { cart } from '../../data/cart-class.js';
import { getProduct, loadProducts, loadProductsFetch } from '../../data/products.js';
import { formatCurrency } from '../../scripts/utils/money.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';

describe('test suite: renderOrderSummary', () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

  beforeEach(() =>{
    spyOn(localStorage, 'setItem');

    document.querySelector('.js-test-container').innerHTML = `
      <div class="js-order-summary"></div>
      <div class="js-payment-summary"></div>
      <div class="js-checkout-header-middle-section"></div>
    `;
    
    cart.cartItems = [
      {
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
      },
      {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2'
      }
    ];
    renderOrderSummary();
  });


  // 16f
  afterEach(() => {
    document.querySelector('.js-test-container').innerHTML = '';
  });

  beforeAll( async () => {
    await loadProductsFetch();
  });



  it('diplays the cart', () => {
    // beforeEach running here

    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(2);

    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain('Quantity: 2');

    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText
    ).toContain('Quantity: 1');


    // 16g
    const matchingProduct1 = getProduct(productId1);
    expect(
      document.querySelector(`.js-product-name-${productId1}`).innerText
    ).toEqual(`${matchingProduct1.name}`);

    const matchingProduct2 = getProduct(productId2);
    expect(
      document.querySelector(`.js-product-name-${productId2}`).innerText
    ).toEqual(`${matchingProduct2.name}`);

    // 16h
    expect(
      document.querySelector(`.js-product-price-${productId1}`).innerText
    ).toEqual(`$${formatCurrency(matchingProduct1.priceCents)}`);
    expect(
      document.querySelector(`.js-product-price-${productId2}`).innerText
    ).toEqual(`$${formatCurrency(matchingProduct2.priceCents)}`);
  });


  it('remove a product', () => {
    // beforeEach renning here

    document.querySelector(`.js-delete-quantity-link-${productId1}`).click();
    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(1);

    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toEqual(null);

    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toEqual(null);

    expect(cart.cartItems.length).toEqual(1);

    expect(cart.cartItems[0].productId).toEqual(productId2);

    // 16g
    const matchingProduct2 = getProduct(productId2);
    expect(
      document.querySelector(`.js-product-name-${productId2}`).innerText
    ).toEqual(`${matchingProduct2.name}`);

    // 16h
    expect(
      document.querySelector(`.js-product-price-${productId2}`).innerText
    ).toEqual(`$${formatCurrency(matchingProduct2.priceCents)}`);
  });


  // 16j
  it('updates deliverOption', () => {
    renderOrderSummary();
    document.querySelector(`.js-delivery-option-${productId1}-3`).click();

    expect(
      document.querySelector(`.delivery-option-input-${productId1}-3`).checked
    ).toEqual(true);

    expect(cart.cartItems.length).toEqual(2);

    expect(cart.cartItems[0].deliveryOptionId).toEqual('3');


    expect(
      document.querySelector('.js-payment-summary-money-shipping').innerText
    ).toEqual(`$${formatCurrency(getDeliveryOption('3').priceCents + getDeliveryOption('2').priceCents)}`);


    expect(
      document.querySelector('.js-payment-summary-money-total').innerText
    ).toEqual('$63.50');

  });
});