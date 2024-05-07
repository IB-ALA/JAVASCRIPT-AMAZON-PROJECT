

export let products = [];

export function loadProducts(fun) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    products = JSON.parse(xhr.response).map(productDetails => {
      if (productDetails.type === 'clothing') {
        return new Clothing(productDetails);
      } else if (productDetails.type === 'appliance') {
        return new Appliance(productDetails);
      }
    
      return new Product(productDetails);
    });

    fun();
  })

  xhr.open('GET', 'https://sumpersimplebackend.dev/products');
  xhr.send();
}