import styled from "styled-components";
import { generateMedia } from "styled-media-query";

import { normalizeValue } from "@/utils/normalize";

const customMedia = generateMedia({
  large: "923px",
});

export const HomeLayout = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  justify-content: space-between;
`;

export const Sticker = styled.div`
  position: absolute;
  right: ${normalizeValue(-8.5)};
  top: 50%;
  transform: translateY(-50%) rotate(-90deg);
  padding: ${normalizeValue(1)} ${normalizeValue(1.5)};
  background-color: black;
  color: white;
  font-size: ${normalizeValue(1.8)};
  ${customMedia.greaterThan("large")`
  display:none
  `}
`;
