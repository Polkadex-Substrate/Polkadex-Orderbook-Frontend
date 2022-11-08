import styled, { css } from "styled-components";
import { motion } from "framer-motion";

export const Wrapper = styled(motion.section)`
  ${({ theme }) => css`
    min-height: 100vh;
    display: flex;
    background: ${theme.colors.primaryBackground};
  `}
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  column-gap: 2rem;
  flex: 1;
`;

export const Header = styled.div`
  padding: 2rem 1rem;
`;

export const LogoWrapper = styled.a`
  max-width: 12rem;
  margin: 0 auto;
  display: block;
  cursor: pointer;
`;
export const Content = styled.div`
  flex: 1;
  background: linear-gradient(
    182.33deg,
    rgba(139, 161, 190, 0.05) 1.95%,
    rgba(139, 161, 190, 0) 62.7%
  );
  filter: drop-shadow(0px -11px 128px rgba(0, 0, 0, 0.52));
  border-radius: 30px;
  @media screen and (min-width: 930px) {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
  }
`;

export const AsideLeft = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    padding: 3rem;
    @media screen and (min-width: 1200px) {
      padding: 5rem;
      max-width: 48rem;
    }
    @media screen and (min-width: 930px) and (max-width: 1200px) {
      max-width: 40rem;
    }
    @media screen and (max-width: 930px) {
      margin-bottom: 4rem;
    }
    span {
      width: fit-content;
      background: ${theme.colors.primary};
      color: ${theme.colors.black};
      border-radius: 0.5rem;
      padding: 0.2rem 0.4rem;
      font-weight: bold;
      font-size: 1.5rem;
    }
    h1 {
      font-size: 5rem;
      font-weight: 550;
      margin-bottom: 1.5rem;
    }
    p {
      font-size: 1.6rem;
      line-height: 1.4;
      a {
        color: ${theme.colors.primary};
        font-weight: 500;
      }
    }

    small {
      margin-top: 3rem;
      font-size: 1.4rem;
      color: gray;
    }
  `}
`;
export const AsideRight = styled.div`
  svg {
    width: 100%;
  }
`;
export const Social = styled.div`
  ${({ theme }) => css`
    margin-top: 1rem;
    a {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      border-radius: 1rem;
      background: ${theme.colors.secondaryBackground};
      width: fit-content;
      padding: 0.8rem 1rem;
      font-size: 1.4rem;
      transition: background-color 0.4s ease-in-out;
      div {
        width: 2rem;
        height: 2rem;
      }
      :hover {
        background: ${theme.colors.secondaryBackgroundOpacity};
      }
    }
  `}
`;
