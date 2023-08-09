import { FormikErrors } from "formik";
import { MutableRefObject, Ref, RefObject, ReactNode, InputHTMLAttributes } from "react";

export type Props = {
  label?: string | JSX.Element;
  error?: string | string[] | FormikErrors<any> | FormikErrors<any>[];
  children?: ReactNode;
  labelRight?: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

export type SecondaryInputProps = {
  label?: string;
  children?: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

export type ReactRef<T> = Ref<T> | RefObject<T> | MutableRefObject<T> | null;
