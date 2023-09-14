import { Dialog } from "@headlessui/react";
import styled, { css } from "styled-components";

export const Wrapper = styled.div``;

export const Overlay = styled.div`
  ${({ theme }) => css`
    position: fixed;
    background: ${theme.colors.overlayOpacity};
    inset: 0;
  `}
`;

export const Modal = styled.div`
  position: fixed;
  inset: 0;
  overflow-y: auto;
`;

export const ModalWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: flex-end;
  text-align: center;
`;

export const ModalPanel = styled(Dialog.Panel)`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 8rem;
    max-width: 45rem;
    width: 100%;
    background: ${theme.colors.secondaryBackgroundSolid};
    padding: 2rem;
  `}
`;

export const ModalTitle = styled(Dialog.Title)`
  ${({ theme }) => css`
    width: 2rem;
    svg {
      stroke: ${theme.colors.text};
    }
  `}
`;

export const ModalContent = styled.div`
  ${({ theme }) => css`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: flex-start;
    h3 {
      font-size: 1.8rem;
      font-weight: 500;
    }
  `}
`;

export const ModalContentHeader = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: 1rem;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid ${theme.colors.secondaryBackgroundOpacity};
  `}
`;

export const ModalContentTable = styled.div``;
