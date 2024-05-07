import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ReadonlyURLSearchParams } from "next/navigation";

type Props = {
  name: string;
  value: string;
  pathname: string;
  searchParams: ReadonlyURLSearchParams;
  push: AppRouterInstance["push"];
};
export const createQueryString = ({
  name,
  value,
  pathname,
  searchParams,
  push,
}: Props) => {
  const params = new URLSearchParams(searchParams.toString());
  params.set(name, value);
  push(pathname + "?" + params.toString());
};
