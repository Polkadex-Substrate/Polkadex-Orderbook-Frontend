/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const addRawTrade = /* GraphQL */ `
  mutation AddRawTrade($input: RawTradeInput!) {
    addRawTrade(input: $input) {
      m
      t
      p
      q
    }
  }
`;
export const setOrderbookPuts = /* GraphQL */ `
  mutation SetOrderbookPuts($input: SetOrderbookInput!) {
    setOrderbookPuts(input: $input) {
      price
      qty
      side
    }
  }
`;
export const setOrderbookDels = /* GraphQL */ `
  mutation SetOrderbookDels($input: SetOrderbookInput!) {
    setOrderbookDels(input: $input) {
      price
      qty
      side
    }
  }
`;
export const setTickerStats = /* GraphQL */ `
  mutation SetTickerStats($input: TickerStatInput!) {
    setTickerStats(input: $input) {
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
export const addNewAsset = /* GraphQL */ `
  mutation AddNewAsset($input: AddNewAssetInput!) {
    addNewAsset(input: $input) {
      ticker
      withdrawal_fee
    }
  }
`;
export const publish = /* GraphQL */ `
  mutation Publish($name: String!, $data: String!) {
    publish(name: $name, data: $data) {
      name
      data
    }
  }
`;
export const addProxy = /* GraphQL */ `
  mutation AddProxy($main_account: String!, $proxy_account: String!) {
    addProxy(main_account: $main_account, proxy_account: $proxy_account) {
      main_account
      proxy_accounts
    }
  }
`;
export const removeProxy = /* GraphQL */ `
  mutation RemoveProxy($main_account: String!, $proxy_account: String!) {
    removeProxy(main_account: $main_account, proxy_account: $proxy_account) {
      main_account
      proxy_accounts
    }
  }
`;
export const setBalance = /* GraphQL */ `
  mutation SetBalance($input: BalanceUpdateInput!) {
    setBalance(input: $input) {
      main_account
      asset
      free
      reserved
      pending_withdrawal
    }
  }
`;
export const setOrder = /* GraphQL */ `
  mutation SetOrder($input: OrderUpdateInput!) {
    setOrder(input: $input) {
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
export const addNewTrade = /* GraphQL */ `
  mutation AddNewTrade($input: AddNewTradeInput!) {
    addNewTrade(input: $input) {
      main_account
      m
      p
      q
      s
      time
    }
  }
`;
export const setTransaction = /* GraphQL */ `
  mutation SetTransaction($input: TransactionUpdateInput!) {
    setTransaction(input: $input) {
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
export const setCandleStick = /* GraphQL */ `
  mutation SetCandleStick($input: CandleStickInput!) {
    setCandleStick(input: $input) {
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
