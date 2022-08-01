import dynamic from "next/dynamic";
import Head from "next/head";
import { useRef, useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";

import * as S from "./styles";

import {
  Button,
  Dropdown,
  InputLine,
  Table,
  Tooltip,
  TooltipContent,
  TooltipHeader,
} from "@polkadex/orderbook-ui/molecules";
import { withdrawValidations } from "@polkadex/orderbook/validations";
import { Icons, Tokens } from "@polkadex/orderbook-ui/atoms";

const Menu = dynamic(() => import("@polkadex/orderbook/v3/ui/organisms/Menu"), {
  ssr: false,
});

const testData = [
  {
    id: 1,
    block: "#10192",
    items: [
      {
        id: 1,
        name: "Polkadex",
        ticker: "PDEX",
        date: new Date().toLocaleString(),
        transactionId: Math.floor(Math.random() * 100000000000000),
        amount: (0.0).toFixed(5),
      },
      {
        id: 2,
        name: "Polkadot",
        ticker: "DOT",
        date: new Date().toLocaleString(),
        transactionId: Math.floor(Math.random() * 100000000000000),
        amount: (0.0).toFixed(5),
      },
      {
        id: 3,
        name: "Uniswap",
        ticker: "UNI",
        date: new Date().toLocaleString(),
        transactionId: Math.floor(Math.random() * 100000000000000),
        amount: (0.0).toFixed(5),
      },
    ],
  },
  {
    id: 2,
    block: "#10190",
    items: [
      {
        id: 1,
        name: "Polkadex",
        ticker: "PDEX",
        date: new Date().toLocaleString(),
        transactionId: Math.floor(Math.random() * 100000000000000),
        amount: (0.0).toFixed(5),
      },
    ],
  },
];
export const WithdrawTemplate = () => {
  const [state, setState] = useState(false);

  const router = useRouter();

  const { touched, handleSubmit, errors, getFieldProps, isValid, dirty } = useFormik({
    initialValues: {
      amount: 0.0,
      asset: null,
    },
    validationSchema: withdrawValidations,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <>
      <Head>
        <title>Deposit | Polkadex Orderbook</title>
        <meta name="description" content="A new era in DeFi" />
      </Head>
      <S.Main>
        <Menu handleChange={() => setState(!state)} />
        <S.Wrapper>
          <S.Title type="button" onClick={() => router.back()}>
            <div>
              <Icons.SingleArrowLeft />
            </div>
            Overview
          </S.Title>
          <S.Container>
            <S.Column>
              <div>
                <h1>Deposit Crypto</h1>
                <p>
                  Polkadex is a fully non-custodial platform, so the assets in your wallet are
                  always under your control.
                </p>
              </div>
            </S.Column>
            <S.Box>
              <S.Form>
                <S.SelectAccount>
                  <div>
                    <Icons.Avatar />
                  </div>
                  <div>
                    <strong>Main Account</strong>
                    <span>esoDF9faq...9dD7GtQvg</span>
                  </div>
                </S.SelectAccount>
                <form onSubmit={handleSubmit}>
                  <S.SelectInput>
                    <span>Select a coin</span>
                    <S.SelectInputContainer>
                      <Dropdown
                        isClickable
                        direction="bottom"
                        header={
                          <S.DropdownHeader>
                            <div>
                              <span>
                                <Tokens.PDEX />
                              </span>
                              Polkadex PDEX
                            </div>
                            <div>
                              <span>
                                <Icons.ArrowBottom />
                              </span>
                            </div>
                          </S.DropdownHeader>
                        }>
                        <S.DropdownContent>
                          <button type="button" onClick={undefined}>
                            Polkadex PDEX
                          </button>
                        </S.DropdownContent>
                      </Dropdown>
                    </S.SelectInputContainer>
                    <S.Available>
                      Avlb <strong>120PDEX</strong>
                    </S.Available>
                  </S.SelectInput>
                  <InputLine
                    name="amount"
                    label="Token Amount"
                    placeholder="0.00"
                    error={errors.amount && touched.amount && errors.amount}
                    {...getFieldProps("amount")}
                  />

                  <Button
                    type="submit"
                    size="extraLarge"
                    background="primary"
                    color="white"
                    disabled={!(isValid && dirty)}
                    isFull>
                    Deposit
                  </Button>
                </form>
              </S.Form>
              <S.History>
                <h2>History</h2>
                {testData.map((value) => (
                  <S.HistoryContent key={value.id}>
                    <S.HistoryTitle>
                      <strong>Block {value.block}</strong>
                      <button type="button" onClick={() => console.log("Claim")}>
                        Claim
                      </button>
                    </S.HistoryTitle>
                    <S.HistoryTable>
                      <Table style={{ width: "100%" }}>
                        <Table.Header fill="none">
                          <Table.Column>
                            <S.HeaderColumn>Name</S.HeaderColumn>
                          </Table.Column>
                          <Table.Column>
                            <S.HeaderColumn>Date</S.HeaderColumn>
                          </Table.Column>
                          <Table.Column>
                            <S.HeaderColumn>Amount</S.HeaderColumn>
                          </Table.Column>
                          <Table.Column>
                            <S.HeaderColumn>Transaction ID</S.HeaderColumn>
                          </Table.Column>
                        </Table.Header>
                        <Table.Body>
                          {value.items.map((item) => (
                            <Table.Row key={item.id}>
                              <Table.Cell>
                                <S.Cell>
                                  <span>
                                    {item.name} <small>{item.ticker}</small>
                                  </span>
                                </S.Cell>
                              </Table.Cell>
                              <Table.Cell>
                                <S.Cell>
                                  <span>{item.date}</span>
                                </S.Cell>
                              </Table.Cell>
                              <Table.Cell>
                                <S.Cell>
                                  <span>
                                    {item.amount} <small>$0.00</small>
                                  </span>
                                </S.Cell>
                              </Table.Cell>
                              <Table.Cell>
                                <Copy copyData={item.transactionId} />
                              </Table.Cell>
                            </Table.Row>
                          ))}
                        </Table.Body>
                      </Table>
                    </S.HistoryTable>
                  </S.HistoryContent>
                ))}
              </S.History>
            </S.Box>
          </S.Container>
        </S.Wrapper>
      </S.Main>
    </>
  );
};

const Copy = ({ copyData }) => {
  const buttonRef = useRef(null);
  const handleOnMouseOut = () => (buttonRef.current.innerHTML = "Copy to clipboard");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(copyData);
    buttonRef.current.innerHTML = "Copied";
  };
  return (
    <S.Cell>
      <Tooltip>
        <TooltipHeader>
          <button type="button" onClick={handleCopy} onMouseOut={handleOnMouseOut}>
            <Icons.Copy />
          </button>
          {copyData}
        </TooltipHeader>
        <TooltipContent>
          <p ref={buttonRef}>Copy to clipboard</p>
        </TooltipContent>
      </Tooltip>
    </S.Cell>
  );
};
