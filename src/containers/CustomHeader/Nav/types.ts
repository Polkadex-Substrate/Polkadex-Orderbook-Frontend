import { User } from "src/modules";

export type WalletProps = {
  user: User;
  disconnect?: () => void;
};
