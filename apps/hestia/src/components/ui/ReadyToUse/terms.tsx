"use client";

import { Checkbox, Typography } from "@polkadex/ux";
import Link from "next/link";
import { PropsWithChildren } from "react";

type Props = {
  checked: boolean;
  setChecked: (e: boolean) => void;
};

export const Terms = ({ checked, setChecked }: Props) => {
  return (
    <div>
      <Checkbox.Solid
        id="termsAndConditions"
        checked={checked}
        onCheckedChange={() => setChecked(!checked)}
        className="w-7"
      >
        <Checkbox.Label
          size="xs"
          appearance="primary"
          htmlFor="termsAndConditions"
        >
          By checking this box, I acknowledge that I have read and agree to be
          bound by the{" "}
          <Link
            href="https://github.com/Polkadex-Substrate/Docs/blob/master/Polkadex_Terms_of_Use.pdf"
            target="_blank"
            className="text-primary-hover"
          >
            Terms and Conditions.
          </Link>
        </Checkbox.Label>
      </Checkbox.Solid>

      {/* {terms?.map((e, i) => (
        <Page key={i} index={i + 1} title={e.title}>
          {e.items.map((e, ind) => (
            <Paragraph index={`${i + 1}.${ind + 1}`} key={ind}>
              {e}
            </Paragraph>
          ))}
        </Page>
      ))} */}
    </div>
  );
};

const Page = ({
  title,
  index,
  children,
}: PropsWithChildren<{ title: string; index: number }>) => (
  <ol className="flex flex-col gap-2">
    <li>
      <Typography.Text appearance="primary" size="xs">
        {index}. {title}
      </Typography.Text>
    </li>
    <li>
      <ol className="flex flex-col gap-2">{children}</ol>
    </li>
  </ol>
);

const Paragraph = ({
  index,
  children,
}: PropsWithChildren<{ index: string }>) => (
  <li className="ml-3">
    <Typography.Paragraph appearance="primary" size="xs">
      {index}.{children}
    </Typography.Paragraph>
  </li>
);

const terms = [
  {
    title: "Definitions",
    items: [
      "User: The individual accessing and using the Website for availing the products or services of Polkadex.",
      "Token: A token is a virtual tradable asset or utility that exists on its own blockchain and allows the holder to use it for investment, economic or documentation purposes.",
      "Trusted Execution Environment (TEE): It is a technology invented by Intel that allows modern CPUs to have an isolated section independent of the Operating System, BIOS and other core components of a computer.",
      "Sanction: A punitive or coercive measure or action administered by the OFAC or any other United States government authority, or any similar sanctions or measures imposed or administered by the United Nations Security Council, the European Union, Her Majesty’s Treasury of the United Kingdom, or similar sanctions administered or imposed by the government of the British Virgin Islands or the respective country of which the User is a citizen or resides in.",
    ],
  },
  {
    title: "General Information",
    items: [
      "The following terms and conditions (“Terms of Use”) govern the usage of https://polkadex.trade/, https://orderbook.polkadex.trade/, https://tokenmanager.polkadex.trade/, https://orderbook-beta.polkadex.trade/, https://tokenmanager-beta.polkadex.trade/ (Website) for any User (“User” “you” “your”) accessing the Website. By accessing/using the Website, the User agrees and accepts to be bound by these Terms of Use provided by Polkadex (“We” “us” “our”). These Terms of Use of the Website are periodically updated, shall be subject to change in future and become effective as soon as the same are posted on the Website.",
      "The purpose of this service contract between the User and the Polkadex is to lay down the terms and conditions agreeable to you for seeking the products and services from us. The information provided under the Website shall be treated on an “as is” basis.",
    ],
  },
  {
    title: "Scope of Services",
    items: [
      "Polkadex offers various products and services through its Website, and its flagship product is the Polkadex Orderbook which is a fully decentralized Layer 2 based exchange built on top of the Polkadex Network and featuring an orderbook. Polkadex Orderbook keeps the convenience of a centralized exchange but eliminates its bottlenecks by decentralizing the custody of assets. Polkadex Orderbook implements a Layer 2 Trusted Execution Environment (TEE) on top of Polkadex Network.",
      "At any time, during the products or services provided by Polkadex, the ownership of the digital wallet or Tokens shall remain with the User and there shall be no transfer of the same to Polkadex. Polkadex is providing a non-custodial service and all the orders are executed by a non-custodial operator and sent back to the blockchain through TEE implemented balance transfers.",
      "The Token shall remain the digital asset of the User and in case of either theft, loss, or hack, Polkadex shall be in no position to recover the same for the User.",
    ],
  },
  {
    title: "Risk",
    items: [
      "While we try our best to provide you with uninterrupted service, the access to products and the services may be interrupted due to various reasons such as system or network downtime, issues with trading or block chain networks, any limitations or suspensions imposed by the block chain networks or by us in our sole discretion, for regulatory or security reasons or for reasons outside of Polkadex’s control. We will try our best to resolve any issues within our control, however, we may not be held liable for any such interruption or delay of services.",
      "You agree and acknowledge that use of cryptography can present risks involved with digital assets such as Cryptocurrency Tokens and may result in theft, loss or hacking of such digital assets. Therefore you shall ensure, maintain the security and confidentiality, and remain in full control of all your private keys and passwords and should be solely responsible for the security of your own digital assets. In any case, Polkadex should not be held liable for any loss or theft of the digital assets or breach of security of any private keys and passwords of the User.",
      "You agree and acknowledge that cryptography is a developing field and blockchain remains under development which may create technology and security risks while using the products and services along with the uncertainty of using digital assets.",
    ],
  },
  {
    title: "Representation and Warranties",
    items: [
      "Your use of our products and services is lawful for you to do so and your acceptance of these Terms of Use or any part thereof is not restricted or violative of any applicable law in your jurisdiction. These Terms of Use constitute a valid, legal and binding obligation on you;",
      "In case of any restrictions or prohibitions imposed by the applicable law of your jurisdiction, the same will be complied by you without causing any liability towards Polkadex;",
      "You are of the legal age and have the capacity to use the products and services as per the jurisdiction to which you belong to, reside, domiciled or are a citizen of, and are legally eligible to create binding obligations for yourself in case of any liability which may incur due to the use of the Website or your use of the products and services of Polkadex;",
      "You are not using the products and services provided by us with a view to use or obtain the Tokens for any illegal activity;",
      "You are not a person or entity residing in, or are citizens of, located in, are incorporated or have registered office of the entity in the United States of America and the restrictions under the Commodity Exchange Act and the regulations promulgated thereunder by the U.S. Commodity Futures Trading Commission (CFTC) do not apply to you.",
      "The Tokens shall not be considered, interpreted or construed as anything other than cryptocurrency, neither shall the Tokens be considered, interpreted or construed as a stock, share, debenture or security of any kind which is issued by any person or entity; any rights, options or derivatives in respect of such stocks, shares, debentures or security; unit of a collective business scheme, or a trust or derivatives thereof; any other form of security or investment, regulated or otherwise;",
      "You are not listed in the British Virgin Islands Financial Services Commission (BVIFSC) as an individual under the Anti-Money Laundering Laws, criminal legislations, Counter-Terrorism Act of British Virgin Islands and/or such other law as prescribed by British Virgin Islands from time to time;",
      "You are not subjected to any Sanctions administered by the United Nation’s Security Council or the European Union or Her Majesty’s Treasury of the United Kingdom or similar Sanctions administered or imposed by the government of the British Virgin Island or any the respective country of which you are a citizen of or reside in;",
      "In case, if you are a body corporate, no legal proceeding, action, suit or arbitration is pending against you in relation to Anti-Money Laundering Laws and Your operations at all times have been in compliance with the Anti-Money Laundering Laws of the British Virgin Island and in all other jurisdictions, where such body corporate conducts business or operations;",
      "All of the above representations and warranties made are true, complete and accurate in all respects and not misleading in nature post the acceptance and access of these Terms of Use.",
    ],
  },
  {
    title: "Disclaimer",
    items: [
      "Polkadex is not a financial expert and neither provides any financial, legal or professional advice. Polkadex merely provides certain products and services which facilitates the buying and selling, or exchange of cryptocurrencies by its Users. Polkadex is neither a registered financial advisor, securities broker, dealer, financial analyst or a financial planner. The information provided on the Website is based on our understanding of the products and services being provided by us and for the purpose of information only.",
      "The information provided on the Website regarding the products and services is general in nature and does not intend to share any financial advice in general or specific to any User. The User shall verify the information provided on the Website and is free to consult any qualified professional of his/her choice to conduct diligence on his/her end before making any cryptocurrency investment. Polkadex, in any circumstance, shall not be held liable for any cryptocurrency investment made by the User based on the information shared on the Website or otherwise.",
    ],
  },
  {
    title: "Indemnification",
    items: [
      "To the maximum extent permitted by the applicable law, you shall indemnify and hold harmless us, our affiliates, subsidiaries, group companies (as applicable) and their respective officers, directors, agents, and employees, from any claim or demand, or actions including reasonable attorneys' fees, made by any third party or penalty imposed due to or arising out or relating to (a) your use of or conduct in connection of our products and services, (b) digital assets associated with your account, (c) your breach of these Terms of Use, or (c) your violation of any law, rules or regulations or the rights including infringement of intellectual property rights of a third party.",
    ],
  },
  {
    title: "Non-Liability",
    items: [
      "Polkadex shall not be held liable to you or to any third-party for any incidental, indirect, consequential, exemplary, special incidents or punitive damages or for any losses incurred by you or any third Party arising out of or in connection with the use of our products and services.",
    ],
  },
  {
    title: "Release And Waiver",
    items: [
      "To the maximum extent permitted by applicable law, you hereby release and waive all claims against Polkadex, and its subsidiaries, affiliates, officers, agents, licensors, other partners, and employees from any and all liability for claims, damages (actual and/or consequential), costs and expenses (including litigation costs and attorneys' fees) of every kind and nature, arising from or in any way related to your use of the Website, our products and services, Content or use of the Tokens.",
      "In addition, you expressly waive and relinquish any and all rights and benefits which you may have under any other national, state or common law principle of similar effect, to the fullest extent permitted by law. If we do not enforce our rights against you, or if we delay in doing so, that will not mean that we have waived our rights against you and will not mean that you do not have to comply with those obligations.",
    ],
  },
  {
    title: "Third-Party Entity",
    items: [
      "For the purpose of providing products and services for facilitating cryptocurrency trading and investments by its Users, we may require involving any third-party entities.",
      "We may integrate third-party entities on our Website for sending out emails to you as part of either the subscription services or for providing various marketing related services. The third party software used to send emails on our behalf is committed to meet the necessary data security standards for the protection of the User’s information. Polkadex will not be responsible for any data the third party entities use beyond the purpose of providing the Services as mentioned on the Website.",
      "For the purpose of tracking the use of our website including the mobile applications and to collect information regarding the use of our products and services along with our interactions with you, we use tracking tools such Google analytics, Firebase and Appsflyer. The information may include your internet protocol (IP) addresses, browser type, location, operating system, device information and information regarding your communications with us. Ensuring the protection of the collected information lies with the tracking tools and Polkadex cannot be held responsible for any data that is used beyond the purpose of providing the Services as mentioned on the Website.",
    ],
  },
  {
    title: "Governing Law",
    items: [
      "The interpretation and enforcement of these Terms of Use and any dispute related to the Website, products and services and these Terms of Use shall be governed by the laws of the British Virgin Islands.",
    ],
  },
  {
    title: "Restricted Persons",
    items: [
      "These Terms of Use shall not apply and extend to any persons or entities residing in, or are citizens of, located in, are incorporated or have registered office of the entity in the United States of America or in any Restricted Territory listed here: https://github.com/Polkadex-Substrate/Docs/blob/master/Polkadex_Excluded_Jurisd ictions.pdf (“Restricted Persons”). We do not make exceptions, hence if you are a Restricted Person, you should not attempt to access our products and services. Any use of Virtual Private Network (VPN) for circumventing the restrictions imposed under this section is prohibited. The identification of any Restricted Person is done through geofencing which is an internet protocol (IP) based identification wherein Polkadex senses the IP address of any person or entity restricted for restricting the use of its products and services. During the geofencing, the IP addresses of any person or entity is not collected or stored by Polkadex.",
    ],
  },
  {
    title: "Modification of Terms of Use",
    items: [
      "Polkadex reserves the right to make modifications to these Terms from time to time and the same shall become effective as soon as the same are posted on the Website. However, for User’s convenience, in case of any change to these Terms of Use, the same shall be shared via Polkades’s social media channels.",
    ],
  },
];
