import React, {
  Fragment,
  ReactElement,
  ReactNode,
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  useMemo,
  useState,
} from "react";
import useConstant from "use-constant";

import { RegisteredElements, TabsComponent, TabsinitialState } from "./types";

const TabsState = createContext<TabsinitialState>([0, () => null]);
const Elements = createContext<RegisteredElements>({ tabs: 0, panels: 0 });

export const Tabs: TabsComponent = ({ state: outerState, children }) => {
  const innerState = useState(0);
  const elements = useConstant(() => ({ tabs: 0, panels: 0 }));
  const state = outerState || innerState;

  return (
    <Elements.Provider value={elements}>
      <TabsState.Provider value={state}>{children}</TabsState.Provider>
    </Elements.Provider>
  );
};

export const useTabState = () => {
  const [activeIndex, setActive] = useContext(TabsState);
  const elements = useContext(Elements);

  const tabIndex = useConstant(() => {
    const currentIndex = elements.tabs;
    elements.tabs += 1;

    return currentIndex;
  });

  const onClick = useConstant(() => () => setActive(tabIndex));

  const state = useMemo(
    () => ({
      isActive: activeIndex === tabIndex,
      onClick,
    }),
    [activeIndex, onClick, tabIndex]
  );

  return state;
};

export const usePanelState = () => {
  const [activeIndex] = useContext(TabsState);
  const elements = useContext(Elements);

  const panelIndex = useConstant(() => {
    const currentIndex = elements.panels;
    elements.panels += 1;

    return currentIndex;
  });

  return panelIndex === activeIndex;
};

type Props = {
  isActive?: boolean;
  onClick?: () => void;
};
export const TabHeader: React.FC<{ children: ReactElement<Props> }> = ({
  children,
}) => {
  const state = useTabState();

  return (
    <Fragment>
      {isValidElement(children)
        ? cloneElement<Props>(children, state)
        : children}
    </Fragment>
  );
};

export const TabContent: React.FC<{
  active?: boolean;
  isDisabled?: boolean;
  children: ReactNode;
}> = ({ active, isDisabled = false, children }) => {
  const isActive = usePanelState();

  return <>{(isActive && !isDisabled) || active ? children : null}</>;
};
