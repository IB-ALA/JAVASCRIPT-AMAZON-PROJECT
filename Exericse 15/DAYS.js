import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import isWeekendd from './functions.js';



function addWeekdays(date, numDays) {
  let count = 0;
  let current = date.clone();

  while (count < numDays) {
    current = current.add(1, 'day');

    if (current.day() !== 0 && current.day() !== 6) {
      count++;
    }
  }

  return current;
}

const today = dayjs();
const modifiedDate = addWeekdays(today, 1);
console.log(dayjs().format('dddd'))
console.log(modifiedDate.format('dddd'));

console.log(today.format('dddd'));


function calculateDeliveryDate2(deliveryDays) {
  // const today = dayjs();
  let today = dayjs().subtract(2, 'days');
  let dateString;

  // let deliveryDays = deliveryOption.deliveryDays;

  let weekdayCounted = 0;
  while (weekdayCounted < deliveryDays) {
    today = today.add(1, 'days');
    let deliveryDate = today;
    dateString = deliveryDate.format('dddd, MMMM D')
    if (isWeekendd(today) !== 'Saturday' && isWeekendd(today) !== 'Sunday') {
      weekdayCounted++;
      console.log(dateString);
      console.log(`Delivery day: ${weekdayCounted}`);
    } else {
      console.log(dateString);
    }
  }

  // let deliveryDate = today;
  // dateString = deliveryDate.format('dddd, MMMM D')

  // return dateString;
}
// console.log(calculateDeliveryDate2(1));
calculateDeliveryDate2(2);



function countWeekends(endDate) {
  let weekends = [];
  const today = dayjs();
  
  let startDate = today.clone();
  while (startDate.format('YYYY-MM-DD') !== endDate) {
    let newDate = startDate.add(1, 'days');
    if (newDate.format('dddd') === 'Saturday' || newDate.format('dddd') === 'Sunday') {
      const weekend = newDate.format('dddd, YYYY-MM-DD');
      weekends.push(` ${weekend}`);
    }

    startDate = startDate.add(1, 'days');
  }

  console.log(`There are ${weekends.length} weekends between ${today.format('YYYY-MM-DD')} and ${endDate}.
  They are ${weekends}`);
}

// console.log(calculateDeliveryDate2(1));
// countWeekends('2024-04-24');


// REVERTING
let now = '2024-03-02';
const nowInDayjs = dayjs(now);

console.log(nowInDayjs.add(1, 'years').format('YYYY-MM-DD'));


function findWeekendsBtnDates(startDate, endDate) {
  let weekends = [];
  let startingDate = dayjs(startDate);
  
  while (startingDate.format('YYYY-MM-DD') !== endDate) {
    let newDate = startingDate.add(1, 'days');
    if (newDate.format('dddd') === 'Saturday' || newDate.format('dddd') === 'Sunday') {
      const weekend = newDate.format('dddd, YYYY-MM-DD');
      weekends.push(` ${weekend}`);
    }

    startingDate = startingDate.add(1, 'days');
  }

  console.log(`There are ${weekends.length} weekends between ${startDate} and ${endDate}.
  They are ${weekends}`);
}
// findWeekendsBtnDates('2024-03-24', '2024-04-24');


function findNoOfDaysBefore(endDate) {
  let today = dayjs();

  let noOfDays = 0;
  while (today.format('YYYY-MM-DD') !== endDate) {
    if (today.format('YYYY-MM-DD') !== endDate) {
      noOfDays++;
      today = today.add(1, 'days');
    }
  }

  let message;
  const lastDay = dayjs(endDate).format('dddd, MMMM D YYYY');
  if (noOfDays === 1) {
    message = `${lastDay} is tomorrow`;
  } else {
    message = `${lastDay} is ${noOfDays} days from today`;
  }
  console.log(message);
}
// findNoOfDaysBefore('2024-03-26');


function run() {
  const time = today.format('HH:mm:ss');
  console.log(time);
  const targetTime = dayjs('2024-03-24 11:35:00');
  // console.log(targetTime);
  // const timeDiff = targetTime.diff(dayjs());
  // console.log(timeDiff);

  const interval = setInterval (() => {
    const currentTime = dayjs();
    const remainingTime = targetTime.diff(currentTime);
    const timeDiff = targetTime.diff(dayjs());


    // if (remainingTime <= 10) {
    //   console.log("It's time to perform task");
    //   clearInterval(interval);
    // } else {
    //   console.log(timeDiff)
    // }
    if (targetTime.format('HH:mm:ss') ===  currentTime.format('HH:mm:ss')) {
      console.log("It's time to perform task");
      clearInterval(interval);
      document.body.innerText = "It's time to perform task";
    } else {
      console.log(timeDiff);
      console.log(currentTime.format('HH:mm:ss:SSS'));

      document.body.innerText = currentTime.format('HH:mm:ss:SSS');

    }
  }, 1);
}
// run();

console.log('hi');

function timer(time) {
  // const timeSet = dayjs(time);
  // const now = dayjs();

  const interval = setInterval(() => {
    const timeSet = dayjs(time);
    const now = dayjs();

    if (now.format('HH:mm:ss') === timeSet.format('HH:mm:ss')) {
      console.log('time up');
      clearInterval(interval);
    }
  }, 1);
}
// timer('2024-03-24 11:55:00');
// timer('2024-03-24 11:54:40');


// const time = '2024-03-24 11:35:00';
// console.log(dayjs(time).format('HH:mm:ss'));