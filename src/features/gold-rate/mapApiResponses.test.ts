import { describe, expect, it } from "vitest";
import { mapFxApiToFxQuote, mapMetalsApiToGoldSpot } from "./mapApiResponses";

describe("mapMetalsApiToGoldSpot", () => {
  it("inverts XAU rate to USD per troy ounce", () => {
    const quote = mapMetalsApiToGoldSpot({
      success: true,
      timestamp: 1_700_000_000,
      rates: { XAU: 0.0005 },
    });

    expect(quote).not.toBeNull();
    expect(quote?.usdPerTroyOz).toBe(2000);
    expect(quote?.source).toBe("metals-api");
  });

  it("returns null when XAU is missing or invalid", () => {
    expect(mapMetalsApiToGoldSpot({ success: true, rates: {} })).toBeNull();
    expect(mapMetalsApiToGoldSpot({ success: false, rates: { XAU: 0.0005 } })).toBeNull();
  });
});

describe("mapFxApiToFxQuote", () => {
  it("maps LKR rate from exchangerate-api shape", () => {
    const quote = mapFxApiToFxQuote({
      date: "2026-06-02",
      rates: { LKR: 300.25 },
    });

    expect(quote).not.toBeNull();
    expect(quote?.usdToLkr).toBe(300.25);
    expect(quote?.source).toBe("exchangerate-api");
  });

  it("returns null when LKR is missing", () => {
    expect(mapFxApiToFxQuote({ rates: {} })).toBeNull();
  });
});
