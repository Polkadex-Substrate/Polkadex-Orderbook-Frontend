import * as T from "./types";

export const additionalNotifications: T.Notification[] = [
  {
    category: "Announcements",
    date: new Date().getTime(),
    message: "Hestia UI Upgrade 🎉 ",
    description:
      "Introducing the new Hestia version of Orderbook! 🚀 Experience a sleek and intuitive UI overhaul designed to enhance your trading journey. Seamlessly navigate markets with improved functionality and aesthetics. Upgrade now to discover the future of trading!",
    id: "random id",
    type: "Information",
    active: true,
    href: "/trading/PDEXUSDT",
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
