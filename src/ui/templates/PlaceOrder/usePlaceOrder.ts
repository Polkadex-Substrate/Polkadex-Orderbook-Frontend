import { useReduxSelector } from "src/hooks"
import { selectCurrentMarket, selectUserInfo } from "src/modules"

export const usePlaceOrder = () => {
    // get the current market
    const currentMarket = useReduxSelector(selectCurrentMarket);
    const userInfo = useReduxSelector(selectUserInfo);


    return {
        currentMarket,
        userInfo
    }
}