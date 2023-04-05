import { assetsReducer } from "@polkadex/orderbook/providers/public/assetsProvider";
import { AssetsAction } from "@polkadex/orderbook/providers/public/assetsProvider/actions";
import { AssetsState } from "@polkadex/orderbook/providers/public/assetsProvider/types";

interface testCases {
  state: AssetsState;
  action: AssetsAction;
  output: AssetsState;
}

const cases: testCases[] = [
  {
    state: { list: [], loading: false, success: false },
    action: { type: "publicAssets/FETCH" },
    output: { list: [], loading: true, success: false },
  },
  {
    state: { list: [], loading: false, success: false },
    action: {
      type: "publicAssets/DATA",
      payload: {
        list: [
          { assetId: "PDEX", name: "POLKADEX", symbol: "PDEX" },
          { assetId: "TDOT", name: "TEST DOT", symbol: "1" },
        ],
      },
    },
    output: {
      list: [
        { assetId: "PDEX", name: "POLKADEX", symbol: "PDEX" },
        { assetId: "TDOT", name: "TEST DOT", symbol: "1" },
      ],
      loading: false,
      success: true,
    },
  },
];

test.each(cases)("assets reducer", ({ state, action, output }) => {
  expect(assetsReducer(state, action)).toStrictEqual(output);
});
