export default isWeekend;

export function isWeekend(date) {
  const dayOfWeek = date.format('dddd');
  dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday' ? console.log(`${dayOfWeek} is a weekend.`) : console.log(`${dayOfWeek} is a not weekend.`);
}