import { convertExponentialToString } from "../../src/helpers/convertExponential";

describe("Convert exponential to string", () => {
  // this method fails for values as large as this ==> 4.210547869141053e+40
  it("should convert exponential to string by removing the exponential", () => {
    const value = convertExponentialToString(453e4);
    expect(value).toBe("4530000");
  });

  it("numbers without exponential should output there equivalent in string format", () => {
    const value = convertExponentialToString(453);
    expect(value).toBe("453");
  });
});
