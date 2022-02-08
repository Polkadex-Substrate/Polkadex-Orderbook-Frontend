import * as S from "./styles";
import * as T from "./types";

import { Icon } from "@polkadex/orderbook-ui/molecules";
import { useDeveloper } from "@polkadex/orderbook/v2/hooks";
import { defaultConfig } from "@polkadex/orderbook-config";

export const DeveloperContent = () => {
  const { funds, hasUser, wallet } = useDeveloper();

  return (
    <S.Main>
      <S.Header>
        <h2>Orderbook Status</h2>
      </S.Header>
      <S.Wrapper>
        <S.Information>
          <li>No Issues</li>
          <li>Outage</li>
          <li>Incident</li>
        </S.Information>
        <S.Content>
          <Card
            title="Connect to test Wallet"
            status={wallet.success ? "success" : "error"}
            buttonOnClick={wallet.connectTestWallet}
            buttonTitle={hasUser ? "Disconnect Wallet" : "Connect Wallet"}
            isLoading={wallet.loading}
            error={wallet.error}
            textFiled={[
              { label: "Address", props: { value: wallet.address, disabled: true } },
              { label: "Password", props: { value: wallet.password, disabled: true } },
            ]}
            url=""
          />
          <Card
            title="Get free balance"
            status={funds.success ? "success" : "error"}
            endpoint="/test_deposit"
            buttonOnClick={funds.requestFunds}
            buttonDisabled={!hasUser}
            buttonTitle={
              !hasUser
                ? "Wallet Disconnected"
                : funds.success
                ? "Request More Funds"
                : "Request Funds"
            }
            isLoading={funds.loading}
            error={funds.error}
            textFiled={[
              { label: "Request Amount", props: { value: funds.value, disabled: true } },
            ]}
          />
        </S.Content>
      </S.Wrapper>
    </S.Main>
  );
};

const Card = ({
  title,
  buttonTitle = "Try Again",
  buttonOnClick,
  buttonDisabled = false,
  endpoint = "",
  status = "noStatus",
  url = defaultConfig.polkadexHostUrl,
  isLoading = false,
  error = "",
  textFiled = [],
}: T.Props) => {
  const statusColor = {
    success: "green",
    error: "primary",
    incident: "orange",
    noStatus: "none",
  };

  return (
    <S.Card statusColor={statusColor[status]}>
      <S.CardHeader>
        <S.CardHeaderWrapper>
          <span>{title}</span>
          <button onClick={buttonOnClick} disabled={buttonDisabled}>
            {isLoading ? "Loading.." : buttonTitle}
          </button>
        </S.CardHeaderWrapper>
        <p>
          {url}
          {endpoint}
        </p>
      </S.CardHeader>
      {!!textFiled.length &&
        textFiled.map((field, i) => (
          <S.CardContent key={i}>
            <label htmlFor={i.toString()}>{field.label}</label>
            <input id={i.toString()} type="text" {...field.props} />
          </S.CardContent>
        ))}
      {error && <p>{error}</p>}
    </S.Card>
  );
};
export const DeveloperHeader = () => (
  <S.DeveloperHeader>
    <span>
      <Icon name="Settings" size="extraSmall" />
      Developer Options
    </span>
  </S.DeveloperHeader>
);
