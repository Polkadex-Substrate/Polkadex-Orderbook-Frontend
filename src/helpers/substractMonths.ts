export function subtractMonths(numOfMonths, date = new Date()): Date {
  date.setMonth(date.getMonth() - numOfMonths);
  return date;
}

export function addDay(days, data = new Date()): Date {
  data.setDate(data.getDate() + days);
  return data;
}
