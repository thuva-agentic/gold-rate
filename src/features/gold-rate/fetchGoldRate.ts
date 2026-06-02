import type { ApiErrorBody } from "@/lib/api-response";
import type { FxQuote, GoldSpotQuote } from "./types";

const parseError = async (response: Response): Promise<string> => {
  try {
    const body = (await response.json()) as ApiErrorBody;
    return body.error ?? `Request failed (${response.status})`;
  } catch {
    return `Request failed (${response.status})`;
  }
};

const fetchJson = async <T>(path: string): Promise<T> => {
  const response = await fetch(path);

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return response.json() as Promise<T>;
};

export const fetchGoldSpot = (): Promise<GoldSpotQuote> =>
  fetchJson<GoldSpotQuote>("/api/gold-spot");

export const fetchFxUsdLkr = (): Promise<FxQuote> =>
  fetchJson<FxQuote>("/api/fx-usd-lkr");
