import * as T from "./types";

// Change only this to add/delete categories
export const notificationCategories = ["General", "Announcements"] as const;

export const additionalNotifications: T.Notification[] = [
  {
    category: "Announcements",
    date: new Date().getTime(),
    message: "Hestia UI Upgrade 🎉 ",
    description:
      "Introducing the new Hestia version of Orderbook! 🚀 Experience a sleek and intuitive UI overhaul designed to enhance your trading journey. Seamlessly navigate markets with improved functionality and aesthetics. Upgrade now to discover the future of trading!",
    id: "1",
    type: "Information",
    active: true,
    href: "/trading/PDEXUSDT",
  },
];
