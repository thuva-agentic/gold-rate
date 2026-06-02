"use client";

import { useQueries } from "@tanstack/react-query";
import { fetchFxUsdLkr, fetchGoldSpot } from "./fetchGoldRate";
import { goldRateQueryKeys } from "./queryKeys";
import type { FxQuote, GoldSpotQuote } from "./types";

/** Auto-poll interval from GLD-4 spec (30 seconds) */
export const GOLD_RATE_REFETCH_MS = 30_000;

export type GoldRateState = {
  spot: GoldSpotQuote | undefined;
  fx: FxQuote | undefined;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  isStale: boolean;
  error: Error | undefined;
  dataUpdatedAt: number | undefined;
};

export const useGoldRate = (): GoldRateState => {
  const [spotQuery, fxQuery] = useQueries({
    queries: [
      {
        queryKey: goldRateQueryKeys.spot(),
        queryFn: fetchGoldSpot,
        refetchInterval: GOLD_RATE_REFETCH_MS,
      },
      {
        queryKey: goldRateQueryKeys.fx(),
        queryFn: fetchFxUsdLkr,
        refetchInterval: GOLD_RATE_REFETCH_MS,
      },
    ],
  });

  const toError = (value: unknown): Error | undefined =>
    value instanceof Error ? value : value ? new Error(String(value)) : undefined;

  const spotUpdated = spotQuery.dataUpdatedAt ?? 0;
  const fxUpdated = fxQuery.dataUpdatedAt ?? 0;
  const latestUpdate = Math.max(spotUpdated, fxUpdated);

  return {
    spot: spotQuery.data,
    fx: fxQuery.data,
    isLoading: spotQuery.isLoading || fxQuery.isLoading,
    isFetching: spotQuery.isFetching || fxQuery.isFetching,
    isError: spotQuery.isError || fxQuery.isError,
    isStale: spotQuery.isStale || fxQuery.isStale,
    error: toError(spotQuery.error) ?? toError(fxQuery.error),
    dataUpdatedAt: latestUpdate > 0 ? latestUpdate : undefined,
  };
};
