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

import * as S from "./styles";

import { CheckboxCustom } from "@/ui/molecules";

export const Intro = ({
  children,
  active,
  localStorageName,
  steps,
}: PropsWithChildren<{
  active: boolean;
  localStorageName: string;
  steps: StepType[];
}>) => {
  const isClientSide = typeof window !== "undefined";
  const initialState =
    isClientSide && localStorage.getItem(localStorageName) === "true";

  return (
    <TourProvider
      steps={steps}
      showNavigation={false}
      showDots={false}
      showBadge={false}
      defaultOpen={active && !initialState}
      ContentComponent={(props) => (
        <ContentComponent localStorageName={localStorageName} {...props} />
      )}
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
    if (active) setTimeout(() => setIsOpen(true), 500);
  }, [active, setIsOpen]);
  return <>{children}</>;
};
interface ContentComponentProps extends PopoverContentProps {
  localStorageName: string;
}
const ContentComponent = ({
  localStorageName,
  ...props
}: ContentComponentProps) => {
  const isClientSide = typeof window !== "undefined";
  const initialState =
    isClientSide && localStorage.getItem(localStorageName) === "true";

  const [state, setState] = useState(!!initialState);
  const content = props.steps[props.currentStep].content;
  const isLastStep = props.currentStep === props.steps.length - 1;

  const handleChangeIntroView = useCallback(
    (state?: boolean) =>
      setState(() => {
        localStorage.setItem(localStorageName, state ? "true" : "false");
        return !!state;
      }),
    [localStorageName]
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
