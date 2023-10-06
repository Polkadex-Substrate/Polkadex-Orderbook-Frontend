import { AllHTMLAttributes } from "react";

export type Props = {
  address: string;
  onNavigate: (value: string) => void;
  logout: () => void;
};

export type Card = {
  title: string;
  description?: string;
  icon: string;
} & Pick<AllHTMLAttributes<HTMLDivElement>, "onClick">;
