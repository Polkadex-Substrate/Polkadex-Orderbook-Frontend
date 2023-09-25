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
import { DEFAULTBALANCESINTRONAME } from "@orderbook/core/constants";

import * as S from "./styles";

import { defaulIntrotStyles } from "@/styles/introStyles";
import { CheckboxCustom } from "@/ui/molecules";
const isClientSide = typeof window !== "undefined";
const initialState =
  isClientSide && localStorage.getItem(DEFAULTBALANCESINTRONAME) === "true";

export const Intro = ({
  children,
  active,
}: PropsWithChildren<{ active: boolean }>) => {
  const steps: StepType[] = [
    {
      selector: ".depositButton",
      content: (
        <S.IntroCard>
          <span>What is Deposit?</span>
          <p>
            In this context, Deposit refers to the action of transferring tokens
            from either a Polkadot Parachain or the Polkadot Relay Chain into
            the Polkadex network for the purpose of trading.
          </p>
        </S.IntroCard>
      ),
      position: "bottom",
      styles: defaulIntrotStyles,
    },
    {
      selector: ".withdrawButton",
      content: (
        <S.IntroCard>
          <span>What is Withdrawal?</span>
          <p>
            In this context, Withdrawal refers to the action of transferring
            tokens from the Polkadex network to any other Polkadot Parachain or
            the Polkadot Relay Chain.
          </p>
        </S.IntroCard>
      ),
      position: "bottom",
      styles: defaulIntrotStyles,
    },
    {
      selector: ".transferButton",
      content: (
        <S.IntroCard>
          <span>What is Transfer?</span>
          <div>
            <p>
              Transfer refers to the movement of tokens between your Funding
              Account and your Trading Account within the Polkadex platform.
              This transfer is primarily conducted to facilitate trading
              activities, allowing you to allocate funds for trading or move
              trading proceeds back to your Funding Account.
            </p>
            <p>
              Additionally, you have the option to transfer tokens between
              different Polkadex accounts, providing flexibility in managing
              your assets within the Polkadex ecosystem.
            </p>
          </div>
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
  const [state, setState] = useState(!!initialState);
  const content = props.steps[props.currentStep].content;
  const isLastStep = props.currentStep === props.steps.length - 1;

  const handleChangeIntroView = useCallback(
    () =>
      setState((prev) => {
        localStorage.setItem(
          DEFAULTBALANCESINTRONAME,
          state ? "false" : "true"
        );
        return !prev;
      }),
    [state]
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
                handleChangeIntroView();
              }}
            >
              {isLastStep ? "Done" : "Skip"}
            </button>
          )}
        </S.IntroButtons>
        <S.IntroSwitch>
          <CheckboxCustom
            checked={state}
            aria-label="Close tour"
            onChange={handleChangeIntroView}
            labelProps={{ style: { whiteSpace: "nowrap" } }}
          >
            Don&rsquo;t show again
          </CheckboxCustom>
        </S.IntroSwitch>
      </S.IntroActions>
    </S.Intro>
  );
};
