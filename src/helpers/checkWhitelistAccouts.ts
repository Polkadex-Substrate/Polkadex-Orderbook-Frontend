import { whitelistedUsers } from "../constants/whitelisted_users";

export const checkIfWhitelisted = (mnemonic: string) => {
  const idx = whitelistedUsers.findIndex((elem) => {
    return elem.mnemonic === mnemonic;
  });
  return idx !== -1;
};
