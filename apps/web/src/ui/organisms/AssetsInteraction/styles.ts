import { Dialog } from "@headlessui/react";
import styled, { css } from "styled-components";

import { normalizeValue } from "@/utils/normalize";

export const Wrapper = styled.div``;

export const Overlay = styled.div`
  ${({ theme }) => css`
    position: fixed;
    background: ${theme.colors.overlayOpacity};
    backdrop-filter: blur(5px);
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
  padding: ${normalizeValue(1)};
`;

export const ModalPanel = styled(Dialog.Panel)`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: ${normalizeValue(8)};
    max-width: 46rem;
    width: 100%;
    background: ${theme.colors.primaryBackground};
    padding: ${normalizeValue(2)};
    border-radius: 0 ${normalizeValue(2)} ${normalizeValue(2)}
      ${normalizeValue(2)};
    box-shadow: ${theme.shadows.quaternary};
  `}
`;

export const ModalTitle = styled(Dialog.Title)`
  ${({ theme }) => css`
    width: ${normalizeValue(2)};
    svg {
      stroke: ${theme.colors.text};
    }
  `}
`;

export const ModalContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${normalizeValue(2)};
  align-items: flex-start;
  h3 {
    font-size: ${normalizeValue(1.8)};
    font-weight: 500;
  }
`;

export const ModalContentHeader = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: ${normalizeValue(1)};
    width: 100%;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid ${theme.colors.secondaryBackgroundOpacity};
  `}
`;

export const ModalContentTable = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: auto;
`;

export const SkeletonComponent = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  gap: ${normalizeValue(1)};
  flex-direction: column;
`;
