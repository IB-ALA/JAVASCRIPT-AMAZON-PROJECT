export let cart = JSON.parse(localStorage.getItem('cart'));
// if cart if empty, localStorage will give NULL
// !NULL = true;

if (!cart) {
  cart = [
    {
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2
    },
    {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1
    }
  ];
}

export function addToCart(productId) {
  const selectorElem = document.querySelector(`.js-quantity-selector-${productId}`);
  const quantity = Number(selectorElem.value);
  let matchingItem;
  
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingItem = cartItem;
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

  saveToStorage();
}


function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}


export function removeFromCart(productId) {

  /*
  // THIS WORKS TOO!!!
  let newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
      console.log(cartItem.productId);
    }
  });
  cart = newCart;
  */

  cart = cart.filter((cartItem) => cartItem.productId !== productId);
  saveToStorage();
}

export function calculateQuantity() {
  let caryQuantity = 0;

  cart.forEach((cartItem) => {
    caryQuantity += cartItem.quantity;
  });

  return caryQuantity;
}