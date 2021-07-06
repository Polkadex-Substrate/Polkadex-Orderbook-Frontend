import * as React from "react"
import { connect } from 'react-redux';

import {
  injectIntl,
} from 'react-intl';
import { IntlProps } from 'src';

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
  CustomButton, 
  CustomIcon, 
  TabContent, 
  TabHeader, 
  Tabs
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
       <Tabs>
        <h2>Place Order</h2>
        <S.Header>
          <TabHeader>
            <S.TabHeader> Buy </S.TabHeader>
          </TabHeader>
          <TabHeader>
            <S.TabHeader isSell={true}> Sell </S.TabHeader>
          </TabHeader>
        </S.Header>
        <S.Content>
          <TabContent>
            <Form type="sell" />
          </TabContent>
          <TabContent>
            <Form type="buy" />
          </TabContent>
        </S.Content>
        <S.Footer>
          <S.FooterTitle>
            <h2>Assets</h2>
            <a href="/">
              Buy <CustomIcon icon="ArrowRight" size="xsmall" background="none" style={{padding: 1}}/>
            </a>
          </S.FooterTitle>
          <S.FooterContent>
            <S.FooterActions>
              <button type="button">Deposit</button>
              <button type="button">Withdraw</button>
            </S.FooterActions>
            <S.FooterTokens>
              <S.FooterToken>
                <S.FooterTokenCard>
                  <p>PDEX</p>
                  <div>
                    <span>Available</span>
                    <span>Reserved</span>
                  </div>
                </S.FooterTokenCard>
                <S.FooterTokenCard>
                  <span>884.000000</span>
                  <span>000.000000</span>
                </S.FooterTokenCard>
              </S.FooterToken>
              <S.FooterToken>
                <S.FooterTokenCard>
                  <p>ETH</p>
                  <div>
                    <span>Available</span>
                    <span>Reserved</span>
                  </div>
                </S.FooterTokenCard>
                <S.FooterTokenCard>
                  <span>884.000000</span>
                  <span>000.000000</span>
                </S.FooterTokenCard>
              </S.FooterToken>
            </S.FooterTokens>
          </S.FooterContent>
        </S.Footer>
      </Tabs>
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



const Form = ({ type = "sell" }) => {
  return (
    <S.FormWrapper>
      <Tabs>
        <S.FormHeader>
          <TabHeader>
            <S.FormTabHeader>Limit</S.FormTabHeader>
          </TabHeader>
          <TabHeader>
            <S.FormTabHeader>Market</S.FormTabHeader>
          </TabHeader>
        </S.FormHeader>
        <S.FormContent>
          <form onSubmit={() => console.log("Submit..")}>
            <Input label="Price" token="ETH" placeholder="Price"/>
            <Input label="Amount" token="PDEX" placeholder="Amount"/>
            <p>Range</p>
            <Input label="Total" token="ETH" placeholder="Total"/>
            <CustomButton
              title="Log in"
              style={{ width: "100%", justifyContent: "center" }}
              background="primary"
            />
          </form>
        </S.FormContent>
      </Tabs>
    </S.FormWrapper>
  );
};

const Input = ({ token, label, ...props }) => {
  return (
    <S.InputWrapper>
      <p>{label}</p>
      <div>
        <input type="text" {...props} />
        <span>{token}</span>
      </div>
    </S.InputWrapper>
  );
};
