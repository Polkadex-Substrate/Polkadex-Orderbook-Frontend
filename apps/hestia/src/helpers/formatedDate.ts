import { intlFormat } from "date-fns";

export const formatedDate = (value: Date, short = true) =>
  short
    ? new Intl.DateTimeFormat("en-US", {
        month: "numeric",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
      })
        .format(new Date(value))
        .replace(",", "")
    : intlFormat(
        new Date(value),
        {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        },
        { locale: "EN" }
      );
