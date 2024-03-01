import * as T from "./types";

export const additionalNotifications: T.Notification[] = [
  {
    category: "Announcements",
    date: new Date().getTime(),
    message: "GMLR/USDT available",
    description:
      "Plus, the Polkadex community is now accepting Moonbeam token listing proposals.",
    id: "random id",
    type: "Information",
    active: true,
    href: "/transfer",
  },
  {
    category: "General",
    date: new Date("01/01/2024").getTime(),
    message: "10 USDT Transfer",
    description:
      "Your transfer of 10 USDT from your trading account to your funding account is ready to claim.",
    id: "random id",
    type: "Information",
    active: true,
    href: "/transfer",
  },
  {
    category: "General",
    date: new Date().getTime(),
    message: "Limit Sell Order Placed",
    description: "Placed limit sell order for 5 USDT for PDEX",
    id: "random id",
    type: "Information",
    active: false,
    href: "/history?tab=openOrders",
  },
  {
    category: "General",
    date: new Date().getTime(),
    message: "Limit Buy Order Placed",
    description: "Placed limit sell order for 5 USDT for PDEX",
    id: "random id",
    type: "Information",
    active: true,
    href: "/history?tab=openOrders",
  },
  {
    category: "General",
    date: new Date().getTime(),
    message: "10 USDT Transfer",
    description: "Transfer to funding account 10 USDT",
    id: "random id",
    type: "Information",
    active: false,
    href: "/transfer",
  },
  {
    category: "General",
    date: new Date().getTime(),
    message: "Transfer ready to claim",
    description:
      "Your transfer of 4200 USDT from your trading account to your funding account is ready to claim.",
    id: "random id",
    type: "Information",
    active: false,
    href: "/transfer",
  },
];
