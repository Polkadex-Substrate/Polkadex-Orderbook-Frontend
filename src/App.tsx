import { createBrowserHistory } from 'history';
import * as React from 'react';
import * as ReactGA from 'react-ga';
import { IntlProvider } from 'react-intl';
import { useSelector } from 'react-redux';
import { Router } from 'react-router';
import { ThemeProvider } from "styled-components";
import { gaTrackerKey } from './api';
import { ErrorWrapper } from './containers';
import { useRangerConnectFetch, useReduxSelector, useSetMobileDevice } from './hooks';
import * as mobileTranslations from './mobile/translations';
import { selectCurrentColorTheme, selectCurrentLanguage, selectMobileDeviceState } from './modules';
import { languageMap } from './translations';
import { GlobalStyles, defaultThemes } from "src/styles";

const gaKey = gaTrackerKey();
const browserHistory = createBrowserHistory();

if (gaKey) {
    ReactGA.initialize(gaKey);
    browserHistory.listen((location) => {
        ReactGA.set({ page: location.pathname });
        ReactGA.pageview(location.pathname);
    });
}

/* Mobile components */
const MobileHeader = React.lazy(() => import('./mobile/components/Header').then(({ Header }) => ({ default: Header })));
const MobileFooter = React.lazy(() => import('./mobile/components/Footer').then(({ Footer }) => ({ default: Footer })));

/* Desktop components */
const AlertsContainer = React.lazy(() => import('./containers/Alerts').then(({ Alerts }) => ({ default: Alerts })));

const LayoutContainer = React.lazy(() => import('./routes').then(({ Layout }) => ({ default: Layout })));

const getTranslations = (lang: string, isMobileDevice: boolean) => {
    if (isMobileDevice) {
        return {
            ...languageMap[lang],
            ...mobileTranslations[lang],
        };
    }

    return languageMap[lang];
};

const RenderDeviceContainers = () => {
    const isMobileDevice = useSelector(selectMobileDeviceState);

    if (browserHistory.location.pathname === '/setup' || !isMobileDevice) {
        return (
            <React.Fragment>
                <AlertsContainer />
                <LayoutContainer />
            </React.Fragment>
        );
    }

    return (
        <div className="pg-mobile-app">
            {/* <MobileHeader /> */}
            <AlertsContainer/>
            <LayoutContainer/>
            {/* <MobileFooter /> */}
        </div>
    );
};

export const App = () => {
    useSetMobileDevice();
    const lang = useSelector(selectCurrentLanguage);
    const isMobileDevice = useSelector(selectMobileDeviceState);
    useRangerConnectFetch();
    const themeSelect = useReduxSelector(selectCurrentColorTheme)

    return (
        <IntlProvider locale={lang} messages={getTranslations(lang, isMobileDevice)} key={lang}>
            <Router history={browserHistory}>
                <ErrorWrapper>
                    <React.Suspense fallback={null}>
                    <ThemeProvider theme={themeSelect === 'dark' ? defaultThemes.dark : defaultThemes.light}>                 
                     <GlobalStyles />
                        <RenderDeviceContainers />
                    </ThemeProvider>
                    </React.Suspense>
                </ErrorWrapper>
            </Router>
        </IntlProvider>
    );
};

