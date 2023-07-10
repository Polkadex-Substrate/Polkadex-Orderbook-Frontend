import styled, { css } from "styled-components";
import { generateMedia } from "styled-media-query";

const customMedia = generateMedia({
  large: "923px",
});

export const HomeLayout = styled.div`
  ${({ theme }) => css`
    display: flex;
    width: 100%;
    max-width: 160rem;
    max-height: 100vh;
    flex-direction: column;
    justify-content: space-between;
    margin: 0 auto;
    @media screen and (min-width: 1600px) {
      border-left: 1px solid ${theme.colors.secondaryBackground};
      border-right: 1px solid ${theme.colors.secondaryBackground};
    }
  `}
`;

export const Wrapper = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  justify-content: space-between;
  @media screen and (max-height: 830px) {
    justify-content: flex-start;
    margin-top: 3rem;
  }
`;

export const Flex = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow: hidden;
  @media screen and (min-width: 590px) {
    flex-direction: row;
  }
`;

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
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
