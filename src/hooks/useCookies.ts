import { useCookies } from "react-cookie";
import cookie from "cookie";

export function useCookieHook(id: string) {
  const [myCookie, setCookie] = useCookies(["favouriteMarkets"]);
  const cookieData = cookie.parse(document.cookie);

  const handleChangeFavourite = () => {
    let favouriteMarkets = cookieData.favouriteMarkets ? cookieData.favouriteMarkets : "";
    if (favouriteMarkets.includes(id))
      favouriteMarkets = favouriteMarkets.replace(`${id},`, " ");
    else favouriteMarkets += `${id},`;
    setCookie("favouriteMarkets", favouriteMarkets);
  };

  return { handleChangeFavourite };
}
