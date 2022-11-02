import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect } from "react";

const ResetPasswordFormTemplate = dynamic(
  () =>
    import("@polkadex/orderbook-ui/templates/ResetPasswordForm").then(
      (mod) => mod.ResetPasswordFormTemplate
    ),
  {
    ssr: false,
  }
);
const ResetPasswordForm = () => {
  const { query, push } = useRouter();
  const hasQuery = !!query?.code && !!query?.email;

  useEffect(() => {
    if (!hasQuery) push("/signIn");
  }, [push, hasQuery]);

  if (!hasQuery) return <div />;
  return (
    <ResetPasswordFormTemplate
      email={query?.email?.toString()}
      code={query?.code?.toString()}
    />
  );
};

export default ResetPasswordForm;
