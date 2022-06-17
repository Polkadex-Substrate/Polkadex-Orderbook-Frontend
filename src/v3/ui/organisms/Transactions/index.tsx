import { useState } from "react";

import DropdownItem from "../../molecules/DropdownItem";
import Checkbox from "../../molecules/Checkbox";
import TransactionTable from "../../molecules/TransactionTable";

import { ITransactions } from "./ITransactions";
import * as S from "./styles";

import { Dropdown, Icon, TabContent, TabHeader, Tabs } from "@polkadex/orderbook-ui/molecules";

const initialFilters = {
  hiddenPairs: false,
  onlyBuy: false,
  onlySell: false,
  status: "All Transactions",
};

const Transactions = ({ data, remove }: ITransactions, pair = "DOT") => {
  const [filters, setFilters] = useState(initialFilters);

  // Filters Actions
  const handleChangeHidden = () =>
    setFilters({ ...filters, hiddenPairs: !filters.hiddenPairs });
  const handleChangeStatus = (status: string) => setFilters({ ...filters, status });
  const handleChangeBuy = () => setFilters({ ...filters, onlyBuy: !filters.onlyBuy });
  const handleChangeSell = () => setFilters({ ...filters, onlySell: !filters.onlySell! });

  return (
    <S.Section>
      <Tabs>
        <S.Header>
          <TabHeader>Open Orders</TabHeader>
          <TabHeader>Order History</TabHeader>
          <TabHeader>Trade History</TabHeader>
          <TabHeader>Funds</TabHeader>
          <S.WrapperActions>
            <Checkbox
              title="Hide Other Pairs"
              checked={filters.hiddenPairs}
              action={handleChangeHidden}
            />
            <S.ContainerActions>
              <Checkbox title="Buy" checked={filters.onlyBuy} action={handleChangeBuy} />
              <Checkbox title="Sell" checked={filters.onlySell} action={handleChangeSell} />
            </S.ContainerActions>
            <S.ContainerTransactions>
              <Dropdown title={filters.status}>
                <>
                  <DropdownItem title="All Transactions" handleAction={handleChangeStatus} />
                  <DropdownItem title="Pending" handleAction={handleChangeStatus} />
                  <DropdownItem title="Completed" handleAction={handleChangeStatus} />
                  <DropdownItem title="Canceled" handleAction={handleChangeStatus} />
                </>
              </Dropdown>
              <Icon name="Transactions" background="secondaryBackground" />
            </S.ContainerTransactions>
          </S.WrapperActions>
        </S.Header>
        <TabContent>
          <TransactionTable data={data} remove={remove} filters={filters} />
        </TabContent>
        {/* <TabPanel>
          <TransactionTable data={data} />
        </TabPanel>
        <TabPanel>
          <TransactionTable data={data} />
        </TabPanel>
        <TabPanel>
          <TransactionTable data={data} />
        </TabPanel> */}
      </Tabs>
    </S.Section>
  );
};

export default Transactions;
