import { getIsDecreasingArray } from "../../src/helpers/getIsDecreasingArray";

const cases = [
  [
    {
      input: [
        {
          amount: "0.25",
          market_id: "PDEX-1",
          price: "12",
          timestamp: 1678452609042,
        },
      ],
      output: [false],
    },
  ],
  [
    {
      input: [
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
      output: [false, false],
    },
  ],
  [
    {
      input: [
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
      output: [false, true, false],
    },
  ],
];

test.each(cases)("is decreasing", ({ input, output }) => {
  expect(getIsDecreasingArray(input)).toStrictEqual(output);
});
