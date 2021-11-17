import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentMarket, depthFetch } from "@polkadex/orderbook-modules";

export const useDepthMarketsFetch = () => {
  const dispatch = useDispatch();
  const currentMarket = useSelector(selectCurrentMarket);

  useEffect(() => {
    if (currentMarket) dispatch(depthFetch(currentMarket));
  }, [currentMarket, dispatch]);
};
