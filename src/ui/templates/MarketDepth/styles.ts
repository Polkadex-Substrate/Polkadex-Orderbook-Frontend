import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${({ theme }) => css`
  margin-bottom: -20px;
  max-height: 100%;
  overflow-y: hidden;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .recharts-responsive-container .recharts-wrapper .recharts-surface .recharts-cartesian-grid {
    rect {
      fill: ${theme.colors.gradientBackground};
    }
  }
  width: 100%;
  `}
`;