export const cart = [];

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