import { ChangeEvent } from "react";

export type Props = {
  id: string;
  name: string;
  checked: boolean;
  setChecked: (e: ChangeEvent<unknown>) => void;
};
