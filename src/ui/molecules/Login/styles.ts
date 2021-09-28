import styled, { css } from "styled-components";

import { Wrapper as DropdownItem } from "src/ui/organisms/MyAccount/styles";
import { Wrapper as InputWrapper } from "src/ui/molecules/Input/styles";

export const Wrapper = styled.div`
  ${InputWrapper} {
    margin: 1rem 0;
  }
`;

export const MyCurrentAccountContent = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.secondaryBackgroundSolid};
    padding: 1rem;
    border-radius: 0.5rem;
    width: 100%;
    shadow: ${theme.shadow.primary};
    ${DropdownItem} {
      cursor: pointer;
      :not(:last-child) {
        margin-bottom: 1rem;
      }
    }
  `}
`;
