import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { subDays } from "date-fns";
import { DateRangePicker, defaultStaticRanges } from "react-date-range";
import { tz } from "moment-timezone";

import * as S from "./styles";

import { OrderBook } from "@polkadex/orderbook-ui/organisms";
import { TradingChart } from "@polkadex/orderbook-ui/organisms/TradingChart";
import {
  AvailableMessage,
  Icon,
  ListItemButton,
  OriginalChart,
  Checkbox,
  Popover,
  Dropdown,
} from "@polkadex/orderbook-ui/molecules";
import { Icons } from "@polkadex/orderbook-ui/atoms";
import { useWindowSize } from "@polkadex/orderbook-hooks";
import {
  chartType,
  mainTechnicalIndicatorTypes,
  subTechnicalIndicatorTypes,
} from "@polkadex/orderbook-ui/molecules/OriginalChart/options";

const filters = ["1m", "5m", "15m", "30m", "1H", "6H", "1D", "1W"];

export const Graph = () => {
  const now = useRef(new Date());
  const chart = useRef(null);

  const [state, setState] = useState(chartType[0]);
  const [isOriginal, setIsOrigina] = useState(true);
  const [filter, setFilter] = useState("1m");
  const [space, setSpace] = useState(10);
  const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);

  const [mainTechnicalIndicator, setMainTechnicalIndicator] = useState(
    mainTechnicalIndicatorTypes
  );
  const [subTechnicalIndicator, setSubTechnicalIndicator] = useState(
    subTechnicalIndicatorTypes
  );

  const [to, setTo] = useState(now.current);
  const [from, setFrom] = useState(subDays(now.current, 5));

  const handleSelect = useCallback(({ selection: { startDate, endDate } }) => {
    setFrom(startDate);
    setTo(endDate);
  }, []);

  const ranges = useMemo(() => {
    return [
      {
        startDate: from,
        endDate: to,
        key: "selection",
      },
    ];
  }, [from, to]);

  useEffect(() => {
    chart?.current?.setDataSpace(space);
  }, [space]);

  useEffect(() => {
    chart?.current?.setTimezone(timezone);
  }, [timezone]);

  const { width } = useWindowSize();
  return (
    <S.Wrapper>
      <S.WrapperGraph>
        <S.Header>
          <S.FlexWrapper>
            <S.List>
              <Dropdown>
                <Dropdown.Trigger>
                  <div>
                    <Icon
                      name="Settings"
                      stroke="text"
                      size="extraMedium"
                      background="primaryBackgroundOpacity"
                    />
                  </div>
                </Dropdown.Trigger>
                <Dropdown.Menu fill="tertiaryBackground">
                  <Dropdown.Section title="Main Indicator">
                    {mainTechnicalIndicator.map(({ key, name, isActive }) => (
                      <Dropdown.Item
                        key={key}
                        onAction={() => {
                          isActive
                            ? chart.current.removeTechnicalIndicator("candle_pane", key)
                            : chart.current.createTechnicalIndicator(key, false, {
                                id: "candle_pane",
                              });
                          setMainTechnicalIndicator((prevState) => {
                            const newState = prevState.map((item) => {
                              if (item.key === key) {
                                return {
                                  ...item,
                                  isActive: !item.isActive,
                                };
                              }
                              return item;
                            });
                            return newState;
                          });
                        }}>
                        <Checkbox checked={isActive}>{name}</Checkbox>
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Section>
                  <Dropdown.Section title="Sub Indicator">
                    {subTechnicalIndicator.map(({ key, name, isActive }) => (
                      <Dropdown.Item
                        key={key}
                        onAction={() => {
                          isActive
                            ? chart.current.removeTechnicalIndicator(key, key)
                            : chart.current.createTechnicalIndicator(key, false, {
                                id: key,
                              });
                          setSubTechnicalIndicator((prevState) => {
                            const newState = prevState.map((item) => {
                              if (item.key === key) {
                                return {
                                  ...item,
                                  isActive: !item.isActive,
                                };
                              }
                              return item;
                            });
                            return newState;
                          });
                        }}>
                        <Checkbox checked={isActive}>{name}</Checkbox>
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Section>
                </Dropdown.Menu>
              </Dropdown>

              {width <= 1240 ? (
                <Dropdown>
                  <Dropdown.Trigger>
                    <S.Li isActive>{filter}</S.Li>
                  </Dropdown.Trigger>
                  <Dropdown.Menu fill="tertiaryBackground">
                    {filters.map((item) => (
                      <Dropdown.Item key={item}>
                        <S.Li isActive={item === filter} onClick={() => setFilter(item)}>
                          {item}
                        </S.Li>
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <S.Ul>
                  {filters.map((item) => (
                    <S.Li
                      key={item}
                      isActive={item === filter}
                      onClick={() => setFilter(item)}>
                      {item}
                    </S.Li>
                  ))}
                </S.Ul>
              )}
              <Popover>
                <Popover.Trigger>
                  <div>
                    <Icon
                      name="Calendar"
                      size="extraMedium"
                      background="primaryBackgroundOpacity"
                      stroke="text"
                    />
                  </div>
                </Popover.Trigger>
                <Popover.Content>
                  <DateRangePicker
                    ranges={ranges}
                    onChange={handleSelect}
                    rangeColors={["#E6007A"]}
                    staticRanges={defaultStaticRanges}
                    inputRanges={[]}
                  />
                </Popover.Content>
              </Popover>
              <Dropdown>
                <Dropdown.Trigger>
                  <div>
                    <IconComponent name={state.icon} />
                  </div>
                </Dropdown.Trigger>
                <Dropdown.Menu fill="tertiaryBackground">
                  {chartType.map((item, i) => (
                    <Dropdown.Item
                      key={i}
                      onAction={() => {
                        chart.current.setStyleOptions({
                          candle: {
                            type: item.key,
                          },
                        });
                        setState(item);
                      }}>
                      <FilterIcon icon={item.icon} isActive={state.key === item.key}>
                        {item.name}
                      </FilterIcon>
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown>
                <Dropdown.Trigger>
                  <div>
                    <Icon
                      name="Timezone"
                      size="extraMedium"
                      background="primaryBackgroundOpacity"
                      stroke="text"
                    />
                  </div>
                </Dropdown.Trigger>
                <Dropdown.Menu fill="tertiaryBackground">
                  {tz.names().map((item) => (
                    <Dropdown.Item key={item} onAction={() => setTimezone(item)}>
                      <S.Button isActive={timezone === item}>{`${item.replace("_", " ")} (${tz(
                        item
                      ).format("z Z")})`}</S.Button>
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>

              <button type="button" onClick={() => setSpace(space + 1)}>
                <Icon
                  name="ZoomOut"
                  size="extraMedium"
                  background="primaryBackgroundOpacity"
                  stroke="text"
                />
              </button>
              <button type="button" onClick={() => setSpace(space - 1)}>
                <Icon
                  name="ZoomIn"
                  size="extraMedium"
                  background="primaryBackgroundOpacity"
                  stroke="text"
                />
              </button>
            </S.List>
          </S.FlexWrapper>

          <S.FlexWrapper>
            <S.List>
              <ListItemButton
                title="Original"
                size="Small"
                isActive={isOriginal}
                onClick={() => setIsOrigina(true)}
              />
              <AvailableMessage message="Soon">
                <ListItemButton
                  title="TradingView"
                  size="Small"
                  isActive={!isOriginal}
                  onClick={() => setIsOrigina(false)}
                />
              </AvailableMessage>

              <Icon name="Expand" size="extraMedium" background="primaryBackgroundOpacity" />
            </S.List>
          </S.FlexWrapper>
        </S.Header>

        <S.ChartWrapper>
          {isOriginal ? <OriginalChart chart={chart} resolution={filter} /> : <div />}
        </S.ChartWrapper>
      </S.WrapperGraph>
      <OrderBook />
    </S.Wrapper>
  );
};

const FilterIcon = ({ icon, isActive, children, ...props }) => {
  const IconComponent = Icons[icon];
  return (
    <S.FilterIcon isActive={isActive} {...props}>
      <IconComponent />
      <span>{children}</span>
    </S.FilterIcon>
  );
};

const IconComponent = ({ name }) => {
  const Icon = Icons[name];
  return <S.IconComponent>{<Icon />}</S.IconComponent>;
};
