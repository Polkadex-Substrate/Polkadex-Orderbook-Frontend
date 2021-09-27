import { useReduxSelector } from "src/hooks"
import { selectCurrentMarket } from "src/modules"

export const usePlaceOrder = () => {

    // get the current market
    const currentMarket = useReduxSelector(selectCurrentMarket);


    return {
        currentMarket
    }
}