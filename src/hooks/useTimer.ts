import { useEffect, useState } from "react";

type Props = {
  direction?: string;
  startTime?: number;
  endTime?: number;
  timeOut?: number;
  multiplier?: number;
};

const getDefaultTime = ({ startTime, endTime, direction }: Partial<Props>) => {
  const suppliedProps = typeof (startTime && endTime) !== undefined;

  switch (direction) {
    case "down":
      if (suppliedProps && startTime >= endTime) {
        return [startTime, endTime];
      } else if (suppliedProps && startTime < endTime) {
        return [startTime, startTime];
      }
      return [startTime || 60, endTime || 0];

    default:
      if (suppliedProps && startTime <= endTime) {
        return [startTime, endTime];
      } else if (suppliedProps && startTime > endTime) {
        return [startTime, startTime];
      }
      return [startTime || 0, endTime || 60];
  }
};

const handleTime = (time, direction, start, end, multiplier) => {
  const reverseCase = direction === "down";
  if (reverseCase) {
    multiplier =
      end + ((start - end) % multiplier) === time ? (start - end) % multiplier : multiplier;
    return time - multiplier;
  }
  multiplier =
    end - ((end - start) % multiplier) === time ? (end - start) % multiplier : multiplier;
  return time + multiplier;
};

export const useTimer = ({
  startTime,
  endTime,
  direction = "up",
  multiplier = 1,
  timeOut = 1000,
}: Props) => {
  const [start, end] = getDefaultTime({ startTime, endTime, direction });
  const [time, setTime] = useState(start);
  const [ticker, setTicker] = useState(null);

  useEffect(() => {
    if (!ticker) {
      setTicker(
        setInterval(() => {
          setTime((oldTime) => handleTime(oldTime, direction, start, end, multiplier));
        }, timeOut)
      );
    } else if (time === end) {
      clearInterval(ticker);
      setTicker(null);
    }
    // eslint-disable-next-line
  }, [time]);

  return { time, setTime };
};
