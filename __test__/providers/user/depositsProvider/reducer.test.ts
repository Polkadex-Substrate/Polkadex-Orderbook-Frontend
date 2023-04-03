import {
  DepositsAction,
  depositsReducer,
  DepositsState,
} from "@polkadex/orderbook/providers/user/depositProvider";

interface testCases {
  state: DepositsState;
  action: DepositsAction;
  output: DepositsState;
}

const cases: testCases[] = [
  {
    state: { loading: false, success: false },
    action: { type: "deposits/FETCH" },
    output: { loading: true, success: false },
  },
  {
    state: { loading: false, success: false },
    action: {
      type: "deposits/DATA",
    },
    output: {
      loading: false,
      success: true,
    },
  },
  {
    state: { loading: true, success: false },
    action: {
      type: "deposits/RESET",
    },
    output: {
      loading: false,
      success: false,
    },
  },
];

test.each(cases)("deposits reducer", ({ state, action, output }) => {
  expect(depositsReducer(state, action)).toStrictEqual(output);
});
