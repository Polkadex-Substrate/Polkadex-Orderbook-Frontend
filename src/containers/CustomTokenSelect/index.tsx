import React, {useState, useEffect, useCallback} from 'react'
import * as S from "./styles"
import { useIntl } from 'react-intl';

import {
  CustomDropdown,
  CustomIcon,
  CustomIconToken,
  CustomSkeleton,
  Decimal
} from "src/components";
import { selectCurrencies, selectWallets, Wallet,  selectMarkets, selectMarketTickers, selectWalletsLoading, selectUserInfo, selectUserLoggedIn } from 'src/modules';
import {  TokenProps, SearchProps } from "./types";
import { useReduxSelector } from 'src/hooks';

interface ExtendedWallet extends Wallet {
  spotBalance?: string;
  spotLocked?: string;
}

export const CustomTokenSelect = ({balance = 0, tokenName='Ethereum', ticket='ETH'}: TokenProps) => {
  const isLoggedIn = useReduxSelector(selectUserLoggedIn)

  return (
    <S.TokenWrapper>
      <CustomDropdown 
        title={<TokenHeader 
        ticket={ticket} 
        tokenName={tokenName} 
        balance={balance}
        isLoggedIn={isLoggedIn}
        />} 
        direction="bottom" 
        style={{
          marginTop: '1rem', 
          width: '-webkit-fill-available'
        }}
      >
        <TokenContent isLoggedIn={isLoggedIn}/>
      </CustomDropdown>
    </S.TokenWrapper>
  )
}

const TokenHeader = ({ ticket, tokenName, balance, isLoggedIn }: TokenProps) => {

  return (
    <S.HeaderWrapper>
      <S.HeaderContainer>
        <CustomIconToken icon={ticket}/>
      <S.HeaderBox>
        <span>{tokenName}</span>
        <span>Balance: {isLoggedIn ? balance : 0} {ticket}</span>
      </S.HeaderBox>
    </S.HeaderContainer>
      <CustomIcon icon="ArrowBottom" size="xsmall"/>
    </S.HeaderWrapper>
  );
};

const TokenContent = ({isLoggedIn}) => {
  const [filterValue, setFilterValue] = useState<string>('');

  const [filteredWallets, setFilteredWallets] = useState<ExtendedWallet[]>([]);
  const [mergedWallets, setMergedWallets] = useState<ExtendedWallet[]>([]);
  const [nonZeroSelected, setNonZeroSelected] = useState<boolean>(false);

  const { formatMessage } = useIntl();
  const translate = useCallback((id: string, value?: any) => formatMessage({ id: id }, { ...value }), [formatMessage]);
  const wallets = useReduxSelector(selectWallets);
  const currencies = useReduxSelector(selectCurrencies);
  const markets = useReduxSelector(selectMarkets);
  const tickers = useReduxSelector(selectMarketTickers);
  const walletsLoading = useReduxSelector(selectWalletsLoading);
  const userData = useReduxSelector(selectUserInfo);

  useEffect(() => {
    if (wallets.length && currencies.length  && markets.length ) {
      const marketCurrencies = markets.map (market => {
        const filteredCurrencies = currencies.filter(filteredCurrency => filteredCurrency.id === market.base_unit )
        const result =  filteredCurrencies.map(item => {
            const spotWallet = wallets.find(i => i.currency === item.id);
            return {
                ...spotWallet,
                spotBalance: spotWallet ? spotWallet.balance : '0',
                spotLocked: spotWallet ? spotWallet.locked : '0',
            };
        });
        return result.shift()
      }) 
      setFilteredWallets(marketCurrencies);
      setMergedWallets(marketCurrencies);
    }
  }, [wallets, currencies]);

  const retrieveData = useCallback(() => {
    const list = nonZeroSelected ? filteredWallets.filter(i => i.balance && Number(i.balance) > 0) : filteredWallets;
    const filteredList = list.filter(i => !filterValue || i.name?.toLocaleLowerCase().includes(filterValue.toLowerCase()) || i.currency?.toLocaleLowerCase().includes(filterValue.toLowerCase()));
    return !filteredList.length ? [[]] : filteredList.map((item, index) => {
      const {
        currency,
        iconUrl,
        name,
        fixed,
        spotBalance,
        spotLocked,
    } = item;
    const totalBalance = Number(spotBalance) + Number(spotLocked);
    return ( 
      <TokenItem
        key={index}
        isLoggedIn={isLoggedIn}
        tokenName={name}
        ticket={currency?.toUpperCase()}
        amount={ 
          <Decimal key={index} fixed={fixed} thousSep=",">
            {totalBalance ? totalBalance.toString() : '0'}
          </Decimal>}
        amountInFiat={0}
      />)
    })
  }, [filteredWallets,
    nonZeroSelected,
    currencies,
    markets,
    tickers]
  )
  return (
    <S.ContentWrapper>
      <S.ContentSearch>
         <Search placeholder="Search token.." />
      </S.ContentSearch>
      <S.ContentTokens>
        {walletsLoading ? <Loading /> : retrieveData()}
      </S.ContentTokens>
    </S.ContentWrapper>
  )
}

const TokenItem = ({
  tokenName,
  ticket,
  amount,
  isLoggedIn,
  amountInFiat = 0
}: TokenProps) => {
  return (
    <S.TokenItemWrapper>
      {ticket ? <CustomIconToken icon={ticket} /> :  <CustomSkeleton width="3.5rem" height="3.5rem"/> }
        <S.TokenItemContent>
          <S.TokenItemBox>
            {tokenName ? <span>{tokenName}</span> : <CustomSkeleton width="8rem" style={{marginBottom: 5}}/>}
            {ticket ? <span>{ticket}</span> : <CustomSkeleton width="5rem"/>}
          </S.TokenItemBox>
          <S.TokenItemBox>
            {isLoggedIn ? amount ? <span>{amount}</span> : <CustomSkeleton width="8rem" style={{marginBottom: 5}} /> : 0}
             <span>$ {amountInFiat}</span>
          </S.TokenItemBox>
      </S.TokenItemContent>
    </S.TokenItemWrapper>
  );
};

const Search = ({ fullWidth = false, ...props }: SearchProps) => {
  return (
    <S.SearchWrapper fullWidth={fullWidth}>
      <CustomIcon icon="Search" background="transparent" />
      <input {...props} />
    </S.SearchWrapper>
  );
};

const Loading = () => {
  return (
    <>
      <TokenItem />
      <TokenItem />
      <TokenItem />
      <TokenItem />
    </>
  )
}