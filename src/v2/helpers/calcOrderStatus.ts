export const calcStatusOfOrder = (status: string) => {
  switch (status) {
    case "ACCEPTED":
      return "OPEN";
    case "FILLED":
      return "CLOSED";
    case "PARTIALLYFILLED":
      return "PARTIAL";
    case "CANCELLED":
      return "CANCELLED";
    default:
      return "";
  }
};
