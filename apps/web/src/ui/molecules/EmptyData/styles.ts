import styled from "styled-components";

import { normalizeValue } from "@/utils/normalize";

export const Wrapper = styled.div`
  flex: 1;
  height: 100%;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  /* padding: ${normalizeValue(3)} ${normalizeValue(1)}; */
`;

export const Box = styled.div`
  text-align: center;
  img {
    margin-bottom: ${normalizeValue(1)};
    max-width: ${normalizeValue(7)};
    width: 100%;
  }
  p {
    font-size: ${normalizeValue(1.3)};
  }
`;
