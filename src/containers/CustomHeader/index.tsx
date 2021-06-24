import * as React from 'react';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { RouterProps } from 'react-router';
import { compose } from 'redux';
import {
  CustomButton,
  CustomDropdown,
  CustomIcon,
  CustomIconToken,
  CustomSkeleton,
  CustomTokenSearch,
} from "src/components";
import Nav from "src/containers/CustomHeader/Nav";

import {
  Market,
  RootState,
  selectCurrentColorTheme,
  selectCurrentMarket,
  selectMarketSelectorState,
  selectMobileWalletUi,
  selectSidebarState,
  setMobileWalletUi,
  toggleMarketSelector,
  toggleSidebar,
} from 'src/modules';
import * as S from "./styles";
import { CustomPairSelect } from 'src/containers';
import { CustomToolbar } from './toolbar';

import { InformationItemProps, layoutProps, PairProps } from "./types";
import useCurrentMarket from "./useCurrentMarket";


interface ReduxProps {
  currentMarket: Market | undefined;
  colorTheme: string;
  mobileWallet: string;
  sidebarOpened: boolean;
  marketSelectorOpened: boolean;
}

interface DispatchProps {
  setMobileWalletUi: typeof setMobileWalletUi;
  toggleSidebar: typeof toggleSidebar;
  toggleMarketSelector: typeof toggleMarketSelector;
}

interface LocationProps extends RouterProps {
  location: {
      pathname: string;
  };
}
type CustomProps = {
  activateMarkets?: ()=> void;
  activateMarketsStatus: boolean;
}

type Props = ReduxProps & DispatchProps & LocationProps & CustomProps;

class Header extends React.Component<Props> {
  public render() {
    const { currentMarket, activateMarkets, activateMarketsStatus  } = this.props;
    
    return  (
    <S.Wrapper>
      <S.Container>
        <CustomButton
          title="Markets"
          icon={{ icon: "Chart", background: "primaryBackground" }}
          onClick={activateMarkets}
          isActive={activateMarketsStatus}
        />
      </S.Container>
      <S.Container>
        <CustomPairSelect baseUnit={currentMarket.base_unit} quoteUnit={currentMarket.quote_unit} />
      </S.Container>
      <S.Container>
        <CustomToolbar/>
      </S.Container>
      <S.Container>
        <Nav />
      </S.Container>
    </S.Wrapper>
  )}
};

const mapStateToProps = (state: RootState): ReduxProps => ({
  currentMarket: selectCurrentMarket(state),
  colorTheme: selectCurrentColorTheme(state),
  mobileWallet: selectMobileWalletUi(state),
  sidebarOpened: selectSidebarState(state),
  marketSelectorOpened: selectMarketSelectorState(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = (dispatch) => ({
  setMobileWalletUi: (payload) => dispatch(setMobileWalletUi(payload)),
  toggleSidebar: (payload) => dispatch(toggleSidebar(payload)),
  toggleMarketSelector: () => dispatch(toggleMarketSelector()),
});

export const CustomHeader = compose(
  connect(mapStateToProps, mapDispatchToProps)
)(Header) as any;
