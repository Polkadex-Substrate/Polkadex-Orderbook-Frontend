import { Button, Typography, truncateString } from "@polkadex/ux";
import { Order } from "@orderbook/core/utils/orderbookService/types";
import { OrderCancellation } from "@orderbook/core/providers/user/orders";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/solid";
import classNames from "classnames";

export const OpenOrderResponsiveCard = ({
  orders,
  onCancelOrder,
}: {
  orders: Order[];
  onCancelOrder: (value: OrderCancellation) => void;
}) => {
  return orders.map((order, i) => {
    const isSell = order.side === "Ask";
    const Icon = isSell ? ArrowRightCircleIcon : ArrowLeftCircleIcon;
    return (
      <div
        key={order.orderId}
        className={classNames(
          "grid grid-cols-4 items-center gap-x-14 gap-y-3 p-2",
          i % 2 && "bg-level-1"
        )}
      >
        <div className="flex flex-col gap-1 w-24">
          <Typography.Text appearance="primary">Pair</Typography.Text>
          <Typography.Text className="flex items-center gap-1">
            <Icon
              className={classNames(
                "w-5 h-5",
                isSell ? "text-primary-base" : "text-success-base"
              )}
            />
            {order.market.name}
          </Typography.Text>
        </div>

        <div className="flex flex-col gap-1">
          <Typography.Text appearance="primary">Date</Typography.Text>
          <Typography.Text>
            {order.timestamp.toLocaleDateString()}
          </Typography.Text>
        </div>

        <div className="flex flex-col gap-1">
          <Typography.Text appearance="primary">Type</Typography.Text>
          <Typography.Text>{order.type}</Typography.Text>
        </div>

        <div className="flex flex-col gap-1">
          <Typography.Text appearance="primary">Price</Typography.Text>
          <Typography.Text>{order.price}</Typography.Text>
        </div>

        <div className="flex flex-col gap-1">
          <Typography.Text appearance="primary">Total</Typography.Text>
          <Typography.Text>{order.quantity}</Typography.Text>
        </div>

        <div className="flex flex-col gap-1">
          <Typography.Text appearance="primary">Filled</Typography.Text>
          <Typography.Text>{order.filledQuantity}</Typography.Text>
        </div>

        <div>
          <Button.Solid
            className="py-0.5 h-auto"
            size="xs"
            onClick={() =>
              onCancelOrder({
                orderId: order.orderId,
                base: order.market.baseAsset.id,
                quote: order.market.quoteAsset.id,
              })
            }
          >
            Cancel Order
          </Button.Solid>
        </div>
      </div>
    );
  });
};

export const OrderHistoryResponsiveCard = ({ orders }: { orders: Order[] }) => {
  return orders.map((order, i) => {
    const isSell = order.side === "Ask";
    const Icon = isSell ? ArrowRightCircleIcon : ArrowLeftCircleIcon;
    return (
      <div
        key={order.orderId}
        className={classNames(
          "grid grid-cols-3 sm:grid-cols-4 items-center gap-x-14 gap-y-3 p-2",
          i % 2 && "bg-level-1"
        )}
      >
        <div className="flex flex-col gap-1">
          <Typography.Text appearance="primary">Id</Typography.Text>
          <Typography.Text>{truncateString(order.orderId, 4)}</Typography.Text>
        </div>

        <div className="flex flex-col gap-1 w-24">
          <Typography.Text appearance="primary">Pair</Typography.Text>
          <Typography.Text className="flex items-center gap-1">
            <Icon
              className={classNames(
                "w-5 h-5",
                isSell ? "text-primary-base" : "text-success-base"
              )}
            />
            {order.market.name}
          </Typography.Text>
        </div>

        <div className="flex flex-col gap-1">
          <Typography.Text appearance="primary">Date</Typography.Text>
          <Typography.Text>
            {order.timestamp.toLocaleDateString()}
          </Typography.Text>
        </div>

        <div className="flex flex-col gap-1">
          <Typography.Text appearance="primary">Type</Typography.Text>
          <Typography.Text>{order.type}</Typography.Text>
        </div>

        <div className="flex flex-col gap-1">
          <Typography.Text appearance="primary">Status</Typography.Text>
          <Typography.Text>{order.status}</Typography.Text>
        </div>

        <div className="flex flex-col gap-1">
          <Typography.Text appearance="primary">Price</Typography.Text>
          <Typography.Text>{order.price}</Typography.Text>
        </div>

        <div className="flex flex-col gap-1">
          <Typography.Text appearance="primary">Total</Typography.Text>
          <Typography.Text>{order.quantity}</Typography.Text>
        </div>

        <div className="flex flex-col gap-1">
          <Typography.Text appearance="primary">Filled</Typography.Text>
          <Typography.Text>{order.filledQuantity}</Typography.Text>
        </div>

        <div className="flex flex-col gap-1">
          <Typography.Text appearance="primary">Fee</Typography.Text>
          <Typography.Text>{order.fee}</Typography.Text>
        </div>
      </div>
    );
  });
};
