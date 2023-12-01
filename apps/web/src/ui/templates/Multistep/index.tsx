import {
  Children,
  ComponentProps,
  Fragment,
  Key,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  isValidElement,
  useCallback,
  useEffect,
  useState,
} from "react";
import { usePrevious } from "react-use";
import classNames from "classnames";
import { getChildren, isValidComponent } from "@polkadex/ux";
import { twMerge } from "tailwind-merge";
export interface Actions {
  onBack: () => void;
  onNext: () => void;
  onReset: () => void;
  current: number;
}

export interface SwitchActions extends Actions {
  onPage: (key: Key) => void;
}

export interface InteractiveActions extends Actions {
  onChangeInteraction: (value: boolean) => void;
  onPage: (key: Key, activeInteraction?: boolean) => void;
}

const Switch = ({
  defaultIndex = 0,
  children,
  resetOnUnmount = false,
}: {
  defaultIndex?: number;
  children: ((value?: SwitchActions) => ReactNode) | ReactNode;
  resetOnUnmount?: boolean;
}) => {
  const [current, setCurrent] = useState(defaultIndex);
  const prevCount = usePrevious(current);

  let RenderComponent: ReactNode;

  if (typeof children === "function") {
    const [child] = Children.toArray(
      children({
        onNext: () => {
          const childCollection = getChildren(child);
          const childCount = Children.count(childCollection);

          setCurrent((current) => (current + 1) % childCount);
        },
        onBack: () => setCurrent(prevCount ?? 0),
        onPage: (key: Key) => {
          const childCollection = getChildren(child);
          const childIndex = childCollection?.findIndex(
            (e) => isValidElement(e) && e.key?.includes(key.toString())
          );

          setCurrent(childIndex >= 0 ? childIndex : 0);
        },
        onReset: () => setCurrent(defaultIndex),
        current,
      })
    ).filter(isValidElement) as ReactElement<PropsWithChildren<Actions>>[];

    const childrenCollection = getChildren(child);
    RenderComponent = childrenCollection?.[current] ?? childrenCollection;
  } else {
    const allElements = Children.toArray(children).filter(isValidElement);
    RenderComponent = allElements[current] ?? <div>MultiStep error</div>;
  }

  useEffect(() => {
    if (resetOnUnmount) return () => setCurrent(defaultIndex);
  }, [defaultIndex, resetOnUnmount]);

  return <Fragment>{RenderComponent}</Fragment>;
};

export const Trigger = ({ children }: PropsWithChildren) => (
  <Fragment>{children}</Fragment>
);

export const Content = ({ children }: PropsWithChildren) => (
  <Fragment>{children}</Fragment>
);
const places = {
  center: "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
  "center left": "top-1/2 left-[1%] transform -translate-y-1/2",
  "center right":
    "top-1/2 right-[1%] transform translate-x-1/2 -translate-y-1/2",
  "top center": "top-[1%] left-1/2 transform -translate-x-1/2",
  "top left": "top-[1%] left-[1%]",
  "top right": "top-[1%] right-[1%]",
  "bottom center": "bottom-[1%] left-1/2 transform -translate-x-1/2",
  "bottom left": "bottom-[1%] left-[1%]",
  "bottom right": "bottom-[1%] right-[1%]",
};

type InteractiveProps = {
  defaultIndex?: number;
  defaultActive?: boolean;
  resetOnUnmount?: boolean;
  children: ((value?: InteractiveActions) => ReactNode) | ReactNode;
  placement?: (typeof places)[number];
} & Pick<ComponentProps<"div">, "className">;

const Interactive = ({
  children,
  defaultIndex = 0,
  defaultActive = false,
  resetOnUnmount = false,
  placement = "bottom center",
  className,
}: InteractiveProps) => {
  const [current, setCurrent] = useState(defaultIndex);
  const [active, setActive] = useState(defaultActive);

  const prevCount = usePrevious(current);

  let RenderComponent: ReactNode;
  let TriggerComponent: ReactNode;

  const onReset = useCallback(() => {
    setCurrent(defaultIndex);
    setActive(defaultActive);
  }, [defaultIndex, defaultActive]);

  if (typeof children === "function") {
    const [child] = Children.toArray(
      children({
        onNext: () => {
          const childCollection = getChildren(child);
          const [ContentItems] = isValidComponent(childCollection, Content);

          const contentCollection = getChildren(ContentItems);
          const childCount = Children.count(contentCollection);

          setCurrent((e) => (e + 1) % childCount);
        },
        onBack: () => setCurrent(prevCount ?? 0),
        onPage: (key: Key, activeInteraction?: boolean) => {
          const childCollection = getChildren(child);
          const [ContentItems] = isValidComponent(childCollection, Content);

          const contentCollection = getChildren(ContentItems);
          const childIndex = contentCollection?.findIndex(
            (e) => isValidElement(e) && e.key?.includes(key.toString())
          );

          setCurrent(childIndex >= 0 ? childIndex : 0);
          if (activeInteraction) setActive(true);
        },
        onReset,
        onChangeInteraction: (value = false) => setActive(value),
        current,
      })
    ).filter(isValidElement) as ReactElement<PropsWithChildren<Actions>>[];

    const childCollection = getChildren(child);
    const [TriggerComp] = isValidComponent(childCollection, Trigger);
    const [ContentComponent] = isValidComponent(childCollection, Content);

    const childrenCollection = getChildren(ContentComponent);
    RenderComponent = childrenCollection?.[current] ?? childrenCollection;
    TriggerComponent = TriggerComp;
  } else {
    const [ContentComponent] = isValidComponent(children, Content);
    const [TriggerComp] = isValidComponent(children, Trigger);

    const allElements = Children.toArray(ContentComponent);
    RenderComponent = allElements[current] ?? <div>MultiStep error</div>;
    TriggerComponent = TriggerComp;
  }

  useEffect(() => {
    if (resetOnUnmount) return () => onReset();
  }, [resetOnUnmount, onReset]);

  return (
    <div className="relative">
      {TriggerComponent}
      {active && (
        <Fragment>
          <div
            className={twMerge(
              classNames("absolute w-full z-10", places[placement]),
              className
            )}
          >
            {RenderComponent}
          </div>
          <div className="absolute w-full h-full bottom-0 left-0 bg-overlay-1" />
        </Fragment>
      )}
    </div>
  );
};

export const Multistep = { Trigger, Switch, Content, Interactive };
