import { PropsWithChildren, ReactNode, createContext, useState } from "react";

type OrderState = {
  price: string;
  amount: string;
  total: string;
  onSetPrice: (payload: string) => void;
  onSetAmount: (payload: string) => void;
  onSetTotal: (payload: string) => void;
};

export const OrdersProvider = ({ children }: { children: ReactNode }) => {
  const [price, setPrice] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [total, setTotal] = useState<string>("");

  const onSetPrice = (payload: string) => setPrice(payload);
  const onSetAmount = (payload: string) => setAmount(payload);
  const onSetTotal = (payload: string) => setTotal(payload);

  return (
    <Provider
      value={{
        price,
        amount,
        total,
        onSetPrice,
        onSetAmount,
        onSetTotal,
      }}
    >
      {children}
    </Provider>
  );
};

export const Context = createContext<OrderState>({
  price: "",
  amount: "",
  total: "",
  onSetPrice: () => {},
  onSetAmount: () => {},
  onSetTotal: () => {},
});

const Provider = ({
  value,
  children,
}: PropsWithChildren<{ value: OrderState }>) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { useOrders } from "./useOrders";
