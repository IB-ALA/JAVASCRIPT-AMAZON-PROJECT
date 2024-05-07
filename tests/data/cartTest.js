// import { addToCart, cart, loadFromStorage, removeFromCart, updateDeliveryOptions } from '../../data/cart.js';

import { cart } from '../../data/cart-class.js';

const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';

describe('test suite: addToCart', () => {
  // 16e
  beforeEach(() => {
    // BECAUSE THE addToCart saves to localStorage and we don't want our test to affect our project so we mock setItem too.
    spyOn(localStorage, 'setItem');
  });

  
  it('adds an existing product', () => {    
    cart.cartItems = [
      {
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }
    ];
    console.log(cart.cartItems);
    // you mock before you call what you are mocking

    cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

    expect(cart.cartItems.length).toEqual(1);

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems[0].quantity).toEqual(2);

    // 16c
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', quantity: 2, deliveryOptionId: '1'}]));
  });


  it('adds a new product to the cart', () => {
    cart.cartItems = []

    console.log(cart.cartItems);
    // you mock before you call what you are mocking

    cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

    expect(cart.cartItems.length).toEqual(1);

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);

    expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

    expect(cart.cartItems[0].quantity).toEqual(1);

    // 16d
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', quantity: 1, deliveryOptionId: '1'}]));
  });
});

// 16i
describe('test suite: removeFromCart', () => {
  beforeEach(() => {
    spyOn(localStorage, 'setItem');

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
  });

  it('remove a productId that is in the cart', () => {
    cart.removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);

    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(
      [ {
          productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
          quantity: 1,
          deliveryOptionId: '2'
        }
      ]
    ));

    expect(cart.cartItems.length).toEqual(1);

    expect(cart.cartItems[0].productId).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');
  });


  it('remove a productId that is not in the cart', () => {
    cart.removeFromCart('does-not-exist');

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);

    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(
      [
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
      ]
    ));

    expect(cart.cartItems.length).toEqual(2);

    expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
  });
});

// 16k - 16l
describe('test suite: updateDeliveryOption', () => {
  beforeEach(() => {
    spyOn(localStorage, 'setItem');

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
  });

  it('update the delivery option of a product in the cart', () => {
    cart.updateDeliveryOptions(productId1, '2');
    expect(cart.cartItems.length).toEqual(2);

    expect(localStorage.setItem).not.toHaveBeenCalledWith('cart', JSON.stringify(
      [
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
      ]
    ));

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);

    expect(cart.cartItems[0].deliveryOptionId).toEqual('2');
  });

  it('update the delivery option of a productId that is not in the cart', () => {
    cart.updateDeliveryOptions('not-in-cart', '2');

    expect(cart.cartItems.length).toEqual(2);

    expect(localStorage.setItem).toHaveBeenCalledTimes(0);

    expect(localStorage.setItem).not.toHaveBeenCalledWith('cart', JSON.stringify(
      [
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
      ]
    ));
  });

  // 16m
  it('use a deliveryOptionId that does not exist', () => {
    cart.updateDeliveryOptions(productId1, 'not-an-option');

    expect(localStorage.setItem).toHaveBeenCalledTimes(0);

    expect(localStorage.setItem).not.toHaveBeenCalledWith('cart', JSON.stringify(
      [
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
      ]
    ));

    expect(cart.cartItems[0].deliveryOptionId).toEqual('1');
  });
});