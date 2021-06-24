import * as React from 'react';
import { injectIntl } from 'react-intl';
import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { CustomLoading } from 'src/containers';
import { IntlProps } from 'src';
import { incrementalOrderBook } from 'src/api';
import { Decimal } from 'src/components';
import "src/containers/TradingChart/TradingChart.pcss"
import {
    CustomGraph,
    CustomHeader,
    CustomMarkets,
    CustomNavigation,
    CustomP2P,
    CustomTransactions,
} from 'src/containers';
import { getUrlPart, setDocumentTitle } from 'src/helpers';
import {
    RootState,
    selectCurrentMarket,
    selectMarketTickers,
    selectUserInfo,
    selectUserLoggedIn,
    setCurrentMarket,
    setCurrentPrice,
    Ticker,
    User,
} from 'src/modules';
import { GridLayoutState, saveLayouts, selectGridLayoutState } from 'src/modules/public/gridLayout';
import { Market, marketsFetch, selectMarkets } from 'src/modules/public/markets';
import { depthFetch } from 'src/modules/public/orderBook';
import * as S from "./styles";

const { WidthProvider, Responsive } = require('react-grid-layout');

interface ReduxProps {
    currentMarket: Market | undefined;
    markets: Market[];
    user: User;
    userLoggedIn: boolean;
    rgl: GridLayoutState;
    tickers: {
        [pair: string]: Ticker,
    };
}

interface DispatchProps {
    depthFetch: typeof depthFetch;
    marketsFetch: typeof marketsFetch;
    setCurrentPrice: typeof setCurrentPrice;
    setCurrentMarket: typeof setCurrentMarket;
    saveLayouts: typeof saveLayouts;
}

interface StateProps {
    marketActive: boolean;
    notificationsActive: boolean;
}

type Props = DispatchProps & ReduxProps & RouteComponentProps & IntlProps;

class Trading extends React.Component<Props, StateProps> {
    constructor(props) {
        super(props)
        this.state = {
            marketActive: false,
            notificationsActive: false
        }
    }
    
    public componentDidMount() {
        setDocumentTitle('Trading');
        const { markets, currentMarket } = this.props;

        if (markets.length < 1) {
            this.props.marketsFetch();
        }

        if (currentMarket && !incrementalOrderBook()) {
            this.props.depthFetch(currentMarket);
        }
    }

    public componentWillUnmount() {
        this.props.setCurrentPrice(undefined);
    }

    public componentWillReceiveProps(nextProps) {
        const {
            history,
            markets,
            currentMarket,
            user: { role },
        } = this.props;

        if (markets.length !== nextProps.markets.length) {
            this.setMarketFromUrlIfExists(nextProps.markets);
        }

        if (nextProps.currentMarket) {
            const marketFromUrl = history.location.pathname.split('/');
            const marketNotMatched = nextProps.currentMarket.id !== marketFromUrl[marketFromUrl.length - 1];

            if (marketNotMatched && nextProps.currentMarket.state) {
                history.replace(`/trading/${nextProps.currentMarket.id}`);

                if (!incrementalOrderBook()) {
                  this.props.depthFetch(nextProps.currentMarket);
                }
            }
        }

        if (nextProps.currentMarket && nextProps.tickers) {
            this.setTradingTitle(nextProps.currentMarket, nextProps.tickers);
        }

        if (currentMarket?.id !== nextProps.currentMarket?.id && nextProps.currentMarket && role !== 'admin' && role !== 'superadmin') {
            const firstActiveMarket = markets.length && markets.find(item => item.state && item.state !== 'hidden');

            if (nextProps.currentMarket.state && nextProps.currentMarket.state === 'hidden') {
                history.replace(`/trading/${firstActiveMarket.id}`);

                this.props.setCurrentMarket(firstActiveMarket);

                if (!incrementalOrderBook()) {
                    this.props.depthFetch(nextProps.currentMarket);
                }
            }
        }
    }

    public render() {

        return (
            <>
            {this.props.currentMarket && this.props.markets ? 
            (
            <S.Wrapper>    
                <CustomNavigation activateNotification={() => this.setState({notificationsActive: !this.state.notificationsActive})} />
                <CustomMarkets marketActive={this.state.marketActive} />
            <S.Container>
                <CustomHeader activateMarkets={this.handleActiveMarkets} activateMarketsStatus={this.state.marketActive} />
                <CustomGraph/>
                <CustomP2P/>
                {this.props.userLoggedIn && <CustomTransactions /> }
                
            </S.Container>
           </S.Wrapper> 
           ) 
           : <CustomLoading />}
            </>
        );
    }
    private handleActiveMarkets = (e: any) => this.setState({ marketActive: !this.state.marketActive})
    
    private setMarketFromUrlIfExists = (markets: Market[]): void => {
        const urlMarket: string = getUrlPart(2, window.location.pathname);
        const market: Market | undefined = markets.find(item => item.id === urlMarket);

        if (market) {
            this.props.setCurrentMarket(market);
        }
    };

    private setTradingTitle = (market: Market, tickers: ReduxProps['tickers']) => {
        const tickerPrice = tickers[market.id] ? tickers[market.id].last : '0.0';
        document.title = `${Decimal.format(tickerPrice, market.price_precision, ',')} ${market.name}`;
    };

}

const mapStateToProps: MapStateToProps<ReduxProps, {}, RootState> = state => ({
    currentMarket: selectCurrentMarket(state),
    markets: selectMarkets(state),
    user: selectUserInfo(state),
    userLoggedIn: selectUserLoggedIn(state),
    rgl: selectGridLayoutState(state),
    tickers: selectMarketTickers(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({
    marketsFetch: () => dispatch(marketsFetch()),
    depthFetch: payload => dispatch(depthFetch(payload)),
    setCurrentPrice: payload => dispatch(setCurrentPrice(payload)),
    setCurrentMarket: payload => dispatch(setCurrentMarket(payload)),
    saveLayouts: payload => dispatch(saveLayouts(payload)),
});

export const TradingScreen = compose(
    injectIntl,
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
)(Trading) as React.ComponentClass;
