import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export const deliveryOptions = [
  {
    id: '1',
    deliveryDays: 7,
    priceCents: 0
  },
  {
    id: '2',
    deliveryDays: 3,
    priceCents: 499
  },
  {
    id: '3',
    deliveryDays: 1,
    priceCents: 999
  }
];

export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (deliveryOptionId === option.id) {
      deliveryOption = option;
    }
  });

  return deliveryOption;
}

export function calculateDeliveryDate(deliveryOption) {
  const deliveryDays = deliveryOption.deliveryDays;
  const today = dayjs();
  let deliveryDate;
  let dateString;


  let daysCounted = deliveryDays;

  let i = 1;
  while (i <= daysCounted) {
    if (isAWeekend(today.add(i, 'days')) !== 'Saturday' && isAWeekend(today.add(i, 'days')) !== 'Sunday') {
      if (i === daysCounted) {
        deliveryDate = today.add(i, 'days');
        dateString = deliveryDate.format('dddd, MMMM D');
      }
    } else {
      daysCounted++;
    }

    i++;
  }

  return dateString;
}

function isAWeekend(date) {
  const dayOfWeek = date.format('dddd');
  return dayOfWeek;
}

export function MMMMDDDateFormat(date) {
  // const today = dayjs();
  return dayjs(date).format('MMMM DD');
}


// CALCULATES DATES WITH WEEKENDS!
/*
export function calculateDeliveryDate(deliveryOption) {
  const today = dayjs();
  const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
  const dateString = deliveryDate.format('dddd, MMMM D');

  return dateString;
}
*/

