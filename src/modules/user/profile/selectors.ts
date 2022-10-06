import { RootState, SelectedAccount } from "../../";

export const selectShouldShowInitialBanner = (state: RootState): boolean =>
  state.user.profile.authInfo.shouldShowInitialBanner;

export const selectIsUserSignedIn = (state: RootState): boolean => {
  return state.user.profile.authInfo.isAuthenticated;
};
export const selectIsUserVerified = (state: RootState): boolean => {
  return state.user.profile.authInfo.isConfirmed;
};

export const selectUserAuthFetching = (state: RootState): boolean =>
  state.user.profile.isAuthFetching;

export const selectUserAuthFetchSuccess = (state: RootState): boolean | undefined =>
  state.user.profile.isAuthSuccess;

export const selectUserEmail = (state: RootState): string => state.user.profile.authInfo.email;

export const selectUsingAccount = (state: RootState): SelectedAccount =>
  state.user.profile.selectedAccount;

export const selectHasSelectedAccount = (state: RootState): boolean =>
  state.user.profile.selectedAccount.selectedTradeAddress !== "";

export const selectLinkedMainAddresses = (state: RootState): string[] =>
  state.user.profile.userData.mainAccounts;

export const selectIsMainAddressRegistered =
  (address: string) =>
  (state: RootState): boolean =>
    address && state.user.profile.userData.mainAccounts.includes(address);

// gives back all the linked trade addresses for a given main address
export const selectAssociatedTradeAddresses = (mainAddress: string) => {
  return (state: RootState): string[] => {
    const userAccounts = state.user.profile.userData.userAccounts;
    const accounts = userAccounts.filter((account) => account.mainAddress === mainAddress);
    return accounts.map((account) => account.tradeAddress);
  };
};

export const selectIsUserDataLoading = (state: RootState): boolean =>
  state.user.profile.isDataLoading;
