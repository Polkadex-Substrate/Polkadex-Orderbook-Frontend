import styled from "styled-components";
import media from "styled-media-query";
export const Section = styled.section`
  padding: 1rem 0;
`;

// Header
export const Header = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  padding: 2rem 0;
  align-items: center;
  ${media.lessThan("large")`
      grid-template-columns: 1fr;
      grid-row-gap: 2rem;
    `}

  & .react-tabs__tab {
    opacity: 0.6;
  }

  & .react-tabs__tab--selected {
    opacity: 1;
    color: white;
    padding: 1rem 0;
    border-bottom: 2px solid white;
  }
  & .react-tabs__tab:not(:last-child) {
    margin-right: 2rem;
  }
`;
export const Tab = styled.ul`
  li {
    font-size: 1.4rem;
    font-weight: 800;
    display: inline-block;
  }

  li :not(:last-child) {
    margin-right: 2rem;
  }
`;
export const WrapperActions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const ContainerActions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 1rem;
`;

export const ContainerTransactions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
