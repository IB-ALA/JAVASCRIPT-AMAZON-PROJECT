export const cart = [
  {
    id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2
  },
  {
    id: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1
  }
];

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
}