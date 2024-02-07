import { StarIcon } from "@heroicons/react/24/solid";
import { createColumnHelper } from "@tanstack/react-table";
import classNames from "classnames";
import { Decimal, InitialMarkets, isNegative } from "@orderbook/core/index";
import { Typography, Token } from "@polkadex/ux";

const columnHelper = createColumnHelper<InitialMarkets>();

export const columns = ({
  onChangeFavourite,
}: {
  onChangeFavourite: (e: string) => void;
}) => [
  columnHelper.accessor((row) => row, {
    id: "coin",
    cell: (e) => {
      const { isFavourite, baseAsset, quoteAsset, id } = e.getValue();
      return (
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onChangeFavourite(id);
            }}
          >
            <StarIcon
              className={classNames(
                isFavourite ? "text-primary-base" : "text-primary-disabled",
                "w-3 h-3"
              )}
            />
          </button>
          <div className="flex items-center gap-1">
            <div className="h-6 w-6 p-[4px] rounded-full bg-level-2">
              <Token name={baseAsset.ticker as string} />
            </div>
            <Typography.Text size="xs" className="uppercase">
              {baseAsset.ticker}/
              <Typography.Text size="xs" appearance="primary">
                {quoteAsset.ticker}
              </Typography.Text>
            </Typography.Text>
          </div>
        </div>
      );
    },
    header: () => <Typography.Text size="xs">Coin</Typography.Text>,
    footer: (e) => e.column.id,
  }),
  columnHelper.accessor((row) => row, {
    id: "price",
    cell: (e) => {
      const { quotePrecision, last } = e.getValue();
      const priceFormatted = Decimal.format(Number(last), quotePrecision);

      return <Typography.Text size="xs">{priceFormatted}</Typography.Text>;
    },
    header: () => <Typography.Text size="xs">Price</Typography.Text>,
    footer: (e) => e.column.id,
  }),
  columnHelper.accessor((row) => row, {
    id: "change",
    cell: (e) => {
      const { price_change_percent } = e.getValue();
      const changeFormatted =
        Decimal.format(Number(price_change_percent), 2, ",") + "%";
      const negative = isNegative(changeFormatted.toString());
      return (
        <Typography.Text size="xs" appearance={negative ? "danger" : "success"}>
          {changeFormatted}%
        </Typography.Text>
      );
    },
    header: () => <Typography.Text size="xs">Change</Typography.Text>,
    footer: (e) => e.column.id,
  }),
];