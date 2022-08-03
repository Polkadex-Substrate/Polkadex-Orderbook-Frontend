export const fakeInformation = () => {
  const number = Math.floor(Math.random() * 1000);
  const n = Math.floor(Math.random() * (4 - 1) + 1);

  const selectedType = () => {
    switch (n) {
      case 1:
        return "ErrorAlert";
      case 2:
        return "AttentionAlert";
      default:
        return "InformationAlert";
    }
  };

  return {
    type: selectedType(),
    message: {
      title: `Fetch Information Error ${number}`,
      description: "Polkadex Orderbook is under maintenance, try again later.",
    },
    time: new Date().toLocaleString(),
  };
};
