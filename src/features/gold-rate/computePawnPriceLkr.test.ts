import { describe, expect, it } from "vitest";
import { computePawnPriceLkr, lkrPerGram } from "./computePawnPriceLkr";
import { PAWN_GRAMS } from "./constants";
import { formatLkr } from "./formatLkr";
import type { FxQuote, GoldSpotQuote } from "./types";

const spot = (usdPerTroyOz: number): GoldSpotQuote => ({
  usdPerTroyOz,
  fetchedAt: "2026-06-02T12:00:00.000Z",
  source: "test",
});

const fx = (usdToLkr: number): FxQuote => ({
  usdToLkr,
  fetchedAt: "2026-06-02T12:00:00.000Z",
  source: "test",
});

describe("computePawnPriceLkr", () => {
  it("computes 24k pawn price from spot and FX", () => {
    const result = computePawnPriceLkr(spot(2000), fx(300), "24k");

    expect(result.pawnGrams).toBe(PAWN_GRAMS);
    expect(result.perGramLkr).toBe(lkrPerGram(spot(2000), fx(300), "24k"));
    expect(result.pawnLkr).toBe(
      Math.round(result.perGramLkr * PAWN_GRAMS * 100) / 100,
    );
    expect(result.pawnLkr).toBeGreaterThan(0);
  });

  it("22k pawn is proportionally lower than 24k for the same inputs", () => {
    const pure = computePawnPriceLkr(spot(2000), fx(300), "24k");
    const karat22 = computePawnPriceLkr(spot(2000), fx(300), "22k");

    expect(karat22.perGramLkr / pure.perGramLkr).toBeCloseTo(22 / 24, 5);
    expect(karat22.pawnLkr / pure.pawnLkr).toBeCloseTo(22 / 24, 5);
    expect(karat22.perGramLkr).toBeLessThan(pure.perGramLkr);
  });

  it("rounds pawn and per-gram amounts to 2 decimals", () => {
    const result = computePawnPriceLkr(spot(1999.99), fx(301.555), "24k");

    expect(result.perGramLkr).toBe(
      Math.round(result.perGramLkr * 100) / 100,
    );
    expect(result.pawnLkr).toBe(Math.round(result.pawnLkr * 100) / 100);
  });

  it("returns zero when spot or FX is zero or invalid", () => {
    expect(computePawnPriceLkr(spot(0), fx(300), "24k").pawnLkr).toBe(0);
    expect(computePawnPriceLkr(spot(2000), fx(0), "24k").pawnLkr).toBe(0);
    expect(
      computePawnPriceLkr(
        { ...spot(2000), usdPerTroyOz: Number.NaN },
        fx(300),
        "24k",
      ).pawnLkr,
    ).toBe(0);
  });
});

describe("formatLkr", () => {
  it("formats with Rs. prefix and 2 decimals", () => {
    expect(formatLkr(1234.5)).toBe("Rs. 1,234.50");
    expect(formatLkr(0)).toBe("Rs. 0.00");
  });

  it("handles non-finite values as zero", () => {
    expect(formatLkr(Number.NaN)).toBe("Rs. 0.00");
  });
});
