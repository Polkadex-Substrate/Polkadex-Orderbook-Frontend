import { AllHTMLAttributes } from "react";

export type Props = {
  onNavigate: (value: string) => void;
};

export type Card = {
  title: string;
  description?: string;
  icon: string;
} & Pick<AllHTMLAttributes<HTMLDivElement>, "onClick">;
