export const orderbookTypes = {
  "chainbridge::ChainId": "u8",
  ChainId: "u8",
  ResourceId: "[u8; 32]",
  DepositNonce: "u64",
  ProposalVotes: {
    votes_for: "Vec<MultiAddress>",
    votes_against: "Vec<MultiAddress>",
    status: "enum",
  },
  Erc721Token: {
    id: "TokenId",
    metadata: "Vec<u8>",
  },
  TokenId: "U256",
  Address: "MultiAddress",
  LookupSource: "MultiAddress",
  AssetId: {
    _enum: {
      POLKADEX: null,
      Asset: "u128",
    },
  },
  CHAINSAFE: "H160",
  CurrencyIdOf: "AssetId",
  CurrencyId: "AssetId",
  ShardIdentifier: "H256",
  Balance: "u128",
  BalanceOf: "Balance",
  Message: {
    data: "Vec<u8>",
    proof: "Proof",
  },
  Proof: {
    blockHash: "H256",
    txIndex: "u32",
    data: "(Vec<Vec<u8>>, Vec<Vec<u8>>)",
  },
  EthereumHeaderId: {
    number: "u64",
    hash: "H256",
  },
  AccountInfo: {
    nonce: "Index",
    consumers: "RefCount",
    providers: "RefCount",
    sufficients: "RefCount",
    sufficients2: "u128",
    data: "AccountData",
  },
  EthereumHeader: {
    parentHash: "H256",
    timestamp: "u64",
    number: "u64",
    author: "H160",
    transactionsRoot: "H256",
    ommersHash: "H256",
    extraData: "Vec<u8>",
    stateRoot: "H256",
    receiptsRoot: "H256",
    logBloom: "Bloom",
    gasUsed: "U256",
    gasLimit: "U256",
    difficulty: "U256",
    seal: "Vec<Vec<u8>>",
  },
  StoredHeader: {
    submitter: "Option<AccountId>",
    header: "EthereumHeader",
    totalDifficulty: "U256",
  },
  EthashProofData: {
    dagNodes: "[H512; 2]",
    proof: "Vec<H128>",
  },
  Bloom: "[u8; 256]",
  PruningRange: {
    oldestUnprunedBlock: "u64",
    oldestBlockToKeep: "u64",
  },
  OrderPayload: {
    user: "AccountId",
    pair: "TradingPair",
    side: "OrderSide",
    order_type: "OrderType",
    qty: "u128",
    price: "u128",
    nonce: "u32",
  },
  TradingPair: {
    base_asset: "AssetId",
    quote_asset: "AssetId",
  },
  OrderSide: {
    _enum: {
      Ask: null,
      Bid: null,
    },
  },
  OrderType: {
    _enum: {
      LIMIT: null,
      MARKET: null,
    },
  },
};

export type orderbookTypes = typeof orderbookTypes;
