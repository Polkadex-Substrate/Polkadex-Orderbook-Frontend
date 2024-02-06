import classNames from "classnames";
import { ReactNode, useEffect, useState } from "react";

export const Carousel = ({
  items,
  defaultIndex = 0,
  moveTimer = 0,
}: {
  items: { el: ReactNode }[];
  defaultIndex?: number;
  moveTimer?: number;
}) => {
  const [current, setCurrent] = useState(defaultIndex);

  useEffect(() => {
    if (moveTimer > 0) {
      const clear = setInterval(
        () =>
          current === items.length - 1
            ? setCurrent(0)
            : setCurrent(current + 1),
        moveTimer
      );
      return () => clearInterval(clear);
    }
  }, [moveTimer, current, items.length]);

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="overflow-hidden relative">
        <div
          className="flex transition ease-out duration-300"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {items.map((e, i) => (
            <div className="min-w-full" key={i}>
              {e.el}
            </div>
          ))}
        </div>
      </div>
      <ul className="list-none flex items-center gap-2">
        {items.map((e, i) => {
          const active = i === current;
          return (
            <li
              role="button"
              onClick={() => setCurrent(i)}
              key={i}
              className="flex flex-col items-center justify-center h-8 w-8 rounded-full group"
            >
              <div
                className={classNames(
                  active
                    ? "bg-primary-base "
                    : "bg-level-4 group-hover:bg-level-3",
                  "w-full h-1 rounded-full transition-colors duration-300 ease-in-out"
                )}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
