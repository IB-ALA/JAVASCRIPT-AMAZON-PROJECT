import { addToCart, cart, loadFromStorage } from '../../data/cart.js';

describe('test suite: addToCart', () => {
  // 16e
  beforeEach(() => {
    // BECAUSE THE addToCart saves to localStorage and we dont want our test to affect our project so we mock setItem too
    spyOn(localStorage, 'setItem');
  });

  
  it('adds an existing product', () => {    
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', quantity: 1, deliveryOptionId: '1'}]);
    });
    loadFromStorage();
    console.log(localStorage.getItem('cart'));
    // you mock before you call what you are mocking

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

    expect(cart.length).toEqual(1);

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);

    // 16c
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', quantity: 2, deliveryOptionId: '1'}]));
  });


  it('adds a new product to the cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });
    loadFromStorage();

    console.log(localStorage.getItem('cart'));
    // you mock before you call what you are mocking

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

    expect(cart.length).toEqual(1);

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);

    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

    expect(cart[0].quantity).toEqual(1);

    // 16d
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', quantity: 1, deliveryOptionId: '1'}]));
  });
});