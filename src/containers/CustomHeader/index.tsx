import * as React from 'react';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { compose } from 'redux';
import { CustomButton, CustomDropdown, CustomLogo } from "src/components";
import Nav from "./Nav";

import {
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
import { CustomToolbar } from './toolbar';

import { ReduxProps, DispatchProps, Props } from "./types";

class Header extends React.Component<Props> {
  public render() {
    
    return  (
    <S.Main>
      <S.Col>
        <CustomToolbar />
      </S.Col>
      <S.Col>
        <Nav />
      </S.Col>    
    </S.Main>
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
