import { PropsWithChildren, ReactNode, createContext, useState } from "react";

type OrderState = {
  price: string;
  amount: string;
  onSetPrice: (payload: string) => void;
  onSetAmount: (payload: string) => void;
};

export const OrdersProvider = ({ children }: { children: ReactNode }) => {
  const [price, setPrice] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const onSetPrice = (payload: string) => setPrice(payload);
  const onSetAmount = (payload: string) => setAmount(payload);

  return (
    <Provider
      value={{
        price,
        amount,
        onSetPrice,
        onSetAmount,
      }}
    >
      {children}
    </Provider>
  );
};

export const Context = createContext<OrderState>({
  price: "",
  amount: "",
  onSetPrice: () => {},
  onSetAmount: () => {},
});

const Provider = ({
  value,
  children,
}: PropsWithChildren<{ value: OrderState }>) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { useOrders } from "./useOrders";
