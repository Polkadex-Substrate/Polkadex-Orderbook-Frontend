import { Field } from "formik";

import * as S from "./styles";

import { Dropdown, Icon, IconToken, Skeleton } from "src/ui";

export const AmountInput = ({ data = [], error = "", ...props }) => (
  <S.Wrapper>
    <S.Header>
      <Dropdown
        direction="bottom"
        style={{ width: "100%" }}
        title={<TokenCard tokenName="Polkadex" ticket="PDEX" amount="0" />}>
        <S.TokensWrapper>
          {data.length ? (
            data.map((item, index) => (
              <TokenCard
                key={index}
                tokenName={item.name}
                ticket={item.ticket}
                amount={item.amount}
                onClick={() => console.log("...")}
              />
            ))
          ) : (
            <Loading />
          )}
        </S.TokensWrapper>
      </Dropdown>
    </S.Header>
    <S.Content>
      <S.Column>
        <Field {...props} />
        {error && error}
        <div>
          <button>MAX</button>
          <span>PDEX</span>
        </div>
      </S.Column>
      <S.Column>
        <span>~ 0.00</span>
        <span>USD</span>
      </S.Column>
    </S.Content>
  </S.Wrapper>
);

const TokenCard = ({ tokenName = "", ticket = "", amount = "", ...props }) => (
  <S.Card {...props}>
    {ticket ? (
      <IconToken size="medium" icon={ticket} />
    ) : (
      <Skeleton width="3rem" height="3rem" />
    )}

    <S.CardContent>
      {tokenName ? (
        <S.CardFlex>
          <span>{tokenName}</span>
          <Icon icon="ArrowBottom" size="xxsmall" />
        </S.CardFlex>
      ) : (
        <Skeleton width="4rem" />
      )}
      {amount ? (
        <p>
          Available: <strong>{amount}</strong>
        </p>
      ) : (
        <Skeleton width="12rem" style={{ marginTop: 4 }} />
      )}
    </S.CardContent>
  </S.Card>
);

const Loading = () => (
  <>
    <TokenCard />
    <TokenCard />
    <TokenCard />
  </>
);
