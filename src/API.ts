/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type SetOrderbookInput = {
  m: string,
  seq: string,
  levels?: Array< SetPriceLevelInput | null > | null,
};

export type SetPriceLevelInput = {
  price: string,
  qty: string,
  side?: OrderSide | null,
};

export enum OrderSide {
  Bid = "Bid",
  Ask = "Ask",
}


export type SetPriceLevel = {
  __typename: "SetPriceLevel",
  price: string,
  qty: string,
  side?: OrderSide | null,
};

export type TickerStatInput = {
  m: string,
  priceChange24Hr: string,
  priceChangePercent24Hr: string,
  open: string,
  close: string,
  high: string,
  low: string,
  volumeBase24hr: string,
  volumeQuote24Hr: string,
};

export type TickerStats = {
  __typename: "TickerStats",
  m: string,
  priceChange24Hr: string,
  priceChangePercent24Hr: string,
  open: string,
  close: string,
  high: string,
  low: string,
  volumeBase24hr: string,
  volumeQuote24Hr: string,
};

export type Channel = {
  __typename: "Channel",
  name: string,
  data: string,
};

export type User = {
  __typename: "User",
  main_account: string,
  proxy_accounts?: string | null,
};

export type BalanceUpdateInput = {
  main_account: string,
  asset: string,
  free: string,
  reserved: string,
  pending_withdrawal: string,
};

export type Balance = {
  __typename: "Balance",
  main_account: string,
  asset: string,
  free: string,
  reserved: string,
  pending_withdrawal: string,
};

export type OrderUpdateInput = {
  main_account: string,
  id: string,
  time: string,
  m: string,
  side: OrderSide,
  order_type: OrderType,
  status: OrderStatus,
  price: string,
  qty: string,
  avg_filled_price: string,
  filled_quantity: string,
  fee: string,
};

export enum OrderType {
  LIMIT = "LIMIT",
  MARKET = "MARKET",
}


export enum OrderStatus {
  OPEN = "OPEN",
  PARTIAL = "PARTIAL",
  CLOSED = "CLOSED",
  CANCELLED = "CANCELLED",
}


export type Order = {
  __typename: "Order",
  main_account: string,
  id: string,
  time: string,
  m: string,
  side: OrderSide,
  order_type: OrderType,
  status: OrderStatus,
  price: string,
  qty: string,
  avg_filled_price: string,
  filled_quantity: string,
  fee: string,
};

export type AddNewTradeInput = {
  main_account: string,
  m: string,
  p: string,
  q: string,
  time: string,
};

export type Trade = {
  __typename: "Trade",
  main_account: string,
  m: string,
  p: string,
  q: string,
  time: string,
};

export type TransactionUpdateInput = {
  main_account: string,
  txn_type: TransactionType,
  asset: string,
  amount: string,
  fee: string,
  status: TransactionStatus,
  time: string,
};

export enum TransactionType {
  DEPOSIT = "DEPOSIT",
  WITHDRAW = "WITHDRAW",
}


export enum TransactionStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  FAILED = "FAILED",
}


export type Transaction = {
  __typename: "Transaction",
  main_account: string,
  txn_type: TransactionType,
  asset: string,
  amount: string,
  fee: string,
  status: TransactionStatus,
  time: string,
};

export type CandleStickInput = {
  m: string,
  interval: string,
  o: string,
  c: string,
  h: string,
  l: string,
  v_base: string,
  v_quote: string,
  t: string,
};

export type CandleStick = {
  __typename: "CandleStick",
  m: string,
  interval: string,
  o: string,
  c: string,
  h: string,
  l: string,
  v_base: string,
  v_quote: string,
  t: string,
};

export type Orderbook = {
  __typename: "Orderbook",
  items?:  Array<SetPriceLevel | null > | null,
  nextToken?: string | null,
};

export type KlinesConnection = {
  __typename: "KlinesConnection",
  items?:  Array<CandleStick | null > | null,
};

export type TickersConnection = {
  __typename: "TickersConnection",
  items?:  Array<TickerStats | null > | null,
  nextToken?: string | null,
};

export type ProxyConnection = {
  __typename: "ProxyConnection",
  items?: Array< string | null > | null,
  nextToken?: string | null,
};

export type BalanceConnection = {
  __typename: "BalanceConnection",
  items?:  Array<Balance | null > | null,
  nextToken?: string | null,
};

export type OrdersConnection = {
  __typename: "OrdersConnection",
  items?:  Array<Order | null > | null,
  nextToken?: string | null,
};

export type TransactionsConnection = {
  __typename: "TransactionsConnection",
  items?:  Array<Transaction | null > | null,
  nextToken?: string | null,
};

export type TradesConnection = {
  __typename: "TradesConnection",
  items?:  Array<Trade | null > | null,
  nextToken?: string | null,
};

export type SetOrderbookPutsMutationVariables = {
  input: SetOrderbookInput,
};

export type SetOrderbookPutsMutation = {
  setOrderbookPuts?:  Array< {
    __typename: "SetPriceLevel",
    price: string,
    qty: string,
    side?: OrderSide | null,
  } | null > | null,
};

export type SetOrderbookDelsMutationVariables = {
  input: SetOrderbookInput,
};

export type SetOrderbookDelsMutation = {
  setOrderbookDels?:  Array< {
    __typename: "SetPriceLevel",
    price: string,
    qty: string,
    side?: OrderSide | null,
  } | null > | null,
};

export type SetTickerStatsMutationVariables = {
  input: TickerStatInput,
};

export type SetTickerStatsMutation = {
  setTickerStats?:  {
    __typename: "TickerStats",
    m: string,
    priceChange24Hr: string,
    priceChangePercent24Hr: string,
    open: string,
    close: string,
    high: string,
    low: string,
    volumeBase24hr: string,
    volumeQuote24Hr: string,
  } | null,
};

export type PublishMutationVariables = {
  name: string,
  data: string,
};

export type PublishMutation = {
  publish?:  {
    __typename: "Channel",
    name: string,
    data: string,
  } | null,
};

export type AddProxyMutationVariables = {
  main_account: string,
  proxy_account: string,
};

export type AddProxyMutation = {
  addProxy?:  {
    __typename: "User",
    main_account: string,
    proxy_accounts?: string | null,
  } | null,
};

export type RemoveProxyMutationVariables = {
  main_account: string,
  proxy_account: string,
};

export type RemoveProxyMutation = {
  removeProxy?:  {
    __typename: "User",
    main_account: string,
    proxy_accounts?: string | null,
  } | null,
};

export type SetBalanceMutationVariables = {
  input: BalanceUpdateInput,
};

export type SetBalanceMutation = {
  setBalance?:  {
    __typename: "Balance",
    main_account: string,
    asset: string,
    free: string,
    reserved: string,
    pending_withdrawal: string,
  } | null,
};

export type SetOrderMutationVariables = {
  input: OrderUpdateInput,
};

export type SetOrderMutation = {
  setOrder?:  {
    __typename: "Order",
    main_account: string,
    id: string,
    time: string,
    m: string,
    side: OrderSide,
    order_type: OrderType,
    status: OrderStatus,
    price: string,
    qty: string,
    avg_filled_price: string,
    filled_quantity: string,
    fee: string,
  } | null,
};

export type AddNewTradeMutationVariables = {
  input: AddNewTradeInput,
};

export type AddNewTradeMutation = {
  addNewTrade?:  {
    __typename: "Trade",
    main_account: string,
    m: string,
    p: string,
    q: string,
    time: string,
  } | null,
};

export type SetTransactionMutationVariables = {
  input: TransactionUpdateInput,
};

export type SetTransactionMutation = {
  setTransaction?:  {
    __typename: "Transaction",
    main_account: string,
    txn_type: TransactionType,
    asset: string,
    amount: string,
    fee: string,
    status: TransactionStatus,
    time: string,
  } | null,
};

export type SetCandleStickMutationVariables = {
  input: CandleStickInput,
};

export type SetCandleStickMutation = {
  setCandleStick?:  {
    __typename: "CandleStick",
    m: string,
    interval: string,
    o: string,
    c: string,
    h: string,
    l: string,
    v_base: string,
    v_quote: string,
    t: string,
  } | null,
};

export type GetChannelQuery = {
  // Get WSS streams
  getChannel?:  {
    __typename: "Channel",
    name: string,
    data: string,
  } | null,
};

export type GetOrderbookQueryVariables = {
  market: string,
  limit?: number | null,
  nextToken?: string | null,
};

export type GetOrderbookQuery = {
  // Get orderbook
  getOrderbook?:  {
    __typename: "Orderbook",
    items?:  Array< {
      __typename: "SetPriceLevel",
      price: string,
      qty: string,
      side?: OrderSide | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetKlinesbyMarketIntervalQueryVariables = {
  market: string,
  interval: string,
  from: string,
  to: string,
};

export type GetKlinesbyMarketIntervalQuery = {
  // Get Klines
  getKlinesbyMarketInterval?:  {
    __typename: "KlinesConnection",
    items?:  Array< {
      __typename: "CandleStick",
      m: string,
      interval: string,
      o: string,
      c: string,
      h: string,
      l: string,
      v_base: string,
      v_quote: string,
      t: string,
    } | null > | null,
  } | null,
};

export type GetAllMarketTickersQuery = {
  // Get all market tickers
  getAllMarketTickers?:  {
    __typename: "TickersConnection",
    items?:  Array< {
      __typename: "TickerStats",
      m: string,
      priceChange24Hr: string,
      priceChangePercent24Hr: string,
      open: string,
      close: string,
      high: string,
      low: string,
      volumeBase24hr: string,
      volumeQuote24Hr: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type FindUserByProxyAccountQueryVariables = {
  proxy_account: string,
};

export type FindUserByProxyAccountQuery = {
  // Finds User by proxy account
  findUserByProxyAccount?:  {
    __typename: "ProxyConnection",
    items?: Array< string | null > | null,
    nextToken?: string | null,
  } | null,
};

export type FindUserByMainAccountQueryVariables = {
  main_account: string,
};

export type FindUserByMainAccountQuery = {
  // Finds User by main account
  findUserByMainAccount?:  {
    __typename: "User",
    main_account: string,
    proxy_accounts?: string | null,
  } | null,
};

export type FindBalanceByMainAccountQueryVariables = {
  main_account: string,
  asset: string,
};

export type FindBalanceByMainAccountQuery = {
  // Find Asset Balance by Main Account
  findBalanceByMainAccount?:  {
    __typename: "Balance",
    main_account: string,
    asset: string,
    free: string,
    reserved: string,
    pending_withdrawal: string,
  } | null,
};

export type GetAllBalancesByMainAccountQueryVariables = {
  main_account: string,
};

export type GetAllBalancesByMainAccountQuery = {
  // Get all Asset Balances by Main Account
  getAllBalancesByMainAccount?:  {
    __typename: "BalanceConnection",
    items?:  Array< {
      __typename: "Balance",
      main_account: string,
      asset: string,
      free: string,
      reserved: string,
      pending_withdrawal: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type FindOrderByMainAccountQueryVariables = {
  main_account: string,
  order_id: string,
  market: string,
};

export type FindOrderByMainAccountQuery = {
  // Find Order by Main Account
  findOrderByMainAccount?:  {
    __typename: "Order",
    main_account: string,
    id: string,
    time: string,
    m: string,
    side: OrderSide,
    order_type: OrderType,
    status: OrderStatus,
    price: string,
    qty: string,
    avg_filled_price: string,
    filled_quantity: string,
    fee: string,
  } | null,
};

export type ListOrderHistorybyMainAccountQueryVariables = {
  main_account: string,
  from: string,
  to: string,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListOrderHistorybyMainAccountQuery = {
  // Get Order history based on time
  listOrderHistorybyMainAccount?:  {
    __typename: "OrdersConnection",
    items?:  Array< {
      __typename: "Order",
      main_account: string,
      id: string,
      time: string,
      m: string,
      side: OrderSide,
      order_type: OrderType,
      status: OrderStatus,
      price: string,
      qty: string,
      avg_filled_price: string,
      filled_quantity: string,
      fee: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type ListOpenOrdersByMainAccountQueryVariables = {
  main_account: string,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListOpenOrdersByMainAccountQuery = {
  // List open orders
  listOpenOrdersByMainAccount?:  {
    __typename: "OrdersConnection",
    items?:  Array< {
      __typename: "Order",
      main_account: string,
      id: string,
      time: string,
      m: string,
      side: OrderSide,
      order_type: OrderType,
      status: OrderStatus,
      price: string,
      qty: string,
      avg_filled_price: string,
      filled_quantity: string,
      fee: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type ListTransactionsByMainAccountQueryVariables = {
  main_account: string,
  from: string,
  to: string,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTransactionsByMainAccountQuery = {
  // List transactions
  listTransactionsByMainAccount?:  {
    __typename: "TransactionsConnection",
    items?:  Array< {
      __typename: "Transaction",
      main_account: string,
      txn_type: TransactionType,
      asset: string,
      amount: string,
      fee: string,
      status: TransactionStatus,
      time: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type ListTradesByMainAccountQueryVariables = {
  main_account: string,
  from: string,
  to: string,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTradesByMainAccountQuery = {
  // List trades
  listTradesByMainAccount?:  {
    __typename: "TradesConnection",
    items?:  Array< {
      __typename: "Trade",
      main_account: string,
      m: string,
      p: string,
      q: string,
      time: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type OnBalanceUpdateSubscriptionVariables = {
  main_account: string,
};

export type OnBalanceUpdateSubscription = {
  // Balance updates
  onBalanceUpdate?:  {
    __typename: "Balance",
    main_account: string,
    asset: string,
    free: string,
    reserved: string,
    pending_withdrawal: string,
  } | null,
};

export type OnOrderUpdateSubscriptionVariables = {
  main_account: string,
};

export type OnOrderUpdateSubscription = {
  // Order History and updates
  onOrderUpdate?:  {
    __typename: "Order",
    main_account: string,
    id: string,
    time: string,
    m: string,
    side: OrderSide,
    order_type: OrderType,
    status: OrderStatus,
    price: string,
    qty: string,
    avg_filled_price: string,
    filled_quantity: string,
    fee: string,
  } | null,
};

export type OnCreateTradeSubscriptionVariables = {
  main_account: string,
};

export type OnCreateTradeSubscription = {
  // Trade History updates
  onCreateTrade?:  {
    __typename: "Trade",
    main_account: string,
    m: string,
    p: string,
    q: string,
    time: string,
  } | null,
};

export type OnUpdateTransactionSubscriptionVariables = {
  main_account: string,
};

export type OnUpdateTransactionSubscription = {
  // Deposit and Withdrawal Events
  onUpdateTransaction?:  {
    __typename: "Transaction",
    main_account: string,
    txn_type: TransactionType,
    asset: string,
    amount: string,
    fee: string,
    status: TransactionStatus,
    time: string,
  } | null,
};

export type OnCandleStickEventsSubscriptionVariables = {
  m: string,
  interval: string,
};

export type OnCandleStickEventsSubscription = {
  // Candle Stick Events
  onCandleStickEvents?:  {
    __typename: "CandleStick",
    m: string,
    interval: string,
    o: string,
    c: string,
    h: string,
    l: string,
    v_base: string,
    v_quote: string,
    t: string,
  } | null,
};

export type Websocket_streamsSubscriptionVariables = {
  name: string,
};

export type Websocket_streamsSubscription = {
  // General Trade streams
  websocket_streams?:  {
    __typename: "Channel",
    name: string,
    data: string,
  } | null,
};

export type OnNewTickerSubscriptionVariables = {
  m: string,
};

export type OnNewTickerSubscription = {
  // Ticker Streams
  onNewTicker?:  {
    __typename: "TickerStats",
    m: string,
    priceChange24Hr: string,
    priceChangePercent24Hr: string,
    open: string,
    close: string,
    high: string,
    low: string,
    volumeBase24hr: string,
    volumeQuote24Hr: string,
  } | null,
};
