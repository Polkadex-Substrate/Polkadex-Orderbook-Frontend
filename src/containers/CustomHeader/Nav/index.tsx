import React, { useCallback, useEffect, useState, useMemo} from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from "react-redux";
import {
  CustomButton,
  CustomDropdown,
  CustomIcon,
  CustomInputWalletPolkadex,
  CustomSignForm,
  Spinner,
  TabContent,
  TabHeader,
  Tabs,
  formatWithSeparators,
  Decimal,
  CustomThemeSwitch
} from "src/components";
import { useReduxSelector, useSignWithPolkadotJs } from "src/hooks";
import { logoutFetch, changeLanguage, changeUserDataFetch, selectCurrentLanguage, selectCurrencies, selectWallets, Wallet, selectMarkets, selectMarketTickers, selectWalletsLoading, selectUserInfo, selectUserLoggedIn } from 'src/modules';
import { VALUATION_PRIMARY_CURRENCY, VALUATION_SECONDARY_CURRENCY } from 'src/constants';
import { estimateUnitValue, estimateValue } from 'src/helpers/estimateValue';
import * as S from "./styles";
import { WalletProps, LanguageNameProps } from "./types";
import { languages } from 'src/api/config';

interface ExtendedWallet extends Wallet {
  spotBalance?: string;
  spotLocked?: string;
}

const Nav = () => {
  const { fetchPolkadotJs, loading, error } = useSignWithPolkadotJs();
  const user = useReduxSelector(selectUserInfo);
  const isLoggedIn = useReduxSelector(selectUserLoggedIn);
  const lang = useReduxSelector(selectCurrentLanguage)
  const dispatch = useDispatch();

  const handleChangeLanguage = (language: string) => {
    if (isLoggedIn) {
        const data = user.data && JSON.parse(user.data);

        if (data && data.language && data.language !== language) {
            const payload = {
                ...user,
                data: JSON.stringify({
                    ...data,
                    language,
                }),
            };
            dispatch(changeUserDataFetch({ user: payload }));
        }
    }
    dispatch(changeLanguage(language));
}; 

  return (
    <S.Wrapper>
       <S.Container>
        <button type="button" onClick={()=> console.log("Notiifcaitons")}>
            <CustomIcon icon="Notifications" background="none" />
          </button>
      </S.Container>
      <S.Container>
        <CustomDropdown direction="bottom" isOpacity title={<CustomIcon icon="Language" />}>
          <LanguageContent changeLanguage={handleChangeLanguage} currentLanguage={lang}/>
        </CustomDropdown>
      </S.Container>
      <S.Container>
        <CustomThemeSwitch />
      </S.Container>
      {isLoggedIn && !!user ? (
        <CustomDropdown
          isOpacity
          direction="bottom"
          title={<MyWalletHeader user={user} />}
          style={{width: 'min-content'}}
        >
          <S.MyWallet>
            <MyWalletHeader user={user} />
            <MyWalletContent
              user={user}
              disconnect={() => dispatch(logoutFetch())}
            />
          </S.MyWallet>
        </CustomDropdown>
      ) : (
        <ConnectWallet
          action={fetchPolkadotJs}
          error={error}
          loading={loading}
        />
      )}
    </S.Wrapper>
  );
};

export const MyWalletHeader = ({ user }: WalletProps) => {
    const wallets = useReduxSelector(selectWallets) || [];
    const currencies = useReduxSelector(selectCurrencies);
    const markets = useReduxSelector(selectMarkets);
    const tickers = useReduxSelector(selectMarketTickers);
    const [mergedWallets, setMergedWallets] = useState<Wallet[]>([]);

    useEffect(() => {
      if (wallets.length && currencies.length) {
          const merged = currencies.map(cur => {
              const spotWallet = wallets.find(i => i.currency === cur.id);
              return {
                  ...spotWallet,
                  balance: String(+(spotWallet?.balance || 0)),
                  locked: String(+(spotWallet?.locked || 0)),
              };
          });

          setMergedWallets(merged);
      }
  }, [wallets, currencies]);

    const estimatedValue = useMemo(() => {
      return estimateValue(VALUATION_PRIMARY_CURRENCY, currencies, mergedWallets, markets, tickers);
  }, [currencies, mergedWallets, markets, tickers]);


  return (
    <S.MyWalletHeaderWrapper>
      <S.MyWalletHeader>
        <CustomIcon icon="Avatar" size="medium"/>
        <div>
          <S.WalletUsername>Account 1 (0x9e08..1641)</S.WalletUsername>
          <p>Estimated: ≈ $ {formatWithSeparators(estimatedValue, ',')}</p>
        </div>
      </S.MyWalletHeader>
    </S.MyWalletHeaderWrapper>
  );
};

export const MyWalletContent = ({ user, disconnect }: WalletProps) => {
  return (
    <S.MyWalletContent>
      <S.MyWalletBoxWrapper>
        <div>
          <a href="/">
          Connected with {user.email ? "Email" : `Polkadot.{js}`}
          <CustomIcon icon="Export" background="none" size="xsmall" />
        </a>
          </div>
        <S.MyWalletBoxButton>
          <button type="button" onClick={disconnect}>
            Disconnnect
          </button>
        </S.MyWalletBoxButton>
      </S.MyWalletBoxWrapper>
      <S.MyWalletInput>
        <CustomInputWalletPolkadex value={user.uid} disabled />
      </S.MyWalletInput>
      <S.MyWalletLinks>
        <a href="/"> 
          <span>Settings</span> 
          <CustomIcon icon="ArrowRight" size="xsmall"/>
        </a>
        <a href="/"> 
          <span>Trading Bots</span> 
          <CustomIcon icon="ArrowRight" size="xsmall"/>
        </a>
        <a href="/"> 
          <span>Deposit/Widtdraw</span> 
          <CustomIcon icon="ArrowRight" size="xsmall"/>
        </a>
        <a href="/"> 
          <span>Terms and Conditions</span> 
          <CustomIcon icon="ArrowRight" size="xsmall"/>
        </a>
      </S.MyWalletLinks>
      <S.MyWalletTransactions href="/">See Transactions</S.MyWalletTransactions>
    </S.MyWalletContent>
  );
};

export const ConnectWallet = ({ action, error, loading }) => {
  const [state, setState] = useState(false);

  return (
    <CustomDropdown
      direction="bottom"
      title={
        <CustomButton
          title="Connect Wallet"
          icon={{ icon: "Wallet", background: "primaryBackground" }}
          style={{ width: "max-content" }}
        />
      }
      isOpacity
    >
      <S.ContentWrapper>
        <Tabs>
          <S.TabWrapper>
            <S.TabWrapperTitle>
              <CustomIcon icon="Wallet" />
              <span>Connect to Wallet</span>
            </S.TabWrapperTitle>
            <S.ContentWrapperHeader>
              <h3>Choose Method</h3>
              <S.ContentWrapperFlex>
                <TabHeader>
                  <CustomButton
                    title="Polkadot"
                    token={{
                      icon: "DOT",
                    }}
                  />
                </TabHeader>
                <TabHeader>
                  <CustomButton
                    style={{ marginLeft: 10 }}
                    title="Email/Password"
                    icon={{
                      icon: "Email",
                    }}
                  />
                </TabHeader>
              </S.ContentWrapperFlex>
            </S.ContentWrapperHeader>
            <S.ContentWrapperContainer>
              <TabContent>
                {state ? (
                  <S.WalletSelectWrapper>
                    <S.WalletSelectHeader
                      type="button"
                      onClick={() => setState(!state)}
                    >
                      <CustomIcon icon="ArrowLeft" background="none" size="small" />
                      Choose Wallet
                    </S.WalletSelectHeader>
                    <DialogStatus
                      error={error}
                      action={action}
                      loading={loading}
                    />
                  </S.WalletSelectWrapper>
                ) : (
                  <S.WalletWrapper>
                    <h4>Choose Wallet</h4>
                    <S.WalletContainer>
                      <S.WalletBox
                        role="button"
                        onClick={() => setState(!state)}
                      >
                        <CustomIcon
                          icon="PolkadotJs"
                          background="none"
                          size="large"
                        />
                        <S.WalletBoxWrapper>
                          <S.WalletBoxContainer>
                            <span>{`Polkadot.{js}`}</span>
                            <p>Installing {`Polkadot.{js}`} extension.</p>
                          </S.WalletBoxContainer>
                          <CustomIcon
                            icon="ArrowRight"
                            size="small"
                            background="none"
                          />
                        </S.WalletBoxWrapper>
                      </S.WalletBox>
                    </S.WalletContainer>
                  </S.WalletWrapper>
                )}
              </TabContent>
              <TabContent>
                <CustomSignForm />
              </TabContent>
            </S.ContentWrapperContainer>
          </S.TabWrapper>
        </Tabs>
      </S.ContentWrapper>
    </CustomDropdown>
  );
};

export const DialogStatus = ({ error, action, loading }) => {
  useEffect(() => {
    action();
  }, []);
  return (
    <S.WalletSelectContent>
      {loading && <Spinner />}
      {error && (
        <>
          <p>
            <strong>{error}</strong>
            browser extension. This extension allows you to securely sign
            transactions and manage assets in Polkadot Network.
          </p>

          <S.WalletSeletActions>
            <CustomButton
              title="Install Extension"
              style={{ marginRight: 5 }}
              background="primary"
            />
            <CustomButton title="Learn More" background="secondaryBackground" />
          </S.WalletSeletActions>
        </>
      )}
    </S.WalletSelectContent>
  );
};

const LanguageContent = ({changeLanguage, currentLanguage}) => (
  <S.LanguageWrapper>
    <S.LanguageContainer>
      <S.LanguageTitle>Language</S.LanguageTitle>
      <S.LanguageContent>
        {!!languages && languages.map((item, index)=> <LanguageName active={currentLanguage && currentLanguage === item} key={index} onClick={() => changeLanguage(item)} flag={item.toUpperCase()} />  ) }
      </S.LanguageContent>
    </S.LanguageContainer>
  </S.LanguageWrapper>
);

const LanguageName = ({
  flag = "En",
  onClick,
  active = false
}: LanguageNameProps) => (
  <S.LanguageNameWrapper
    onClick={onClick}
    active={active}
  >
    <CustomIcon icon={flag} background="none" />
    <span> {flag}/{flag === 'EN' ? 'English' : 'Russian'} </span>
  </S.LanguageNameWrapper>
);



export default Nav;
