import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { AssetsTable } from "../AssetsTable";

import * as S from "./styles";

import { Icons } from "@/ui/atoms";
import { Checkbox, Search } from "@/ui/molecules";

export const AssetsInteraction = ({ open, handleClose }) => {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        open={open}
        onClose={handleClose}
        style={{ position: "relative", zIndex: 100 }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <S.Overlay />
        </Transition.Child>
        <S.Modal>
          <S.ModalWrapper>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <S.ModalPanel>
                <S.ModalTitle>
                  <Icons.SingleArrowLeft />
                </S.ModalTitle>
                <S.ModalContent>
                  <h3>Assets</h3>
                  <S.ModalContentHeader>
                    <Checkbox labelProps={{ style: { whiteSpace: "nowrap" } }}>
                      Hide 0 balances
                    </Checkbox>
                    <Search hasBorder={false} placeholder="Search" />
                  </S.ModalContentHeader>
                  <S.ModalContentTable>
                    <AssetsTable />
                  </S.ModalContentTable>
                </S.ModalContent>
              </S.ModalPanel>
            </Transition.Child>
          </S.ModalWrapper>
        </S.Modal>
      </Dialog>
    </Transition>
  );
};
