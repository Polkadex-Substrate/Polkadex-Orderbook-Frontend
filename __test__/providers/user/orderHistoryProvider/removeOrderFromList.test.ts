import {
  removeOrderFromList,
  replaceOrPushOrder,
} from "@polkadex/orderbook/providers/user/orderHistoryProvider";

const cases = [
  {
    orders: [
      {
        main_account: "string",
        id: "string1",
        client_order_id: "string",
        time: "string",
        m: "string", // marketid
        side: "string",
        order_type: "string",
        status: "string",
        price: 4,
        qty: 5,
        avg_filled_price: "string",
        filled_quantity: "string",
        fee: "string",
      },
      {
        main_account: "string",
        id: "string2",
        client_order_id: "string",
        time: "string",
        m: "string", // marketid
        side: "string",
        order_type: "string",
        status: "string",
        price: 4,
        qty: 5,
        avg_filled_price: "string",
        filled_quantity: "string",
        fee: "string",
      },
    ],
    newOrder: {
      main_account: "string",
      id: "string3",
      client_order_id: "string",
      time: "string",
      m: "string", // marketid
      side: "string",
      order_type: "string",
      status: "string",
      price: 4,
      qty: 5,
      avg_filled_price: "string",
      filled_quantity: "string",
      fee: "string",
    },
    output: [
      {
        main_account: "string",
        id: "string1",
        client_order_id: "string",
        time: "string",
        m: "string", // marketid
        side: "string",
        order_type: "string",
        status: "string",
        price: 4,
        qty: 5,
        avg_filled_price: "string",
        filled_quantity: "string",
        fee: "string",
      },
      {
        main_account: "string",
        id: "string2",
        client_order_id: "string",
        time: "string",
        m: "string", // marketid
        side: "string",
        order_type: "string",
        status: "string",
        price: 4,
        qty: 5,
        avg_filled_price: "string",
        filled_quantity: "string",
        fee: "string",
      },
    ],
  },
  {
    orders: [
      {
        main_account: "string",
        id: "string1",
        client_order_id: "string",
        time: "string",
        m: "string", // marketid
        side: "string",
        order_type: "string",
        status: "string",
        price: 4,
        qty: 5,
        avg_filled_price: "string",
        filled_quantity: "string",
        fee: "string",
      },
      {
        main_account: "string",
        id: "string2",
        client_order_id: "string",
        time: "string",
        m: "string", // marketid
        side: "string",
        order_type: "string",
        status: "string",
        price: 4,
        qty: 5,
        avg_filled_price: "string",
        filled_quantity: "string",
        fee: "string",
      },
    ],
    newOrder: {
      main_account: "string",
      id: "string2",
      client_order_id: "string",
      time: "string",
      m: "string", // marketid
      side: "bid",
      order_type: "string",
      status: "string",
      price: 4,
      qty: 5,
      avg_filled_price: "string",
      filled_quantity: "string",
      fee: "string",
    },
    output: [
      {
        main_account: "string",
        id: "string1",
        client_order_id: "string",
        time: "string",
        m: "string", // marketid
        side: "string",
        order_type: "string",
        status: "string",
        price: 4,
        qty: 5,
        avg_filled_price: "string",
        filled_quantity: "string",
        fee: "string",
      },
    ],
  },
];

test.each(cases)("remove order from list ", ({ orders, newOrder, output }) => {
  expect(removeOrderFromList(orders, newOrder)).toStrictEqual(output);
});
