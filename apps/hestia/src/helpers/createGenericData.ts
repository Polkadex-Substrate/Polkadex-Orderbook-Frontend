const tokens = [
  { ticker: "Aave", name: "Aave" },
  { ticker: "Bal", name: "Balancer" },
  { ticker: "Comp", name: "Compound" },
  { ticker: "Dash", name: "Dash" },
  { ticker: "Eth", name: "Ethereum" },
  { ticker: "Btc", name: "Bitcoin" },
  { ticker: "Dot", name: "Polkadot" },
  { ticker: "Usdt", name: "Tether" },
  { ticker: "Inch", name: "Inch" },
  { ticker: "Uni", name: "Uniswap" },
  { ticker: "Link", name: "ChainLink" },
  { ticker: "Matic", name: "Polygon" },
  { ticker: "Sol", name: "Solana" },
  { ticker: "Bnb", name: "Binance" },
  { ticker: "Glmr", name: "Moombeam" },
  { ticker: "Astar", name: "Astar" },
  { ticker: "Eqb", name: "Equilibrium" },
  { ticker: "Xrp", name: "Ripple" },
];

export function createGenericData(repeatTimes = 18) {
  const result: any = [];

  for (let i = 0; i < repeatTimes; i++) {
    const id = Math.floor(Math.random() * 1000);
    const price = (Math.random() * 10000).toFixed(2);
    const amount = (Math.random() * 10).toFixed(6);
    const hours = Math.floor(Math.random() * 24);
    const minutes = Math.floor(Math.random() * 60);
    const seconds = Math.floor(Math.random() * 60);
    const total = `${hours}:${minutes}:${seconds}`;
    const type = Math.random() < 0.5 ? "sell" : "buy";
    const date = new Date().getTime() + 100;
    const token = tokens[i];
    const change = ((Math.floor(Math.random() * 100000) + 1) / 1000).toFixed(2);
    const item = {
      id,
      price,
      amount,
      total,
      type,
      date,
      token,
      change,
    };

    result.push(item);
  }

  return result;
}
