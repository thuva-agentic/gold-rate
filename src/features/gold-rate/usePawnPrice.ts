"use client";

import { useMemo } from "react";
import { computePawnPriceLkr } from "./computePawnPriceLkr";
import type { Karat, PawnPriceResult } from "./types";
import { useGoldRate, type GoldRateState } from "./useGoldRate";

export type PawnPriceState = GoldRateState & {
  pawnPrice: PawnPriceResult | undefined;
};

export const usePawnPrice = (karat: Karat): PawnPriceState => {
  const goldRate = useGoldRate();

  const pawnPrice = useMemo(() => {
    if (!goldRate.spot || !goldRate.fx) {
      return undefined;
    }
    return computePawnPriceLkr(goldRate.spot, goldRate.fx, karat);
  }, [goldRate.spot, goldRate.fx, karat]);

  return {
    ...goldRate,
    pawnPrice,
  };
};
