import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import {
  ChangeEvent,
  Dispatch,
  FocusEvent,
  InputHTMLAttributes,
  KeyboardEvent,
  MouseEvent,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";
import { Button, Typography } from "@polkadex/ux";

interface PrimaryInputProps extends InputHTMLAttributes<HTMLInputElement> {
  increase: () => void;
  decrease: () => void;
  ticker: string;
  label: string;
}

const Primary = ({
  label,
  increase,
  decrease,
  ticker,
  ...props
}: PropsWithChildren<PrimaryInputProps>) => {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div
      className="flex items-center bg-level-3 h-10 rounded"
      onClick={() => ref?.current?.focus()}
    >
      <span className="p-2 text-primary w-16">{label}</span>
      <input
        ref={ref}
        type="text"
        className="flex-1 bg-transparent font-semibold outline-none"
        {...props}
      />
      <div className="flex items-center gap-2">
        <small className="text-primary text-xs">{ticker}</small>
        <div className="flex flex-col gap-0.5">
          <button
            onClick={increase}
            className="rounded-tr px-3 bg-level-4 hover:bg-level-2 duration-300 transition-colors ease-out"
          >
            +
          </button>
          <button
            onClick={decrease}
            className="rounded-br px-3 bg-level-4 hover:bg-level-2 duration-300 transition-colors ease-out"
          >
            -
          </button>
        </div>
      </div>
    </div>
  );
};

const Search = (props: InputHTMLAttributes<HTMLInputElement>) => (
  <div className="flex items-center gap-2 p-2 flex-1">
    <MagnifyingGlassIcon className="w-4 h-4 text-primary" />
    <input
      type="search"
      className="flex-1 bg-transparent text-current outline-none"
      {...props}
    />
  </div>
);

interface VerticalProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  optional?: boolean;
  action?: (e: MouseEvent<HTMLButtonElement>) => void;
  actionTitle?: string;
}
const Vertical = ({
  label,
  optional,
  action,
  actionTitle,
  id,
  ...props
}: VerticalProps) => (
  <div className="flex flex-col gap-2 flex-1">
    <Typography.Text variant="primary" size="xs">
      {label} {optional && <span className="opacity-50">(Optional)</span>}
    </Typography.Text>
    <div className="flex items-center justify-between gap-2 flex-1">
      <input
        id={id}
        type="text"
        className="flex-1 bg-transparent text-lg outline-none font-semibold"
        {...props}
      />
      {action && (
        <Button.Solid
          type="button"
          appearance="secondary"
          size="sm"
          onClick={action}
        >
          {actionTitle}
        </Button.Solid>
      )}
    </div>
  </div>
);

interface PasscodeProps
  extends Pick<InputHTMLAttributes<HTMLInputElement>, "className" | "type"> {
  focusOnInit?: boolean;
  onValuesChange: Dispatch<SetStateAction<(string | number)[]>>;
  values: (string | number)[];
}

const Passcode = ({
  type,
  focusOnInit,
  className,
  values,
  onValuesChange,
}: PasscodeProps) => {
  const inputsRef = useRef<Array<HTMLInputElement> | []>([]);

  const [currentValue, setCurrentValue] = useState(0);

  const onKeyUp = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    const isBackspacePressed = e.key === "Backspace";
    const hasRef = inputsRef && inputsRef?.current && index === currentValue;
    const isValidNumber = !isNaN(parseInt(e.key)) && index <= values.length;

    const updateCurrentValue = (newIndex: number) => {
      setCurrentValue(newIndex);
      if (hasRef) inputsRef.current[newIndex].focus();
    };

    onValuesChange((prev) => {
      const newArray = [...prev];

      if (isBackspacePressed) {
        if (index > 0 && newArray[index] !== undefined)
          updateCurrentValue(index - 1);
      } else if (isValidNumber) {
        newArray[index] = parseInt(e.key) || e.key;
        if (index < values.length - 1) {
          updateCurrentValue(index + 1);
        }
      }

      return newArray;
    });
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    const keyCode = Number(e.key);
    const isNotBackspacePressed = e.key !== "Backspace";
    const isRightArrowPressed = e.key === "ArrowRight";
    const isLeftArrowPressed = e.key === "ArrowLeft";
    const isTabPressed = e.key === "Tab";

    const validNumber = !(keyCode >= 0 && keyCode <= 9);
    const isPastePressed = !(e.metaKey && e.key === "v");

    if (validNumber && isNotBackspacePressed && isPastePressed) {
      e.preventDefault();
    }
    if ((isRightArrowPressed || isTabPressed) && index < values.length - 1) {
      setCurrentValue(index + 1);
      inputsRef.current[index + 1].focus();
    }
    if (isLeftArrowPressed && index > 0) {
      setCurrentValue(index - 1);
      inputsRef.current[index - 1].focus();
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>, index: number) =>
    onValuesChange((prev) => {
      const newArray = [...prev];
      const inputValue = e.target.value;
      newArray[index] = parseInt(inputValue) || inputValue;
      return newArray;
    });

  const onFocus = (e: FocusEvent<HTMLInputElement>, index: number) => {
    setCurrentValue(index);
    e.target.focus();
  };

  useEffect(() => {
    if (focusOnInit && inputsRef && inputsRef.current)
      inputsRef.current[0].focus();
  }, [focusOnInit]);

  return (
    <div className="flex items-center gap-2">
      {values.map((v, i) => (
        <input
          key={i}
          ref={(element) => element && (inputsRef.current[i] = element)}
          type={type}
          maxLength={1}
          inputMode="numeric"
          pattern="\d{1}"
          className={twMerge(
            classNames(
              "h-8 w-7 bg-level-3 text-center rounded-md transition-colors duration-300 border-2 border-transparent",
              "focus:ring-0 focus:ring-offset-0 focus:border-primary-base hover:border-level-4",
              values[i] && "bg-level-1"
            ),
            className
          )}
          value={String(v)}
          onChange={(e) => onChange(e, i)}
          onKeyUp={(e) => onKeyUp(e, i)}
          onKeyDown={(e) => onKeyDown(e, i)}
          onFocus={(e) => onFocus(e, i)}
        />
      ))}
    </div>
  );
};

export const Input = {
  Primary,
  Search,
  Vertical,
  Passcode,
};
