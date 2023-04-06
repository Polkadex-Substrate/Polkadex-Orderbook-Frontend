import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { signInFetch } from "../modules/user/auth";

import { defaultConfig } from "@polkadex/orderbook-config";
import { useAuth } from "@polkadex/orderbook/providers/user/auth";
import { useProfile } from "@polkadex/orderbook/providers/user/profile";

export const useSignIn = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const profileState = useProfile();
  const {
    signin: { isLoading: loading, isSuccess },
  } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const getIsAuthenticated = async () => {
    try {
      const { attributes } = await Auth.currentAuthenticatedUser();
      if (attributes.email) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getIsAuthenticated();
  }, []);

  useEffect(() => {
    if (isSuccess || isAuthenticated) {
      profileState.onUserChangeInitBanner(true);
      router.push("/trading/" + defaultConfig.landingPageMarket);
    }
  }, [isAuthenticated, isSuccess, router, dispatch]);

  const signIn = (email: string, password: string) => {
    dispatch(signInFetch({ email: email.toLowerCase(), password }));
  };

  return { signIn, loading };
};
