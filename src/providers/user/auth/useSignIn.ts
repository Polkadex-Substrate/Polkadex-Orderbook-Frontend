import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";

import { defaultConfig } from "@polkadex/orderbook-config";
import { Context } from "./context";

export const useSignIn = () => {
  const router = useRouter();
  const state = useContext(Context);

  if (!Context) {
    const error = new Error("Auth context is undefined");
    error.name = "ContextError";
    Error?.captureStackTrace?.(error, useContext);
    throw error;
  }

  const loading = state.auth.isLoading;
  const isSuccess = state.auth.isSuccess;
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
      // Will be called when profile context will created
      // dispatch(userChangeInitBanner(true));
      router.push("/trading/" + defaultConfig.landingPageMarket);
    }
  }, [isAuthenticated, isSuccess, router]);

  return { ...state };
};
