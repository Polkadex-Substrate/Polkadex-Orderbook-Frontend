import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Container = styled.div`
  :not(:last-child) {
    margin-right: 3rem;
  }
  :last-child {
    display: flex;
    align-items: center;
  }
`;
