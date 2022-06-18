import axios from "axios";
import React, { useEffect, useState } from "react";

// Fake Data
import {
  fakeGetGraphData,
  fakeOrderBook,
  fakeTransactionsOrders,
  coinMarketCapInstance,
} from "./fakeData";
import * as S from "./styles";

import Graph from "@polkadex/orderbook/v3/ui/organisms/Graph";
import Market from "@polkadex/orderbook/v3/ui/organisms/Market";
import MarketOrder from "@polkadex/orderbook/v3/ui/organisms/MarketOrder";
import Menu from "@polkadex/orderbook/v3/ui/organisms/Menu";
import Navbar from "@polkadex/orderbook/v3/ui/organisms/Navbar";
import Transactions from "@polkadex/orderbook/v3/ui/organisms/Transactions";

export function Trading() {
  const [state, setState] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [orderbook, setOrderbook] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [coin, setCoin] = useState<any>([]);

  // Fake Transactions Orders Actions
  const getTransactionsOrders = () => setTransactions(fakeTransactionsOrders);
  const removeTransactionsOrder = (id: string) => {
    // Cancel Action
    const removeItem = transactions.filter((item) => item.id !== id);
    setTransactions(removeItem);
  };

  // Fake OrderBook Actions
  const getOrderBookOrders = () => setOrderbook(fakeOrderBook);

  // Fake Graph Actions
  const getGraphData = async () => {
    const data = await fakeGetGraphData();
    setGraphData(data.slice(0, 100));
  };

  // Data from CoinMarketCap

  const getCoinMarketCap = async () => {
    console.log("Starting");

    const data = await coinMarketCapInstance.get("/v1/cryptocurrency/info");
    console.log("Result", data);
    throw new Error("Error");

    setCoin(data);
  };
  useEffect(() => {
    getTransactionsOrders();
    getOrderBookOrders();
    getGraphData();
  }, []);

  return (
    <S.Wrapper>
      <Menu handleChange={() => setState(!state)} />
      {state && <Market />}
      <S.WrapperMain>
        <Navbar />
        <S.WrapperGraph>
          <Graph orderbook={orderbook} graphData={graphData} />
          <MarketOrder />
        </S.WrapperGraph>

        <Transactions data={transactions} remove={removeTransactionsOrder} />
      </S.WrapperMain>
    </S.Wrapper>
  );
}
