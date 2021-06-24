import classnames from 'classnames';
import * as React from 'react';
import { Spinner } from 'react-bootstrap';
import { injectIntl } from 'react-intl';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { Route, RouterProps, Switch } from 'react-router';
import { Redirect, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { IntlProps } from 'src';
import { minutesUntilAutoLogout, sessionCheckInterval, showLanding, wizardStep } from 'src/api';
import { ExpiredSessionModal } from 'src/components';
import { WalletsFetch, CanCan } from 'src/containers';
import { applyCustomizationSettings, toggleColorTheme } from 'src/helpers';

import {
    logoutFetch,
    Market,
    RootState,
    selectCurrentColorTheme,
    selectCurrentMarket,
    selectMobileDeviceState,
    selectPlatformAccessStatus,
    selectUserFetching,
    selectUserInfo,
    selectUserLoggedIn,
    toggleChartRebuild,
    User,
    userFetch,
    walletsReset,
    AbilitiesInterface,
    selectAbilities,
} from 'src/modules';
import {
    HistoryScreen,
    MaintenanceScreen,
    OrdersTabScreen,
    ProfileScreen,
    RestrictedScreen,
    SignInScreen,
    TradingScreen,
    WalletsScreen,
} from 'src/screens';

import {
    CustomMobile,
} from 'src/containers';
interface ReduxProps {
    colorTheme: string;
    currentMarket?: Market;
    user: User;
    isLoggedIn: boolean;
    isMobileDevice: boolean;
    userLoading?: boolean;
    platformAccessStatus: string;
    abilities: AbilitiesInterface;
}

interface DispatchProps {
    logout: typeof logoutFetch;
    userFetch: typeof userFetch;
    walletsReset: typeof walletsReset;
}

interface LocationProps extends RouterProps {
    location: {
        pathname: string;
    };
}

interface LayoutState {
    isShownExpSessionModal: boolean;
}

interface OwnProps {
    toggleChartRebuild: typeof toggleChartRebuild;
}

export type LayoutProps = ReduxProps & DispatchProps & LocationProps & IntlProps & OwnProps;

const renderLoader = () => (
    <div className="pg-loader-container">
        <Spinner animation="border" variant="primary" />
    </div>
);

const STORE_KEY = 'lastAction';

//tslint:disable-next-line no-any
const PrivateRoute: React.FunctionComponent<any> = ({ component: CustomComponent, loading, isLogged, ...rest }) => {
    if (loading) {
        return renderLoader();
    }
    const renderCustomerComponent = props => <CustomComponent {...props} />;

    if (isLogged) {
        const { checkAbility, abilities, action, target } = rest;

        if (checkAbility && !CanCan.checkAbilityByAction(action, target, abilities)) {
            return (
                <Route path="**">
                    <Redirect to="/" />
                </Route>
            );
        }

        return <Route {...rest} render={renderCustomerComponent} />;
    }

    return (
        <Route {...rest}>
            <Redirect to={'/signin'} />
        </Route>
    );
};

//tslint:disable-next-line no-any
const PublicRoute: React.FunctionComponent<any> = ({ component: CustomComponent, loading, isLogged, ...rest }) => {
    if (loading) {
        return renderLoader();
    }

    if (isLogged && rest['path'] !== '/setup') {
        return <Route {...rest}><Redirect to={'/wallets'} /></Route>;
    }

    const renderCustomerComponent = props => <CustomComponent {...props} />;

    return <Route {...rest} render={renderCustomerComponent} />;
};

class LayoutComponent extends React.Component<LayoutProps, LayoutState> {
    public static eventsListen = [
        'click',
        'keydown',
        'scroll',
        'resize',
        'mousemove',
        'TabSelect',
        'TabHide',
    ];

    public timer;
    public walletsFetchInterval;

    constructor(props: LayoutProps) {
        super(props);
        this.initListener();

        this.state = {
            isShownExpSessionModal: false,
        };
    }

    public componentDidMount() {
        if (
            !(this.props.location.pathname.includes('/magic-link')
            || this.props.location.pathname.includes('/maintenance')
            || this.props.location.pathname.includes('/restriction'))
        ) {
            switch (this.props.platformAccessStatus) {
                case 'restricted':
                    this.props.history.replace('/restriction');
                    break;
                case 'maintenance':
                    this.props.history.replace('/maintenance');
                    break;
                default:
                    const token = localStorage.getItem('csrfToken');

                    if (token) {
                        this.props.userFetch();
                        this.initInterval();
                        this.check();
                    }
            }
        }

        applyCustomizationSettings(null, this.props.toggleChartRebuild);
    }

    public componentWillReceiveProps(nextProps: LayoutProps) {
        if (
            !(nextProps.location.pathname.includes('/magic-link')
            || nextProps.location.pathname.includes('/restriction')
            || nextProps.location.pathname.includes('/maintenance'))
            || this.props.platformAccessStatus !== nextProps.platformAccessStatus
        ) {
            switch (nextProps.platformAccessStatus) {
                case 'restricted':
                    this.props.history.replace('/restriction');
                    break;
                case 'maintenance':
                    this.props.history.replace('/maintenance');
                    break;
                default:
                    break;
            }
        }

        if (!this.props.user.email && nextProps.user.email && !this.props.location.pathname.includes('/setup')) {
            this.props.userFetch();
        }

        if (!this.props.isLoggedIn && nextProps.isLoggedIn && !this.props.user.email) {
            this.initInterval();
            this.check();
        }
    }

    public componentDidUpdate(prevProps: LayoutProps) {
        const { isLoggedIn, userLoading } = this.props;

        if (!isLoggedIn && prevProps.isLoggedIn && !userLoading) {
            this.props.walletsReset();

            if (!this.props.location.pathname.includes('/trading')) {
                this.props.history.push('/trading/');
            }
        }
    }

    public componentWillUnmount() {
        for (const type of LayoutComponent.eventsListen) {
            document.body.removeEventListener(type, this.reset);
        }
        clearInterval(this.timer);
        clearInterval(this.walletsFetchInterval);
    }

    public translate = (key: string) => this.props.intl.formatMessage({id: key});

    public render() {
        const {
            colorTheme,
            isLoggedIn,
            isMobileDevice,
            userLoading,
            location,
            platformAccessStatus,
        } = this.props;
        const { isShownExpSessionModal } = this.state;
        
        const desktopCls = classnames('container-fluid pg-layout', {
            'trading-layout': location.pathname.includes('/trading'),
        });
        const mobileCls = classnames('container-fluid pg-layout pg-layout--mobile', {
            'pg-layout--mobile-setup': location.pathname.includes('/setup'),
        });
        toggleColorTheme(colorTheme);

        if (!platformAccessStatus.length) {
            return renderLoader();
        }

        if ((wizardStep() !== 'false') && this.props.location.pathname !== '/setup') {
            return (
                <Route loading={userLoading} isLogged={isLoggedIn}><Redirect to={'/setup'} /></Route>
            );
        }

        if (isMobileDevice) {
            return (<CustomMobile />)
         }

        return (
            <>
                <Switch>
                    {/* <Route path="/restriction" component={RestrictedScreen} />
                    <Route path="/maintenance" component={MaintenanceScreen} /> */}
                    <Route exact={true} path="/trading/:market?" component={TradingScreen} />
                    {showLanding() && <Route exact={true} path="/" component={TradingScreen} />}
                    <Route path="**"><Redirect to="/trading/" /></Route>
                </Switch>
                {isLoggedIn && <WalletsFetch/>}
                {isShownExpSessionModal && this.handleRenderExpiredSessionModal()}
            </>
        );
    }

    private getLastAction = () => {
        if (localStorage.getItem(STORE_KEY) !== null) {
            return parseInt(localStorage.getItem(STORE_KEY) || '0', 10);
        }

        return 0;
    };

    private setLastAction = (lastAction: number) => {
        localStorage.setItem(STORE_KEY, lastAction.toString());
    };

    private initListener = () => {
        this.reset();
        for (const type of LayoutComponent.eventsListen) {
            document.body.addEventListener(type, this.reset);
        }
    };

    private reset = () => {
        this.setLastAction(Date.now());
    };

    private initInterval = () => {
        this.timer = setInterval(() => {
            this.check();
        }, parseFloat(sessionCheckInterval()));
    };

    private check = () => {
        const { user } = this.props;
        const now = Date.now();
        const timeleft = this.getLastAction() + parseFloat(minutesUntilAutoLogout()) * 60 * 1000;
        const diff = timeleft - now;
        const isTimeout = diff < 0;

        if (isTimeout && user.email) {
            if (user.state === 'active') {
                this.handleChangeExpSessionModalState();
            }

            this.props.logout();
            clearInterval(this.timer);
        }
    };

    private handleSubmitExpSessionModal = () => {
        const { history } = this.props;
        this.handleChangeExpSessionModalState();
        history.push('/signin');
    };

    private handleRenderExpiredSessionModal = () => (
        <ExpiredSessionModal
            title={this.translate('page.modal.expired.title')}
            buttonLabel={this.translate('page.modal.expired.submit')}
            handleChangeExpSessionModalState={this.handleChangeExpSessionModalState}
            handleSubmitExpSessionModal={this.handleSubmitExpSessionModal}
        />
    );

    private handleChangeExpSessionModalState = () => {
        this.setState({
            isShownExpSessionModal: !this.state.isShownExpSessionModal,
        });
    };
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, RootState> = state => ({
    colorTheme: selectCurrentColorTheme(state),
    currentMarket: selectCurrentMarket(state),
    user: selectUserInfo(state),
    isLoggedIn: selectUserLoggedIn(state),
    isMobileDevice: selectMobileDeviceState(state),
    userLoading: selectUserFetching(state),
    platformAccessStatus: selectPlatformAccessStatus(state),
    abilities: selectAbilities(state),
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = dispatch => ({
    logout: () => dispatch(logoutFetch()),
    toggleChartRebuild: () => dispatch(toggleChartRebuild()),
    userFetch: () => dispatch(userFetch()),
    walletsReset: () => dispatch(walletsReset()),
});

export const Layout = compose(
    injectIntl,
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
)(LayoutComponent) as any;
