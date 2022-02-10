import * as S from "./styles";
import * as T from "./types";

import { Icon } from "@polkadex/orderbook-ui/molecules";
import { useDeveloper } from "@polkadex/orderbook/v2/hooks";
import { defaultConfig } from "@polkadex/orderbook-config";

export const DeveloperContent = () => {
  const { funds, hasUser, wallet, notifications } = useDeveloper();

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
              {
                label: "Address",
                isSelect: true,
                options: wallet.options,
                selectProps: {
                  name: "address",
                  value: wallet.address,
                  onChange: wallet.onChange,
                },
              },
              {
                label: "Password",
                inputProps: {
                  name: "password",
                  value: wallet.password,
                  placeholder: "Enter your password",
                  onChange: wallet.onChange,
                },
              },
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
              {
                label: "Request Amount",
                inputProps: {
                  name: "amount",
                  value: funds.amount,
                  onChange: funds.onChange,
                },
              },
            ]}
          />
          <Card
            title="Test Notifications"
            status={notifications.success ? "success" : "error"}
            buttonOnClick={notifications.sendNotification}
            buttonTitle={"Send Notification"}
            textFiled={[
              {
                label: "Nº Notifications",
                inputProps: {
                  name: "repeatNumber",
                  value: notifications.repeatNumber,
                  onChange: notifications.onChange,
                },
              },
              {
                label: "Notifications Time(seconds)",
                inputProps: {
                  name: "repeatTime",
                  value: notifications.repeatTime,
                  onChange: notifications.onChange,
                },
              },
            ]}
            url=""
          />
          <Card
            title="Test Error"
            status={notifications.success ? "success" : "error"}
            buttonOnClick={notifications.sendNotification}
            buttonTitle={"Send Error"}
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
      {textFiled.length &&
        textFiled.map(
          ({ isSelect = false, label, options = [], selectProps, inputProps }, i) => {
            return (
              <S.CardContent key={i}>
                <label htmlFor={i.toString()}>{label}</label>
                {isSelect ? (
                  <select id={i.toString()} {...selectProps}>
                    <option value="Choose an option">Choose an option</option>
                    {!!options.length &&
                      options.map((val, index) => (
                        <option key={index} value={val.address}>
                          {val.address}
                        </option>
                      ))}
                  </select>
                ) : (
                  <input id={i.toString()} type="text" {...inputProps} />
                )}
              </S.CardContent>
            );
          }
        )}
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
