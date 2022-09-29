import styled from "styled-components";

export const Flex = styled.div`
  display: flex;
`;

export const FlexColumn = styled(Flex)`
  display: flex;
  flex-direction: column;
`;

export const FlexCenter = styled(Flex)`
  align-items: center;
`;

export const SpaceBetween = styled(Flex)`
  justify-content: space-between;
`;

export const SpaceBetweenCenter = styled(Flex)`
  justify-content: space-between;
  align-items: center;
  h3 {
    font-size: 1.6rem;
    font-weight: 550;
  }
`;

export const Grid = styled.div`
  display: flex;
`;

export const Template = styled.div`
  width: 100%;
  height: 100vh;
  /* background: #ff99008d; */
`;
