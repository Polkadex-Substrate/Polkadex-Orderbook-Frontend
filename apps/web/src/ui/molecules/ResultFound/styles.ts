import styled from "styled-components";

import { normalizeValue } from "@/utils/normalize";

export const Wrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: ${normalizeValue(4)} ${normalizeValue(2)};
  p {
    margin-top: ${normalizeValue(1)};
    font-size: ${normalizeValue(1.3)};
  }
  svg {
    width: ${normalizeValue(4)};
    height: ${normalizeValue(4)};
  }
`;
