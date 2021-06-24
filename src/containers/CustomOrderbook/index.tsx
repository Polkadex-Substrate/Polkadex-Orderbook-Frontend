import * as React from "react"
import { Decimal, Spinner } from "src/components";
import { injectIntl } from 'react-intl';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { IntlProps } from 'src';
import { colors } from 'src/constants';
import { defaultThemes } from "src/styles";

import { accumulateVolume, calcMaxVolume } from 'src/helpers';
import {
    Market,
    PublicTrade,
    RootState,
    selectCurrentColorTheme,
    selectCurrentMarket,
    selectCurrentPrice,
    selectDepthAsks,
    selectDepthBids,
    selectDepthLoading,
    selectLastRecentTrade,
    selectMarketTickers,
    selectMobileDeviceState,
    selectOpenOrdersList,
    setCurrentPrice,
    depthIncrementSubscribeResetLoading,
    Ticker,
} from 'src/modules';
import { OrderCommon } from 'src/modules/types';
import { OrderbookTable } from "./orderbookTable"

import * as S from "./styles";

interface ReduxProps {
  asks: string[][];
  bids: string[][];
  colorTheme: string;
  currentMarket?: Market;
  currentPrice?: number;
  lastRecentTrade?: PublicTrade;
  openOrdersList: OrderCommon[];
  orderBookLoading: boolean;
  isMobileDevice: boolean;
}

interface DispatchProps {
  setCurrentPrice: typeof setCurrentPrice;
  depthIncrementSubscribeResetLoading: typeof depthIncrementSubscribeResetLoading;
}

interface State {
  width: number;
}

interface OwnProps {
  marketTickers: {
      [key: string]: Ticker;
  };
  forceLarge?: boolean;
  size: number;
}

type Props = ReduxProps & DispatchProps & OwnProps & IntlProps;

const breakpoint = 634;

class OrderBookContainer extends React.Component<Props, State> {
  
  constructor(props: Props) {
    super(props);

    this.state = {
        width: 0,
    };

    this.orderRef = React.createRef();
  }

  private orderRef;

  public componentDidMount() {
      window.addEventListener('resize', this.handleResize);
      this.handleResize();
  }

  public componentDidUpdate(prevProps: Props) {
      this.handleResize();

      if (!prevProps.orderBookLoading && this.props.orderBookLoading) {
          setTimeout(() => {
              if (this.props.orderBookLoading) {
                  this.props.depthIncrementSubscribeResetLoading();
              }
          }, 5000);
      }
  }

  public componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize);
  }

  public shouldComponentUpdate(nextProps: Props) {
    const {
        asks,
        bids,
        currentMarket,
        marketTickers,
        orderBookLoading,
        openOrdersList,
    } = this.props;
    const { width } = this.state;
    const defaultTicker = {
        last: 0,
        price_change_percent: '+0.00%',
    };

    const currentMarketTicker = currentMarket && marketTickers ? marketTickers[currentMarket.id] : defaultTicker;
    const nextCurrentMarketTicker = currentMarket && nextProps.marketTickers ? nextProps.marketTickers[currentMarket.id] : defaultTicker;

    return (
        JSON.stringify(nextProps.asks) !== JSON.stringify(asks) ||
        JSON.stringify(nextProps.bids) !== JSON.stringify(bids) ||
        (nextProps.currentMarket && nextProps.currentMarket.id) !== (currentMarket && currentMarket.id) ||
        (this.orderRef.current && this.orderRef.current.clientWidth !== width) ||
        (JSON.stringify(currentMarketTicker) !== JSON.stringify(nextCurrentMarketTicker)) ||
        (orderBookLoading !== nextProps.orderBookLoading) ||
        JSON.stringify(nextProps.openOrdersList) !== JSON.stringify(openOrdersList)
    );
  }
  render() {
    const { asks, bids, forceLarge, orderBookLoading, colorTheme, currentMarket } = this.props;
    const isLarge = forceLarge || (this.state.width > breakpoint);

    const formattedBaseUnit = (currentMarket && currentMarket.base_unit) ? `(${currentMarket.base_unit.toUpperCase()})` : '';
    const formattedQuoteUnit = (currentMarket && currentMarket.quote_unit) ? `(${currentMarket.quote_unit.toUpperCase()})` : '';
    return (
      <S.Wrapper>
        <S.Header>
          <h2>Orderbook</h2>
          <S.Options>
            {/* <ul>
              <li>
                <CustomIcon icon="OrdersBuy" />
              </li>
              <li>
                <CustomIcon icon="OrdersAll" />
              </li>
              <li>
                <CustomIcon icon="OrdersSell" />
              </li>
            </ul>
            <CustomDropdown title="001">
              <p>testing</p>
            </CustomDropdown> */}
          </S.Options>
        </S.Header>
        <S.Content>
         {orderBookLoading && !currentMarket ? <p>Loading</p> : this.orderBook(bids, asks, isLarge, formattedBaseUnit, formattedQuoteUnit)}
        </S.Content>
      </S.Wrapper>
    );
  }
  private orderBook = (bids, asks, isLarge: boolean, formattedBaseUnit, formattedQuoteUnit) => {
    const { colorTheme, currentMarket } = this.props;
    const asksData = isLarge ? asks : asks.slice(0).reverse();
    return (
      <OrderbookTable 
        loading={this.props.orderBookLoading} 
        baseUnit={formattedBaseUnit}
        baseQuote={formattedQuoteUnit}
        maxVolume={calcMaxVolume(bids, asks)}
        orderBookEntryAsks={accumulateVolume(asks)}
        orderBookEntryBids={accumulateVolume(bids)}
        rowBackgroundColorAsks={defaultThemes.dark.colors.green}
        rowBackgroundColorBids={defaultThemes.dark.colors.primary}
        dataAsks={this.renderOrderBook(asksData, 'asks', this.props.intl.formatMessage({id: 'page.noDataToShow'}), isLarge, currentMarket)}
        dataBids={this.renderOrderBook(bids, 'bids', this.props.intl.formatMessage({id: 'page.noDataToShow'}), isLarge, currentMarket)}
        lastPrice={this.lastPrice()}
        onSelectAsks={this.handleOnSelectAsks}
        onSelectBids={this.handleOnSelectBids}
        isLarge={isLarge}
        noDataAsks={!asksData.length ? true : false}
        noDataBids={!bids.length ? true : false}
        noDataMessage={this.props.intl.formatMessage({id: 'page.noDataToShow'})}
      />
    )
  }
  public lastPrice() {
    const { currentMarket, isMobileDevice, lastRecentTrade, marketTickers } = this.props;
    const currentTicker = currentMarket && this.getTickerValue(currentMarket, marketTickers);

    if (currentMarket) {
        let lastPrice = '';
        if (lastRecentTrade?.market === currentMarket.id) {
            lastPrice = lastRecentTrade.price;
        } else {
            lastPrice = currentTicker.last;
        }
        return (
          <S.LastPrice isPositive={currentTicker?.price_change_percent.includes("+")}>
            {Decimal.format(lastPrice, currentMarket.price_precision, ',')}&nbsp;
            {currentMarket?.quote_unit.toUpperCase()}
          </S.LastPrice>
        );
    } else {
      return (
        <React.Fragment>
        <Spinner />
      </React.Fragment>
      )
    }
  }

  private renderOrderBook = (array: string[][], side: string, message: string, isLarge: boolean, currentMarket?: Market) => {
      const { isMobileDevice } = this.props;
      let total = accumulateVolume(array);
      const priceFixed = currentMarket ? currentMarket.price_precision : 0;
      const amountFixed = currentMarket ? currentMarket.amount_precision : 0;
      return array.length ? array.map((item, i) => {
          const [price, volume] = item;

          switch (side) {
              case 'asks':
                  total = isLarge ? accumulateVolume(array) : accumulateVolume(array.slice(0).reverse()).slice(0).reverse();

                  return [
                      <Decimal key={i} fixed={priceFixed} thousSep="," prevValue={array[i + 1] ? array[i + 1][0] : 0}>{price}</Decimal>,
                      <Decimal key={i} fixed={amountFixed} thousSep=",">{volume}</Decimal>,
                      <Decimal key={i} fixed={amountFixed} thousSep=",">{total[i]}</Decimal>,
                  ];
              default:
                  if (isLarge) {
                      return [
                          <Decimal key={i} fixed={amountFixed} thousSep=",">{total[i]}</Decimal>,
                          <Decimal key={i} fixed={amountFixed} thousSep=",">{volume}</Decimal>,
                          <Decimal key={i} fixed={priceFixed} thousSep="," prevValue={array[i - 1] ? array[i - 1][0] : 0}>{price}</Decimal>,
                      ];
                  } else {
                      return [
                          <Decimal key={i} fixed={priceFixed} thousSep="," prevValue={array[i - 1] ? array[i - 1][0] : 0}>{price}</Decimal>,
                          <Decimal key={i} fixed={amountFixed} thousSep=",">{volume}</Decimal>,
                          <Decimal key={i} fixed={amountFixed} thousSep=",">{total[i]}</Decimal>,
                      ];
                  }
          }
      }) : [[[''], message]];
  };

  private handleOnSelectBids = (index: string) => {
    const { currentPrice, bids } = this.props;
    const priceToSet = bids[Number(index)] && Number(bids[Number(index)][0]);

    if (currentPrice !== priceToSet) {
        this.props.setCurrentPrice(priceToSet);
    }
  };

  private handleOnSelectAsks = (index: string) => {
      const { asks, currentPrice, forceLarge } = this.props;
      const isLarge = forceLarge || this.state.width >= breakpoint;
      const asksData = isLarge ? asks : asks.slice(0).reverse();
      const priceToSet = asksData[Number(index)] && Number(asksData[Number(index)][0]);

      if (currentPrice !== priceToSet) {
          this.props.setCurrentPrice(priceToSet);
      }
  };

  private getTickerValue = (currentMarket: Market, tickers: { [key: string]: Ticker }) => {
      const defaultTicker = { amount: '0', low: '0', last: '0', high: '0', volume: '0', open: '0', price_change_percent: '+0.00%' };

      return tickers[currentMarket.id] || defaultTicker;
  };

  private handleResize = () => {
      if (this.orderRef.current && this.state.width !== this.orderRef.current.clientWidth) {
          this.setState({
              width: this.orderRef.current.clientWidth,
          });
      }
  };
}

const mapStateToProps = (state: RootState) => ({
  bids: selectDepthBids(state),
  asks: selectDepthAsks(state),
  colorTheme: selectCurrentColorTheme(state),
  orderBookLoading: selectDepthLoading(state),
  currentMarket: selectCurrentMarket(state),
  currentPrice: selectCurrentPrice(state),
  lastRecentTrade: selectLastRecentTrade(state),
  marketTickers: selectMarketTickers(state),
  openOrdersList: selectOpenOrdersList(state),
  isMobileDevice: selectMobileDeviceState(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> =
  dispatch => ({
      setCurrentPrice: payload => dispatch(setCurrentPrice(payload)),
      depthIncrementSubscribeResetLoading: () => dispatch(depthIncrementSubscribeResetLoading()),
  });

export const CustomOrderbook = injectIntl(connect(mapStateToProps, mapDispatchToProps)(OrderBookContainer)) as any;
