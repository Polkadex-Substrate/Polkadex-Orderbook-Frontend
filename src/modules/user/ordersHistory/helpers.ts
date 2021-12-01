import { OrderCommon } from "../../types";

const ListReduceHelper = (list, order) => {
  const listReduce = list.reduce((memo: OrderCommon[], item: OrderCommon): OrderCommon[] => {
    if (order.id !== item.uuid) {
      memo.push(item);
    }

    return memo;
  }, []);

  return [{ ...order }].concat(listReduce);
};

export const insertOrUpdate = (list: OrderCommon[], order: OrderCommon): OrderCommon[] => {
  const index = list.findIndex((value: OrderCommon) => value.uuid === order.uuid);
  switch (order.state) {
    case "wait":
      if (index === -1) {
        return [{ ...order }].concat(list);
      }
      if (index !== -1) {
        return ListReduceHelper(list, order);
      }

      return list;
    case "filled":
      if (index === -1) {
        return [{ ...order }].concat(list);
      }

      return list.map((item) => {
        if (order.uuid === item.uuid) {
          return { ...order };
        }

        return item;
      });
    case "cancel":
      return ListReduceHelper(list, order);
    default:
      return list.reduce((memo: OrderCommon[], item: OrderCommon): OrderCommon[] => {
        if (order.uuid !== item.uuid) {
          memo.push(item);
        }

        return memo;
      }, []);
  }
};
