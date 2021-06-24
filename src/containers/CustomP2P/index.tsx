import * as React from "react"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from 'react-redux';

import {
  FormattedMessage,
  injectIntl,
} from 'react-intl';
import { IntlProps } from 'src';

import {
  CustomButton,
  CustomIcon,
  CustomOrderInputPolkadex,
} from "src/components";
import { Order } from "./order"
import { FilterPrice } from 'src/filters';
import {
  RootState,
  selectCurrentPrice,
  selectDepthAsks,
  selectDepthBids,
  selectMobileDeviceState,
  selectUserLoggedIn,
  selectWallets,
  alertPush, 
  setCurrentPrice,
   Wallet, 
   walletsFetch 
} from 'src/modules';
import {
  Market,
  selectCurrentMarket,
  selectCurrentMarketFilters,
  selectMarketTickers,
} from 'src/modules/public/markets'
import {
  orderExecuteFetch,
  selectOrderExecuteLoading,
} from 'src/modules/user/orders';
import {
  formatWithSeparators,
  OrderProps,
  Decimal,
} from 'src/components';
import * as S from "./styles";

interface ReduxProps {
  currentMarket: Market | undefined;
  currentMarketFilters: FilterPrice[];
  executeLoading: boolean;
  marketTickers: {
      [key: string]: {
          last: string;
      },
  };
  bids: string[][];
  asks: string[][];
  wallets: Wallet[];
  currentPrice: number | undefined;
  isMobileDevice: boolean;
}

interface StoreProps {
  orderSide: string;
  priceLimit: number | undefined;
  width: number;
}

interface DispatchProps {
  walletsFetch: typeof walletsFetch;
  setCurrentPrice: typeof setCurrentPrice;
  orderExecute: typeof orderExecuteFetch;
  pushAlert: typeof alertPush;
}

interface OwnProps {
  userLoggedIn: boolean;
  currentPrice: string;
  defaultTabIndex?: number;
}

type Props = ReduxProps & DispatchProps & OwnProps & IntlProps;

class OrderInsert extends React.PureComponent<Props, StoreProps> {

  constructor(props: Props) {
    super(props);

    this.state = {
        orderSide: 'buy',
        priceLimit: undefined,
        width: 0,
    };

    this.orderRef = React.createRef();
  }

  private orderRef;
  public componentDidMount() {
    if (!this.props.wallets.length) {
        this.props.walletsFetch();
    }
  }


  public componentWillReceiveProps(next: Props) {
    const { userLoggedIn } = this.props;

    if (userLoggedIn && !next.wallets.length) {
        this.props.walletsFetch();
    }

    if (+next.currentPrice && next.currentPrice !== this.state.priceLimit) {
        this.setState({
            priceLimit: +next.currentPrice,
        });
    }
  }

  public render() {
    const {
      asks,
      bids,
      currentMarket,
      currentMarketFilters,
      defaultTabIndex,
      executeLoading,
      userLoggedIn,
      isMobileDevice,
      marketTickers,
      wallets,
  } = this.props;

  const { priceLimit } = this.state;

  const walletBase = this.getWallet(currentMarket.base_unit, wallets);
  const walletQuote = this.getWallet(currentMarket.quote_unit, wallets);

  const currentTicker = marketTickers[currentMarket.id];
  const defaultCurrentTicker = { last: '0' };
    return (
      <S.Wrapper ref={this.orderRef}>
        <Order 
         userLoggedIn={userLoggedIn}
         asks={asks}
         bids={bids}
         disabled={executeLoading}
         from={currentMarket.quote_unit}
         availableBase={this.getAvailableValue(walletBase)}
         availableQuote={this.getAvailableValue(walletQuote)}
         onSubmit={this.handleSubmit}
         priceMarketBuy={Number((currentTicker || defaultCurrentTicker).last)}
         priceMarketSell={Number((currentTicker || defaultCurrentTicker).last)}
         priceLimit={priceLimit}
         to={currentMarket.base_unit}
         handleSendType={this.getOrderType}
         currentMarketAskPrecision={currentMarket.amount_precision}
         currentMarketBidPrecision={currentMarket.price_precision}
         width={this.state.width}
         listenInputPrice={this.listenInputPrice}
         defaultTabIndex={defaultTabIndex}
         currentMarketFilters={currentMarketFilters}
         isMobileDevice={isMobileDevice}
         translate={this.translate}
        />
      </S.Wrapper>
    );
  }
  private handleSubmit = (value: OrderProps) => {
    const { currentMarket } = this.props;

    if (!currentMarket) {
        return;
    }

    const {
        amount,
        available,
        orderType,
        price,
        type,
    } = value;

    this.props.setCurrentPrice(0);

    const resultData = {
        market: currentMarket.id,
        side: type,
        volume: amount.toString(),
        ord_type: (orderType as string).toLowerCase(),
    };

    const order = orderType === 'Limit' ? { ...resultData, price: price.toString() } : resultData;
    let orderAllowed = true;

    if (+resultData.volume < +currentMarket.min_amount) {
        this.props.pushAlert({
            message: [this.translate(
                'error.order.create.minAmount',
                {
                    amount: Decimal.format(currentMarket.min_amount, currentMarket.amount_precision, ',' ),
                    currency: currentMarket.base_unit.toUpperCase(),
                },
            )],
            type: 'error',
        });

        orderAllowed = false;
    }

    if (+price < +currentMarket.min_price) {
        this.props.pushAlert({
            message: [this.translate(
                'error.order.create.minPrice',
                {
                    price: Decimal.format(currentMarket.min_price, currentMarket.price_precision, ','),
                    currency: currentMarket.quote_unit.toUpperCase(),
                },
            )],
            type: 'error',
        });

        orderAllowed = false;
    }

    if (+currentMarket.max_price && +price > +currentMarket.max_price) {
        this.props.pushAlert({
            message: [this.translate(
                'error.order.create.maxPrice',
                {
                    price: Decimal.format(currentMarket.max_price, currentMarket.price_precision, ','),
                    currency: currentMarket.quote_unit.toUpperCase(),
                },
            )],
            type: 'error',
        });

        orderAllowed = false;
    }

    if ((+available < (+amount * +price) && order.side === 'buy') ||
        (+available < +amount && order.side === 'sell')) {
        this.props.pushAlert({
            message: [this.translate(
                'error.order.create.available',
                {
                    available: formatWithSeparators(String(available), ','),
                    currency: order.side === 'buy' ? (
                        currentMarket.quote_unit.toUpperCase()
                    ) : (
                        currentMarket.base_unit.toUpperCase()
                    ),
                },
            )],
            type: 'error',
        });

        orderAllowed = false;
    }

    if (orderAllowed) {
        this.props.orderExecute(order);
    }
};

  private getWallet(currency: string, wallets: Wallet[]) {
      const currencyLower = currency.toLowerCase();

      return wallets.find(w => w.currency === currencyLower) as Wallet;
  }

  private getOrderType = (index: number, label: string) => {
      this.setState({
          orderSide: label.toLowerCase(),
      });
  };

  private getAvailableValue(wallet: Wallet | undefined) {
      return wallet && wallet.balance ? Number(wallet.balance) : 0;
  }

  private listenInputPrice = () => {
    this.setState({
        priceLimit: undefined,
    });
    this.props.setCurrentPrice(0);
  };
  private translate = (id: string, value?: any) => this.props.intl.formatMessage({ id }, { ...value });

};

const mapStateToProps = (state: RootState) => ({
  bids: selectDepthBids(state),
  asks: selectDepthAsks(state),
  currentMarket: selectCurrentMarket(state),
  currentMarketFilters: selectCurrentMarketFilters(state),
  executeLoading: selectOrderExecuteLoading(state),
  marketTickers: selectMarketTickers(state),
  wallets: selectWallets(state),
  currentPrice: selectCurrentPrice(state),
  userLoggedIn: selectUserLoggedIn(state),
  isMobileDevice: selectMobileDeviceState(state),
});

const mapDispatchToProps = dispatch => ({
  walletsFetch: () => dispatch(walletsFetch()),
  orderExecute: payload => dispatch(orderExecuteFetch(payload)),
  pushAlert: payload => dispatch(alertPush(payload)),
  setCurrentPrice: payload => dispatch(setCurrentPrice(payload)),
});

export const CustomP2P = injectIntl(connect(mapStateToProps, mapDispatchToProps)(OrderInsert as any)) as any;
