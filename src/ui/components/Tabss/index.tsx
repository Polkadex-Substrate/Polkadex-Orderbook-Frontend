import { Children, cloneElement, ReactElement, useState } from "react";

import * as S from "./styles";
import { Props, TabProps } from "./types";

import { Button } from "src/ui/components/Button";

export const Tabs = ({
  defaultActiveTabIndex = 0,
  children,
  ...props
}: Props) => {
  const [state, setState] = useState({ activeTabIndex: defaultActiveTabIndex });

  // Toogle currently active tab
  const handleTabClick = (tabIndex: number) =>
    setState({
      activeTabIndex:
        tabIndex === state.activeTabIndex ? defaultActiveTabIndex : tabIndex,
    });

  // Clone Component
  const RenderTab = () => {
    return Children.map(children, (child, index) => {
      return cloneElement(child as ReactElement, {
        onClick: handleTabClick,
        tabIndex: index,
        isActive: index === state.activeTabIndex,
      });
    });
  };

  // Render current active tab content
  const renderActiveTabContent = () => {
    if (children[state.activeTabIndex]) {
      return children[state.activeTabIndex].props.children;
    }
  };

  return (
    <S.Wrapper>
      <ul {...props}>{RenderTab()}</ul>
      <S.Content>{renderActiveTabContent()}</S.Content>
    </S.Wrapper>
  );
};

export const TabHeader = ({
  onClick,
  tabIndex,
  title,
  icon,
  ...props
}: TabProps) => {
  return (
    <S.WrapperTab {...props}>
      <a
        onClick={(e) => {
          e.preventDefault();
          onClick(tabIndex);
        }}
      >
        <Button title={title} active={props.isActive} icon={icon} />
      </a>
    </S.WrapperTab>
  );
};
