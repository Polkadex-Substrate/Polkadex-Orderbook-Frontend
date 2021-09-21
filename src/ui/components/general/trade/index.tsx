import { useState } from 'react';
import { Tab, TabList, TabPanel,Tabs } from 'react-tabs';

import MarketType from './components/marketType';
import * as S from './styles'

const Trade = () => {
  const [state, setState] = useState("Market Order")
  const handleChange = (select: string) => setState(select)

  return (
    <S.Wrapper>
      <Tabs>
        <S.Header>
          <TabList>
            <Tab>Buy DOT</Tab>
            <Tab>Sell DOT</Tab>
          </TabList>
          <MarketType />
        </S.Header>
        <TabPanel>

        </TabPanel>
        <TabPanel>

        </TabPanel>
      </Tabs>
    </S.Wrapper>
  )
}

export default Trade
