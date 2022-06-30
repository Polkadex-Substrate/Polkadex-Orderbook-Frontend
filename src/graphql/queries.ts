/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getChannel = /* GraphQL */ `
  query GetChannel {
    getChannel {
      name
      data
    }
  }
`;
export const getOrderbook = /* GraphQL */ `
  query GetOrderbook($market: String!, $limit: Int, $nextToken: String) {
    getOrderbook(market: $market, limit: $limit, nextToken: $nextToken) {
      items {
        price
        qty
        side
      }
      nextToken
    }
  }
`;
export const getKlinesbyMarketInterval = /* GraphQL */ `
  query GetKlinesbyMarketInterval(
    $market: String!
    $interval: String!
    $from: AWSDateTime!
    $to: AWSDateTime!
  ) {
    getKlinesbyMarketInterval(
      market: $market
      interval: $interval
      from: $from
      to: $to
    ) {
      items {
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
  }
`;
export const getAllAssets = /* GraphQL */ `
  query GetAllAssets($limit: Int, $nextToken: String) {
    getAllAssets(limit: $limit, nextToken: $nextToken) {
      items {
        ticker
        withdrawal_fee
      }
      nextToken
    }
  }
`;
export const getRecentTrades = /* GraphQL */ `
  query GetRecentTrades($m: String!, $limit: Int, $nextToken: String) {
    getRecentTrades(m: $m, limit: $limit, nextToken: $nextToken) {
      items {
        m
        t
        p
        q
      }
      nextToken
    }
  }
`;
export const getAllMarketTickers = /* GraphQL */ `
  query GetAllMarketTickers {
    getAllMarketTickers {
      items {
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
      nextToken
    }
  }
`;
export const findUserByProxyAccount = /* GraphQL */ `
  query FindUserByProxyAccount($proxy_account: String!) {
    findUserByProxyAccount(proxy_account: $proxy_account) {
      items
      nextToken
    }
  }
`;
export const findUserByMainAccount = /* GraphQL */ `
  query FindUserByMainAccount($main_account: String!) {
    findUserByMainAccount(main_account: $main_account) {
      main_account
      proxy_accounts
    }
  }
`;
export const findBalanceByMainAccount = /* GraphQL */ `
  query FindBalanceByMainAccount($main_account: String!, $asset: String!) {
    findBalanceByMainAccount(main_account: $main_account, asset: $asset) {
      main_account
      asset
      free
      reserved
      pending_withdrawal
    }
  }
`;
export const getAllBalancesByMainAccount = /* GraphQL */ `
  query GetAllBalancesByMainAccount($main_account: String!) {
    getAllBalancesByMainAccount(main_account: $main_account) {
      items {
        main_account
        asset
        free
        reserved
        pending_withdrawal
      }
      nextToken
    }
  }
`;
export const findOrderByMainAccount = /* GraphQL */ `
  query FindOrderByMainAccount(
    $main_account: String!
    $order_id: String!
    $market: String!
  ) {
    findOrderByMainAccount(
      main_account: $main_account
      order_id: $order_id
      market: $market
    ) {
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
export const listOrderHistorybyMainAccount = /* GraphQL */ `
  query ListOrderHistorybyMainAccount(
    $main_account: String!
    $from: AWSDateTime!
    $to: AWSDateTime!
    $limit: Int
    $nextToken: String
  ) {
    listOrderHistorybyMainAccount(
      main_account: $main_account
      from: $from
      to: $to
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const listOpenOrdersByMainAccount = /* GraphQL */ `
  query ListOpenOrdersByMainAccount(
    $main_account: String!
    $limit: Int
    $nextToken: String
  ) {
    listOpenOrdersByMainAccount(
      main_account: $main_account
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const listTransactionsByMainAccount = /* GraphQL */ `
  query ListTransactionsByMainAccount(
    $main_account: String!
    $from: AWSDateTime!
    $to: AWSDateTime!
    $limit: Int
    $nextToken: String
  ) {
    listTransactionsByMainAccount(
      main_account: $main_account
      from: $from
      to: $to
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        main_account
        txn_type
        asset
        amount
        fee
        status
        time
      }
      nextToken
    }
  }
`;
export const listTradesByMainAccount = /* GraphQL */ `
  query ListTradesByMainAccount(
    $main_account: String!
    $from: AWSDateTime!
    $to: AWSDateTime!
    $limit: Int
    $nextToken: String
  ) {
    listTradesByMainAccount(
      main_account: $main_account
      from: $from
      to: $to
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        main_account
        m
        p
        q
        s
        time
      }
      nextToken
    }
  }
`;
