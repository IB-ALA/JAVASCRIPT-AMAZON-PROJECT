import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
// 15f
import isWeekend from './functions.js';
// 15g
import { isWeekend as isSatSun } from './functions.js';

// CHALLENGE 15m
import { deliveryOptions, calculateDeliveryDate, getDeliveryOption } from '../data/deliveryOptions.js';



console.log('hello');
console.log(dayjs());

// 15a
const today = dayjs();
const fiveDaysAfterToday = today.add(5, 'days');
const fiveDaysAfterTodayString = fiveDaysAfterToday.format('MMMM, D');

console.log(fiveDaysAfterTodayString);



// 15b
const oneMonthAfterToday = today.add(1, 'months');
const oneMonthAfterTodayString = oneMonthAfterToday.format('MMMM, D');

console.log(oneMonthAfterTodayString);

// 15c
const oneMonthBeforeToday = today.subtract(1, 'months');
const oneMonthBeforeTodayString = oneMonthBeforeToday.format('MMMM, D');

console.log(oneMonthBeforeTodayString);

// 15d
const dayOfWeek = today.format('dddd');

console.log(dayOfWeek);

// 15e - 15f
/*
function isWeekend(date) {
  const dayOfWeek = date.format('dddd');
  dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday' ? console.log(`${dayOfWeek} is a weekend.`) : console.log(`${dayOfWeek} is a not weekend.`);
}
*/

isWeekend(today);
isWeekend(today.add(1, 'days'));
isWeekend(fiveDaysAfterToday);
isWeekend(oneMonthAfterToday);
isWeekend(oneMonthBeforeToday);

// 15g

isSatSun(today);
isSatSun(today.add(1, 'days'));
isSatSun(fiveDaysAfterToday);
isSatSun(oneMonthAfterToday);
isSatSun(oneMonthBeforeToday);

function isWeekend2(date) {
  const dayOfWeek = date.format('dddd');
  return dayOfWeek;
}

const deliveryOption = getDeliveryOption('2');
const dateString = calculateDeliveryDate(deliveryOption);

console.log(dateString);

function calculateDeliveryDate2(deliveryOption) {
  // const today = dayjs();
  const today = dayjs().add(2, 'days');
  let deliveryDate;
  let dateString;

  let deliveryDays = deliveryOption.deliveryDays;
  let daysCounted = deliveryDays;

  let i = 1;
  while (i <= daysCounted) {
    if (isWeekend2(today.add(i, 'days')) !== 'Saturday' && isWeekend2(today.add(i, 'days')) !== 'Sunday') {
      if (i === daysCounted) {
        deliveryDate = today.add(i, 'days');
        dateString = deliveryDate.format('dddd, MMMM D');
      }

      // i++;
    } 
    else {
      daysCounted++;
      // i++;
    }

    i++;
  }

  return dateString;
}
console.log(today.format('MMMM, dddd'));
calculateDeliveryDate2(deliveryOption);
console.log(calculateDeliveryDate2(deliveryOption));