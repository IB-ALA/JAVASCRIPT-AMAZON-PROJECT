// 18a
const xhr = new XMLHttpRequest();

xhr.addEventListener('load', () => {
  console.log(xhr.response);
});

xhr.open('GET', 'https://supersimplebackend.dev/greeting');
xhr.send();


// 18b
fetch('https://supersimplebackend.dev/greeting')
.then(response => {
  response.text().then(value => {
    console.log(value);
  })
})

// 18c
async function greeting() {
  const response = await fetch('https://supersimplebackend.dev/greeting');
  const data = response.text();
  console.log(data);
}


// 18d
async function greetingWithName(name) {
  const response = await fetch('https://supersimplebackend.dev/greeting', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name
    })
  });

  const data = await response.text();
  console.log(data);
  

  /*
  const response = await fetch('https://supersimplebackend.dev/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      cart: cart.cartItems
    })
  });
  */
}
greetingWithName('IBALA');


//18e - 18f
async function requestAmazon() {
  try {
    const response = await fetch('https://amazon.com');
    const data = response.text();
    console.log(data);
  } catch (error) {
    console.log('CORS error. Your request was blocked by the backend: ', error);
  }
} 
requestAmazon();



//18g
async function name(params) {
  try {
    const response = await fetch('https://supersimplebackend.dev', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.status >= 400) {
      throw response;
    }
  } catch (error) {
    if (error.status === 400) {
      const err = await error.json();
      console.log(err);
    } else {
      console.log('Network error. Please try again later.');
    }
  }
}