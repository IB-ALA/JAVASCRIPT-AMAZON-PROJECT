import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
// 15f
import isWeekend from './functions.js';
// 15g
import { isWeekend as isSatSun } from './functions.js';



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



