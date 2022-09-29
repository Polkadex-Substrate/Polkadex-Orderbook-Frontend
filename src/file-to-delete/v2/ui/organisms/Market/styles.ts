import styled from "styled-components";

export const Section = styled.section`
  background: #2e303c;
  border-radius: 0 3rem 0 0;
  padding: 2rem 1rem;
  margin-left: 1rem;
  min-width: 32rem;
`;
export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;
export const WrapperActions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;
export const ContainerActions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 0.5rem;
`;
export const WrapperTokens = styled.div``;
export const ContainerTokensTitle = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr 1fr;
  grid-column-gap: 1rem;
`;
export const ContainerTokens = styled.div``;
