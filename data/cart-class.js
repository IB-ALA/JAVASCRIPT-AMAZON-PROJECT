

class Cart {
  cartItems;
  #localStorageKey;


  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    
    this.#loadFromStorage();
  }

  #loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));
    // if cart if empty, localStorage will give NULL
    // !NULL = true;
  
    if (!this.cartItems) {
      this.cartItems = [
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
    }
  }

  saveToStorage() {
    localStorage.setItethis.m(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  addToCart(productId) {
    const selectorElem = document.querySelector(`.js-quantity-selector-${productId}`);
    // const quantity = Number(selectorElem.value);
    let matchingItem;
    
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        matchingItem = cartItem;
      }
    });
  
    if (matchingItem) {
      // matchingItem returns an object if there exist any and object is a truthy value!
      matchingItem.quantity += 1; 
    } else {
      this.cartItems.push({
        productId,
        quantity: 1,
        deliveryOptionId: '1'
      });
    }
  
    this.saveToStorage();
  }

  removeFromCart(productId) {
    this.cartItems = this.cartItems.filter((cartItem) => cartItem.productId !== productId);
    this.saveToStorage();
  }

  updateQuantity(productId, newQuantity) {
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        cartItem.quantity = newQuantity;
      }
    });
    this.saveToStorage();
  }

  calculateQuantity() {
    let caryQuantity = 0;
  
    this.cartItems.forEach((cartItem) => {
      caryQuantity += cartItem.quantity;
    });
  
    return caryQuantity;
  }

  updateDeliveryOptions(productId, deliveryOptionId) {
    let matchingItem;
    let deliveryOption = getDeliveryOption(deliveryOptionId);
  
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        matchingItem = cartItem;
      }
    }); 
  
    if (!matchingItem || !deliveryOption) {
     return;
    }
  
    matchingItem.deliveryOptionId = deliveryOptionId;
  
    this.saveToStorage();
  }
}


const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');

// cart.#localStorageKey = test;



// localStorage.clear();

// import { cart } from './cart.js';
import { getDeliveryOption } from './deliveryOptions.js';



console.log(cart);
console.log(businessCart);

console.log(businessCart instanceof Cart);