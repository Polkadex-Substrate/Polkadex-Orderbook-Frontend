import { getIsDecreasingArray } from "./getIsDecreasingArray";

const isDecreasingCases = [
  [
    {
      amount: "0.25",
      market_id: "PDEX-1",
      price: "12",
      timestamp: 1678452609042,
    },
  ],
  [
    {
      amount: "0.25",
      market_id: "PDEX-1",
      price: "12",
      timestamp: 1678452609042,
    },
    {
      amount: "1",
      market_id: "PDEX-1",
      price: "10",
      timestamp: 1678452307235,
    },
  ],
  [
    {
      amount: "0.25",
      market_id: "PDEX-1",
      price: "12",
      timestamp: 1678452609042,
    },
    {
      amount: "1",
      market_id: "PDEX-1",
      price: "10",
      timestamp: 1678452307235,
    },
    {
      amount: "0.25",
      market_id: "PDEX-1",
      price: "12",
      timestamp: 1678452252277,
    },
  ],
];
const isDecreasingOutput = [[false], [false, false], [false, true, false]];
for (let i = 0; i < isDecreasingCases.length; i++) {
  test("is decreasing", () => {
    expect(getIsDecreasingArray(isDecreasingCases[i])).toStrictEqual(isDecreasingOutput[i]);
  });
}
