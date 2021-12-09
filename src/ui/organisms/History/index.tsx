import * as S from "./styles";
import * as T from "./types";

import { Dropdown } from "@polkadex/orderbook-ui/molecules";

export const History = () => {
  return (
    <S.Wrapper>
      <S.Title>
        <h2>History</h2>
        <Dropdown header="All">
          <p>testing</p>
        </Dropdown>
      </S.Title>
      <S.Content>
        <Card
          date="10 minutes ago"
          address="19BY2XCgbDe6WtTVbTyzM9eR3LYr6VitWK"
          txid="0xjkjkjkBYk2kklXCgbDe6WtTVbTyasdasfggfgfgl454545"
          amount={74.01}
          amountInFiat={0.0}
        />
        <Card
          date="10 minutes ago"
          address="19BY2XCgbDe6WtTVbTyzM9eR3LYr6VitWK"
          txid="0xjkjkjkBYk2kklXCgbDe6WtTVbTyasdasfggfgfgl454545"
          amount={74.01}
          amountInFiat={0.0}
        />
        <Card
          date="10 minutes ago"
          address="19BY2XCgbDe6WtTVbTyzM9eR3LYr6VitWK"
          txid="0xjkjkjkBYk2kklXCgbDe6WtTVbTyasdasfggfgfgl454545"
          amount={74.01}
          amountInFiat={0.0}
        />
        <Card
          date="10 minutes ago"
          address="19BY2XCgbDe6WtTVbTyzM9eR3LYr6VitWK"
          txid="0xjkjkjkBYk2kklXCgbDe6WtTVbTyasdasfggfgfgl454545"
          amount={74.01}
          amountInFiat={0.0}
        />
        <Card
          date="10 minutes ago"
          address="19BY2XCgbDe6WtTVbTyzM9eR3LYr6VitWK"
          txid="0xjkjkjkBYk2kklXCgbDe6WtTVbTyasdasfggfgfgl454545"
          amount={74.01}
          amountInFiat={0.0}
        />
      </S.Content>
    </S.Wrapper>
  );
};

export const Card = ({ date, address, txid, amount, amountInFiat = 0.0 }: T.HistoryProps) => (
  <a href={`/transaction/${txid}`}>
    <S.Card>
      <div>
        <span>{date}</span>
        <p>~{address}</p>
      </div>
      <S.Aside>
        <span>{amount}</span>
        <p>~{amountInFiat} USD</p>
      </S.Aside>
    </S.Card>
  </a>
);
