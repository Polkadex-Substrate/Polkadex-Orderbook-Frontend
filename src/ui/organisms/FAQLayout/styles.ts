import styled from "styled-components";
import { generateMedia } from "styled-media-query";

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
