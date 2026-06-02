export type Karat = "24k" | "22k";

export type GoldSpotQuote = {
  /** International spot price in USD per troy ounce */
  usdPerTroyOz: number;
  /** ISO-8601 timestamp when the quote was obtained */
  fetchedAt: string;
  source?: string;
};

export type FxQuote = {
  /** How many LKR per 1 USD */
  usdToLkr: number;
  fetchedAt: string;
  source?: string;
};

export type PawnPriceResult = {
  /** Total price for one pawn (8g) in LKR */
  pawnLkr: number;
  /** Price per gram in LKR for the selected karat */
  perGramLkr: number;
  karat: Karat;
  pawnGrams: number;
};
