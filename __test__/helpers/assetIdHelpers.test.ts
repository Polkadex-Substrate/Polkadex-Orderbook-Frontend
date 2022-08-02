import { getNameFromAssetId, getSymbolFromAssetId } from "../../src/helpers/assetIdHelpers";

describe("Test Asset ID", () => {
  it("Should get name from assetId", () => {
    const name = getNameFromAssetId(0);
    expect(name).toBe('POLKADOGE');
  });
  it("Should get symbol from assetId", () => {
    const name = getSymbolFromAssetId(1);
    expect(name).toBe('SDX');
  });
});
