import {
  KARAT_PURITY,
  PAWN_GRAMS,
  TROY_OZ_GRAMS,
} from "./constants";
import type { FxQuote, GoldSpotQuote, Karat, PawnPriceResult } from "./types";

const round2 = (value: number): number =>
  Math.round((value + Number.EPSILON) * 100) / 100;

const nonNegative = (value: number): number =>
  Number.isFinite(value) && value > 0 ? value : 0;

/** USD per gram of pure (24k) gold from troy-ounce spot */
export const usdPerGramFromSpot = (usdPerTroyOz: number): number =>
  nonNegative(usdPerTroyOz) / TROY_OZ_GRAMS;

/** LKR per gram for a given karat */
export const lkrPerGram = (
  spot: GoldSpotQuote,
  fx: FxQuote,
  karat: Karat,
): number => {
  const purity = KARAT_PURITY[karat];
  const usdGram = usdPerGramFromSpot(spot.usdPerTroyOz);
  const rate = nonNegative(fx.usdToLkr);
  return round2(usdGram * rate * purity);
};

/** Compute 8g (1 pawn) price in LKR from spot and FX */
export const computePawnPriceLkr = (
  spot: GoldSpotQuote,
  fx: FxQuote,
  karat: Karat,
): PawnPriceResult => {
  const perGramLkr = lkrPerGram(spot, fx, karat);
  const pawnLkr = round2(perGramLkr * PAWN_GRAMS);

  return {
    pawnLkr,
    perGramLkr,
    karat,
    pawnGrams: PAWN_GRAMS,
  };
};
