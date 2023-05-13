import { Dispatch, FC, ReactNode, SetStateAction } from "react";

export type RegisteredElements = {
  tabs: number;
  panels: number;
};

export type TabsinitialState = [number, Dispatch<SetStateAction<number>>];

export type TabsComponent = FC<{
  state?: TabsinitialState;
  children: ReactNode;
}>;
