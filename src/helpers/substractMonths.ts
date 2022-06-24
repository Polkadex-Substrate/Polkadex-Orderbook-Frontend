export function subtractMonths(numOfMonths, date = new Date()): Date {
  date.setMonth(date.getMonth() - numOfMonths);
  return date;
}
