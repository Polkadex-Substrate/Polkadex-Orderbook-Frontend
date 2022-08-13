import dynamic from "next/dynamic";

const AccountManagerTemplate = dynamic(
  () =>
    import("@polkadex/orderbook-ui/templates/AccountManager").then(
      (mod) => mod.AccountManagerTemplate
    ),
  {
    ssr: false,
  }
);
const AccountManager = () => <AccountManagerTemplate />;

export default AccountManager;
