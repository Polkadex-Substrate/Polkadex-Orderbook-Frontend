import Button from "../Button";
import Input from "../Input";
import Link from "../Link";
import Range from "../Range";

import * as S from "./styles";

import { Dropdown, Icon } from "@polkadex/orderbook-ui/molecules";

export type MarketOrderActionProps = {
  type?: "Sell" | "Buy";
};
const MarketOrderAction = ({ type = "Buy" }: MarketOrderActionProps) => (
  <S.WrapperOrder>
    <S.ContainerWallet>
      <Icon name="Wallet" background="secondaryBackground" size="extraLarge" stroke="white" />
      <S.WrapperBalance>
        <span>Available</span>
        <S.Span>0.93871332 DOT</S.Span>
      </S.WrapperBalance>
    </S.ContainerWallet>
    <S.ContainerForm>
      <form onSubmit={() => console.log("Submiting..")}>
        <Input
          label="Price"
          icon="ArrowVerticalTop"
          placeholder="0.0000000"
          type="text"
          inputInfo="BTC"
          fullWidth={true}
        />
        <Input
          label="Amount"
          icon="ArrowVerticalBottom"
          placeholder="0.0000000"
          type="text"
          inputInfo="DOT"
          fullWidth={true}
        />
        <S.WrapperActions>
          <p>
            Equivalent ~<span> $92.54</span>
          </p>
          <Dropdown title="Fee 0.0001 BTC">
            <Link title="Custom Fee" />
          </Dropdown>
        </S.WrapperActions>
        <Range />
        <Button type="button" title={type} fullWidth={true} />
      </form>
    </S.ContainerForm>
  </S.WrapperOrder>
);

export default MarketOrderAction;
