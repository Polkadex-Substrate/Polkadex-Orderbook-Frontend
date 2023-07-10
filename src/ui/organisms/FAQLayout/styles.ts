import styled, { css } from "styled-components";
import { generateMedia } from "styled-media-query";

const customMedia = generateMedia({
  large: "923px",
});

export const HomeLayout = styled.div`
  ${({ theme }) => css`
    display: flex;
    max-width: 160rem;
    display: flex;
    flex-direction: column;
    width: 100%;
    position: relative;
    justify-content: space-between;
    margin: 0 auto;
    @media screen and (min-width: 1600px) {
      border-left: 1px solid ${theme.colors.secondaryBackground};
      border-right: 1px solid ${theme.colors.secondaryBackground};
    }
  `}
`;

export const Flex = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column-reverse;
  @media screen and (min-width: 590px) {
    flex-direction: row;
  }
`;

export const Sticker = styled.div`
  position: absolute;
  right: -7rem;
  top: 50%;
  transform: translateY(-50%) rotate(-90deg);
  padding: 1rem 1.5rem;
  background-color: black;
  color: white;
  font-size: 1.4rem;
  ${customMedia.greaterThan("large")`
    display:none
  `}
`;
