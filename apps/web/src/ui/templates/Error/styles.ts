import styled from "styled-components";

import { normalizeValue } from "@/utils/normalize";

export const Wrapper = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.div`
  max-width: 1200px;

  @media screen and (max-width: 900px) {
    padding: ${normalizeValue(2)};
    grid-template-columns: 1fr;
    row-gap: ${normalizeValue(3)};
    text-align: center;
  }

  @media screen and (min-width: 900px) and (max-width: 1200px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 1200px) {
    padding: ${normalizeValue(2)};
  }

  @media screen and (min-width: 1200px) {
    grid-template-columns: 1fr 2fr;
  }
  margin: 0 auto;
  display: grid;
  align-items: center;
  column-gap: ${normalizeValue(4)};
`;

export const TitleContainer = styled.div`
  & h1 {
    font-size: ${normalizeValue(12)};
  }

  & h2 {
    font-size: ${normalizeValue(4)};
    margin-bottom: ${normalizeValue(2)};
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
