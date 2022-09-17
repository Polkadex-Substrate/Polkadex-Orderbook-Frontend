import styled from "styled-components";

export const Wrapper = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.div`
  max-width: 1200px;

  @media screen and (max-width: 900px) {
    padding: 2rem;
    grid-template-columns: 1fr;
    row-gap: 3rem;
    text-align: center;
  }

  @media screen and (min-width: 900px) and (max-width: 1200px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 1200px) {
    padding: 2rem;
  }

  @media screen and (min-width: 1200px) {
    grid-template-columns: 1fr 2fr;
  }
  margin: 0 auto;
  display: grid;
  align-items: center;
  column-gap: 4rem;
`;

export const TitleContainer = styled.div`
  & h1 {
    font-size: 12rem;
  }

  & h2 {
    font-size: 4rem;
    margin-bottom: 2rem;
  }

  & p {
    line-height: 1.7;
  }
`;
export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  & img {
    width: 100%;
  }
`;
