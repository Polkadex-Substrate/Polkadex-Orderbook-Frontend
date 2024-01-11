import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const Title = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    h4 {
      display: flex;
      flex-direction: column;
      font-weight: 550;
      font-size: 14px;
      align-items: flex-start;

      @media screen and (min-width: 440px) {
        flex-direction: row;
        gap: 0.4rem;
        align-items: center;
      }
    }
    span {
      font-weight: normal;
      opacity: 0.4;
      font-size: 14px;
    }
    div {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 25px;
      height: 25px;
      padding: 6px;
      border-radius: 10rem;
      background: ${theme.colors.white};
      svg {
        fill: ${theme.colors.black};
      }
    }
  `}
`;
export const Container = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 15px;
    p {
      line-height: 1.7;
    }
    a {
      text-decoration: underline;
      color: ${theme.colors.blue};
    }
  `}
`;
