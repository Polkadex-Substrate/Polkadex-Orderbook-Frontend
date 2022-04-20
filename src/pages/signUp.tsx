import { SignUpTemplate } from "@polkadex/orderbook-ui/templates";

const SignUp = () => (
  <>
    <SignUpTemplate />
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
