/* eslint-disable @typescript-eslint/no-explicit-any */
export const defaulIntrotStyles = {
  popover: (e: any) => ({
    ...e,
    backgroundColor: "transparent",
  }),
  badge: (e: any) => ({
    ...e,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "20px",
    height: "20px",
    fontSize: 12,
  }),
  close: (e: any) => ({
    ...e,
    position: "absolute",
    top: 0,
    right: 0,
    color: "white",
    width: 30,
    heigh: 30,
    padding: 10,
    borderRadius: 100,
  }),
};
