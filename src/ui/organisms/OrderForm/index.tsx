import * as S from "./styles";

import { Button, TabHeader, Tabs } from "src/ui/components";
import { OrderInput } from "src/ui/molecules";
import { FormEvent, useState } from "react";
import { useEffect } from "react";

export const OrderForm = () => {
  const [totalAmount, setTotalAmount] = useState<string | number>('');
  const [orderInput, setOrderInput] = useState({
    price: null,
    amount: null
  });

  useEffect(() => {
    if(orderInput.price && orderInput.amount){
      const total = Number(orderInput.price) * Number(orderInput.amount);
      setTotalAmount(total);
    }
    if(typeof orderInput.price === "string" && typeof orderInput.amount === "string") {
      if(!orderInput.price.trim() && !orderInput.amount.trim()){
        setTotalAmount("")
      } 
    }
  }, [orderInput]);


  const handleFormInput = (e: FormEvent<HTMLFormElement>) => {
    const {name, value} = e.target as any;
    setOrderInput({...orderInput, [name]: value});
  }

  return (
    <S.Wrapper>
      <Tabs>
        <S.Header>
          <TabHeader>
            <S.TabHeader>Limit</S.TabHeader>
          </TabHeader>
          <TabHeader>
            <S.TabHeader isMarket>Market</S.TabHeader>
          </TabHeader>
        </S.Header>
        <div>
          <form onChange={handleFormInput} onSubmit={() => console.log("Submit..")}>
            <OrderInput label="Price" name="price" placeholder="Price" />
            <OrderInput label="Amount" name="amount" placeholder="Amount" />
            <OrderInput label="Total" value={totalAmount} placeholder="Total" disabled />
            <Button
              title="Log in"
              style={{ width: "100%", justifyContent: "center" }}
              background="secondaryBackground"
            />
          </form>
        </div>
      </Tabs>
    </S.Wrapper>
  );
};
