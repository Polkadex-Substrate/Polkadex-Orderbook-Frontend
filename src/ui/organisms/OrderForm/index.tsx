import * as S from "./styles";

import { Button, TabHeader, Tabs } from "src/ui/components";
import { OrderInput } from "src/ui/molecules";
import { FormEvent, useState } from "react";
import { useEffect } from "react";
import { useP2P } from "src/ui/templates/PlaceOrder/useP2P";
import { cleanPositiveFloatInput, precisionRegExp } from "src/helpers";
import { useDispatch } from "react-redux";
import { placeOrdersExecute } from "src/modules/user/placeOrders";

export const OrderForm = () => {
  const [totalAmount, setTotalAmount] = useState<string | number>('');
  const [orderInput, setOrderInput] = useState({
    price: null,
    amount: null
  });
  
  const dispatch = useDispatch();
  const {currentMarket} = useP2P()

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
    let precision = 4;
    const convertedValue = cleanPositiveFloatInput(value);
    if(name === 'amount') {
      precision = currentMarket?.amount_precision;
    }
    else {
      precision = currentMarket?.price_precision;
    }
    if(convertedValue.match(precisionRegExp(precision))){      
      setOrderInput({...orderInput, [name]: convertedValue});
    }
  }

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // call the place order 
    // dispatch(placeOrdersExecute())
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
          <form onChange={handleFormInput} onSubmit={handleFormSubmit}>
            <OrderInput label="Price" name="price" placeholder="Price" token={currentMarket?.base_unit.toUpperCase()} />
            <OrderInput label="Amount" name="amount" placeholder="Amount" token={currentMarket?.quote_unit.toUpperCase()} />
            <OrderInput label="Total" value={totalAmount} placeholder="Total" token={currentMarket?.base_unit.toUpperCase()} disabled />
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
