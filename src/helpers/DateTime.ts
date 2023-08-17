export function subtractMonthsFromDateOrNow(numOfMonths: number, date = new Date()): Date {
  date.setMonth(date.getMonth() - numOfMonths);
  return date;
}
