import styled, { css } from "styled-components";
import media, { generateMedia } from "styled-media-query";

import { Wrapper as Button } from "@polkadex/orderbook-ui/molecules/Button/styles";

const customMedia = generateMedia({
  custom: "1060px",
});

export const Wrapper = styled.section`
  display: grid;
  grid-template-columns: auto auto;
  margin-bottom: 1rem;
  ${customMedia.lessThan("custom")`
    grid-template-columns: 1fr;
    padding-left: 0;
  `}
`;

export const ContainerPair = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-right: 2rem;
  ${customMedia.lessThan("custom")`
      margin-right:1rem;
    `}
`;

export const ContainerInfo = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: repeat(4, auto);
    grid-column-gap: 3rem;
    border-radius: 0 0 3rem 3rem;
    background: ${theme.colors.tertiaryBackground};
    box-shadow: ${theme.shadows.smooth};
    padding: 1.5rem 2.5rem;
    width: -webkit-fill-available;
    ${media.lessThan("medium")`
    grid-template-columns: 1fr 1fr;
    grid-row-gap: 0.5rem;
    grid-column-gap: 1rem;
  `}
  `}
`;
export const WrapperInfo = styled.div`
  display: flex;
  @media screen and (max-width: 880px) {
    flex-direction: column;
  }
`;

export const Box = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-self: flex-end;
    ${Button} {
      transition: background 0.5s ease-in-out;
      background: ${theme.colors.primary};
      :hover {
        background: ${theme.colors.primary}D8;
      }
    }
  `}
`;

export const VolumeHigh = styled.div`
  ${({ theme }) => css`
    p {
      color: inherit;
    }
  `}
`;

export const VolumeLow = styled.div<{ isNegative?: boolean }>`
  ${({ theme, isNegative }) => css`
    p {
      color: inherit;
    }
  `}
`;

export const WrapperVolume = styled.div`
  span {
    margin-right: 1rem;
    font-size: 1.1rem;
    color: #8ba1be;
    opacity: 0.7;
    font-weight: 500;
  }
  div {
    display: flex;
    flex-direction: row;
  }
  p {
    font-weight: 500;
  }
`;

// Dropdown
export const WrapperDropdownContent = styled.a`
  padding: 0.5rem;
  & :not(:last-child) {
    margin-bottom: 1rem;
  }
  & :hover {
    opacity: 0.7;
  }
`;

export const DropdownTitle = styled.p`
  font-size: 1.3rem;
  font-weight: 600;
`;

export const DropdownDescription = styled.p`
  font-size: 1.2rem;
  opacity: 0.6;
`;
