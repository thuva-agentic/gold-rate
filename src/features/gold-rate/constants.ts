import type { Karat } from "./types";

/** One pawn (Sri Lankan market convention) */
export const PAWN_GRAMS = 8;

/** Troy ounce weight used for international gold spot quotes */
export const TROY_OZ_GRAMS = 31.1034768;

/** Purity multiplier applied to pure (24k) spot price */
export const KARAT_PURITY: Record<Karat, number> = {
  "24k": 24 / 24,
  "22k": 22 / 24,
};
