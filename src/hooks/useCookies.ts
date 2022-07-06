import { useCookies } from "react-cookie";
import { useCallback, useEffect } from "react";
import cookie from "cookie";

export function useCookieHook(id: string) {
  const [myCookie, setCookie] = useCookies(["favouriteMarkets"]);
  const cookieData = cookie.parse(document.cookie);

  const isFavourite = useCallback(() => {
    const favouriteMarkets = cookieData.favouriteMarkets ? cookieData.favouriteMarkets : "";
    return favouriteMarkets.includes(id);
  }, [cookieData.favouriteMarkets, id]);

  const handleChangeFavourite = () => {
    let favouriteMarkets = cookieData.favouriteMarkets ? cookieData.favouriteMarkets : "";
    if (favouriteMarkets.includes(id))
      favouriteMarkets = favouriteMarkets.replace(`${id},`, " ");
    else favouriteMarkets += `${id},`;
    setCookie("favouriteMarkets", favouriteMarkets);
  };

  useEffect(() => {
    if (id) isFavourite();
  }, [id, isFavourite, myCookie]);

  return { handleChangeFavourite, isFavourite: isFavourite() };
}
