export const Utils = {
  date: {
    formatDateToISO(date: Date | string | number): string {
      if (date instanceof Date) {
        return date.toISOString();
      }
      return new Date(date).toISOString();
    },
  },
};

export function decimalPlaces(num: number | string) {
  var match = ("" + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
  if (!match) {
    return 0;
  }
  return Math.max(
    0,
    // Number of digits right of decimal point.
    (match[1] ? match[1].length : 0) -
      // Adjust for scientific notation.
      (match[2] ? +match[2] : 0)
  );
}

export const setCookie = (name: string, value: string, days: number) => {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
};
export const getCookie = (name: string) => {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};
export const eraseCookie = (name: string) => {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
};

export const getDigitsAfterDecimal = (value: number | string) => {
  const amountStr = String(value);
  return amountStr.includes(".") ? amountStr.split(".")[1].length : 0;
};

export const hasOnlyZeros = (floatString: string): boolean => {
  const floatValue = parseFloat(floatString);
  const integerValue = parseInt(floatString, 10);

  return floatValue === integerValue;
};
