export const transFormErrorMessage = (message: string) => {
  const value = message?.toLowerCase();
  if (value.includes("ocex.proxylimitexceeded")) {
    return "You can't create more than three proxy accounts";
  }

  if (message.includes("ocex.mainaccountalreadyregistered")) {
    return "Account already registered";
  }

  return message;
};
