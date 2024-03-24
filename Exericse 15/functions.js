export default isWeekendd;

export function isWeekendd(date) {
  const dayOfWeek = date.format('dddd');
  return dayOfWeek;
  dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday' ? console.log(`${dayOfWeek} is a weekend.`) : console.log(`${dayOfWeek} is a not weekend.`);
}