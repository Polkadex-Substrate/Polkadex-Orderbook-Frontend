import styled from "styled-components";

import { normalizeValue } from "@/utils/normalize";

export const Wrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const Container = styled.div`
  text-align: center;
  padding: 4rem ${normalizeValue(2)};
  p {
    margin-top: ${normalizeValue(1)};
  }
  svg {
    width: 4rem;
  }
`;
