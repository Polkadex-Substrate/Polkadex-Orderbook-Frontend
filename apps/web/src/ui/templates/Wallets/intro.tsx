import React, {
  PropsWithChildren,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  PopoverContentProps,
  StepType,
  TourProvider,
  useTour,
} from "@reactour/tour";
import { DEFAULTWALLETSINTRONAME } from "@orderbook/core/constants";

import * as S from "./styles";

import { defaulIntrotStyles } from "@/styles/introStyles";
import { CheckboxCustom } from "@/ui/molecules";

export const Intro = ({
  children,
  active,
}: PropsWithChildren<{ active: boolean }>) => {
  const isClientSide = typeof window !== "undefined";
  const initialState =
    isClientSide && localStorage.getItem(DEFAULTWALLETSINTRONAME) === "true";

  const steps: StepType[] = [
    {
      selector: ".fundingAccount",
      content: (
        <S.IntroCard>
          <span>What is a Funding Account?</span>
          <p>
            The funding account can be defined as your dedicated blockchain
            account within the Polkadex network. Put simply, it represents your
            Polkadot.js account that serves as the gateway to access the
            Polkadex blockchain.
          </p>
        </S.IntroCard>
      ),
      position: "top",
      styles: defaulIntrotStyles,
    },
    {
      selector: ".tradingAccount",
      content: (
        <S.IntroCard>
          <span>What is a Trading Account?</span>
          <p>
            The trading account is exclusively intended for conducting trades on
            the Polkadex Orderbook platform.
            <br />
            <br />
            Its functionality is restricted to executing trades and returning
            tokens to the associated funding account upon completion of trading
            activities.
          </p>
        </S.IntroCard>
      ),
      position: "bottom",
      styles: defaulIntrotStyles,
    },
  ];

  return (
    <TourProvider
      steps={steps}
      showNavigation={false}
      showDots={false}
      showBadge={false}
      defaultOpen={active && !initialState}
      ContentComponent={ContentComponent}
      onClickMask={(e) => {
        e.setCurrentStep(0);
        e.setIsOpen(false);
      }}
    >
      <Actions active={active && !initialState}>{children}</Actions>
    </TourProvider>
  );
};

const Actions = ({
  children,
  active,
}: PropsWithChildren<{ active: boolean }>) => {
  const { setIsOpen } = useTour();

  useEffect(() => {
    if (active) {
      setIsOpen(true);
    }
  }, [active, setIsOpen]);
  return <>{children}</>;
};
const ContentComponent = (props: PopoverContentProps) => {
  const isClientSide = typeof window !== "undefined";
  const initialState =
    isClientSide && localStorage.getItem(DEFAULTWALLETSINTRONAME) === "true";

  const [state, setState] = useState(!!initialState);
  const content = props.steps[props.currentStep].content;
  const isLastStep = props.currentStep === props.steps.length - 1;

  const handleChangeIntroView = useCallback(
    (state?: boolean) =>
      setState(() => {
        localStorage.setItem(DEFAULTWALLETSINTRONAME, state ? "true" : "false");
        return !!state;
      }),
    []
  );

  return (
    <S.Intro>
      <>
        {typeof content === "function"
          ? content({ ...props })
          : (content as ReactNode)}
      </>
      <S.IntroActions>
        <S.IntroButtons>
          {props.currentStep !== 0 && (
            <button onClick={() => props.setCurrentStep(props.currentStep - 1)}>
              Back
            </button>
          )}
          {!isLastStep ? (
            <button onClick={() => props.setCurrentStep(props.currentStep + 1)}>
              Next
            </button>
          ) : (
            <button
              onClick={() => {
                props.setCurrentStep(0);
                props.setIsOpen(false);
                handleChangeIntroView(isLastStep && state);
              }}
            >
              Done
            </button>
          )}
        </S.IntroButtons>
        <S.IntroSwitch>
          <CheckboxCustom
            checked={state}
            aria-label="Close tour"
            onChange={() => handleChangeIntroView(!state)}
            labelProps={{ style: { whiteSpace: "nowrap" } }}
          >
            Don&rsquo;t show again
          </CheckboxCustom>
        </S.IntroSwitch>
      </S.IntroActions>
    </S.Intro>
  );
};
