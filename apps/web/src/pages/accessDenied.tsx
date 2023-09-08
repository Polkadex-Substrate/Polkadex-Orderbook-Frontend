import dynamic from "next/dynamic";

const AccessDeniedTemplate = dynamic(
  () =>
    import("@polkadex/orderbook-ui/templates/AccessDenied").then(
      (mod) => mod.AccessDeniedTemplate,
    ),
  {
    ssr: false,
  },
);

const AccessDenied = () => <AccessDeniedTemplate />;

export default AccessDenied;
