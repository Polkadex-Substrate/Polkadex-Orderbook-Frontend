import { testCases } from "./testCases";
import { ordersHistoryReducer } from "./reducer";

for (let i = 0; i < testCases.length; i++) {
  const testCase = testCases[i];
  test(testCase.action.type, () => {
    expect(ordersHistoryReducer(testCase.state, testCase.action)).toStrictEqual(
      testCase.output
    );
  });
}
