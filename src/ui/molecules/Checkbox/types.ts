import { InputHTMLAttributes } from "react";

type Props = {
  label?: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default Props;
