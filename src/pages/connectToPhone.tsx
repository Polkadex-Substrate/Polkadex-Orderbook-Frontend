import { ConnectToPhone } from "@polkadex/orderbook-ui/templates";

const SignUp = () => (
  <>
    <ConnectToPhone />
    <style jsx global>
      {`
        body {
          overflow-y: scroll;
        }
      `}
    </style>
  </>
);

export default SignUp;
