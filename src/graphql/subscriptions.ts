/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onBalanceUpdate = /* GraphQL */ `
  subscription OnBalanceUpdate($main_account: String!) {
    onBalanceUpdate(main_account: $main_account) {
      main_account
      asset
      free
      reserved
      pending_withdrawal
    }
  }
`;
export const onOrderUpdate = /* GraphQL */ `
  subscription OnOrderUpdate($main_account: String!) {
    onOrderUpdate(main_account: $main_account) {
      main_account
      id
      time
      m
      side
      order_type
      status
      price
      qty
      avg_filled_price
      filled_quantity
      fee
    }
  }
`;
export const onCreateTrade = /* GraphQL */ `
  subscription OnCreateTrade($main_account: String!) {
    onCreateTrade(main_account: $main_account) {
      main_account
      m
      p
      q
      time
    }
  }
`;
export const onUpdateTransaction = /* GraphQL */ `
  subscription OnUpdateTransaction($main_account: String!) {
    onUpdateTransaction(main_account: $main_account) {
      main_account
      txn_type
      asset
      amount
      fee
      status
      time
    }
  }
`;
export const onCandleStickEvents = /* GraphQL */ `
  subscription OnCandleStickEvents($m: String!, $interval: String!) {
    onCandleStickEvents(m: $m, interval: $interval) {
      m
      interval
      o
      c
      h
      l
      v_base
      v_quote
      t
    }
  }
`;
export const websocket_streams = /* GraphQL */ `
  subscription Websocket_streams($name: String!) {
    websocket_streams(name: $name) {
      name
      data
    }
  }
`;
export const onNewTicker = /* GraphQL */ `
  subscription OnNewTicker($m: String!) {
    onNewTicker(m: $m) {
      m
      priceChange24Hr
      priceChangePercent24Hr
      open
      close
      high
      low
      volumeBase24hr
      volumeQuote24Hr
    }
  }
`;
