export function subtractMonthsFromDateOrNow(numOfMonths: number, date = new Date()): Date {
  date.setMonth(date.getMonth() - numOfMonths);
  return date;
}

export function addDayFromDateOrNow(days: number, data = new Date()): Date {
  data.setDate(data.getDate() + days);
  return data;
}

export function addHoursFromDateOrNow(hours: number, data = new Date()): Date {
  data.setHours(data.getHours() + hours);
  return data;
}
