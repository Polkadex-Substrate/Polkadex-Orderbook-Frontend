import { Notification, NotificationTypes } from "../modules/user/notificationHandler";

export const fakeInformation = (info?: Notification) => {
  const number = Math.floor(Math.random() * 1000);
  const n = Math.floor(Math.random() * (6 - 1) + 1);

  const selectedType = (): NotificationTypes => {
    switch (n) {
      case 1:
        return "ErrorAlert";
      case 2:
        return "AttentionAlert";
      case 3:
        return "SuccessAlert";
      case 4:
        return "LoadingAlert";
      default:
        return "InformationAlert";
    }
  };

  return {
    id: Math.floor(Math.random() * 1000),
    type: selectedType(),
    message: {
      title: `Fetch Information Error ${number}`,
      description: "Polkadex Orderbook is under maintenance, try again later.",
      ...info?.message,
    },
    time: new Date().getTime(),
    ...info,
  };
};
