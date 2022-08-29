/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTime = /* GraphQL */ `
  query GetTime {
    getTime
  }
`;
export const getOrderbook = /* GraphQL */ `
  query GetOrderbook($market: String!, $limit: Int, $nextToken: String) {
    getOrderbook(market: $market, limit: $limit, nextToken: $nextToken) {
      items {
        p
        q
        s
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
        o
        c
        h
        l
        v_base
        v_quote
        nt
        time
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
        pc
        pcp
        o
        c
        h
        l
        v_base
        v_quote
        nt
      }
      nextToken
    }
  }
`;
export const getAllMarkets = /* GraphQL */ `
  query GetAllMarkets {
    getAllMarkets {
      items {
        market
        max_trade_amount
        min_trade_amount
        min_qty
      }
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
      proxies
    }
  }
`;
export const findBalanceByMainAccount = /* GraphQL */ `
  query FindBalanceByMainAccount($main_account: String!, $asset: String!) {
    findBalanceByMainAccount(main_account: $main_account, asset: $asset) {
      a
      f
      r
      p
    }
  }
`;
export const getAllBalancesByMainAccount = /* GraphQL */ `
  query GetAllBalancesByMainAccount($main_account: String!) {
    getAllBalancesByMainAccount(main_account: $main_account) {
      items {
        a
        f
        r
        p
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
      u
      cid
      id
      t
      m
      s
      ot
      st
      p
      q
      afp
      fq
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
        u
        cid
        id
        t
        m
        s
        ot
        st
        p
        q
        afp
        fq
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
        u
        cid
        id
        t
        m
        s
        ot
        st
        p
        q
        afp
        fq
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
        tt
        a
        q
        fee
        st
        t
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
        m
        p
        q
        s
        t
      }
      nextToken
    }
  }
`;
export const listMainAccountsByEmail = /* GraphQL */ `
  query ListMainAccountsByEmail($email: String!) {
    listMainAccountsByEmail(email: $email) {
      hash_key
      range_key
      accounts
    }
  }
`;
