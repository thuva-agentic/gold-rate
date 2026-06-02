import type { FxQuote, GoldSpotQuote } from "./types";

/** metals-api.com `/latest` response (USD base, XAU symbol) */
export type MetalsApiLatestResponse = {
  success?: boolean;
  timestamp?: number;
  rates?: {
    XAU?: number;
  };
};

/** exchangerate-api.com `/v4/latest/USD` style response */
export type ExchangeRateApiResponse = {
  date?: string;
  rates?: {
    LKR?: number;
  };
};

/**
 * metals-api returns XAU as troy ounces per 1 USD; invert for USD per troy oz.
 */
export const mapMetalsApiToGoldSpot = (
  data: MetalsApiLatestResponse,
): GoldSpotQuote | null => {
  if (data.success === false) {
    return null;
  }

  const xauPerUsd = data.rates?.XAU;
  if (xauPerUsd === undefined || !Number.isFinite(xauPerUsd) || xauPerUsd <= 0) {
    return null;
  }

  const usdPerTroyOz = 1 / xauPerUsd;
  const fetchedAt =
    data.timestamp !== undefined
      ? new Date(data.timestamp * 1000).toISOString()
      : new Date().toISOString();

  return {
    usdPerTroyOz,
    fetchedAt,
    source: "metals-api",
  };
};

export const mapFxApiToFxQuote = (
  data: ExchangeRateApiResponse,
): FxQuote | null => {
  const usdToLkr = data.rates?.LKR;
  if (usdToLkr === undefined || !Number.isFinite(usdToLkr) || usdToLkr <= 0) {
    return null;
  }

  const fetchedAt = data.date
    ? new Date(`${data.date}T00:00:00.000Z`).toISOString()
    : new Date().toISOString();

  return {
    usdToLkr,
    fetchedAt,
    source: "exchangerate-api",
  };
};
