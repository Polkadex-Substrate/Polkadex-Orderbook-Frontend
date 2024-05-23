import { sleep } from "@orderbook/core/helpers";
import { Button, useTour } from "@polkadex/ux";
import { MouseEvent } from "react";

export const Controls = ({
  localStorageName,
  onCloseCb,
  onNextCb,
  onPrevCb,
  showNextButton = true,
  showPrevButton = true,
  showSkipButton = true,
}: {
  localStorageName: string;
  onCloseCb?: () => void;
  onNextCb?: () => void;
  onPrevCb?: () => void;
  showNextButton?: boolean;
  showPrevButton?: boolean;
  showSkipButton?: boolean;
}) => {
  const { setIsOpen, currentStep, setCurrentStep, steps } = useTour();
  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = !currentStep;

  const onClose = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    await sleep(50);
    onCloseCb && onCloseCb();
    localStorage.setItem(localStorageName, "true");
    setIsOpen(false);
  };

  return (
    <div className="py-2 flex items-center justify-between gap-2 border-t border-primary pointer-events-auto">
      {!isLastStep && showSkipButton ? (
        <Button.Light appearance="secondary" onClick={onClose}>
          Skip
        </Button.Light>
      ) : (
        <div />
      )}
      <div className="flex items-center gap-2">
        {!isFirstStep && showPrevButton && (
          <Button.Ghost
            disabled={isFirstStep}
            appearance="tertiary"
            onClick={async (e) => {
              e.preventDefault();
              e.stopPropagation();
              onPrevCb && onPrevCb();
              await sleep(50);
              setCurrentStep(currentStep - 1);
            }}
          >
            Prev
          </Button.Ghost>
        )}
        {showNextButton && (
          <Button.Light
            onClick={
              isLastStep
                ? onClose
                : async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onNextCb && onNextCb();
                    await sleep(50);
                    setCurrentStep(currentStep + 1);
                  }
            }
          >
            {isLastStep ? "Done" : "Next"}
          </Button.Light>
        )}
      </div>
    </div>
  );
};
