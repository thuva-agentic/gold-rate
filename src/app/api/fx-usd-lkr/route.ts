import { mapFxApiToFxQuote } from "@/features/gold-rate/mapApiResponses";
import type { ExchangeRateApiResponse } from "@/features/gold-rate/mapApiResponses";
import { apiError, apiSuccess } from "@/lib/api-response";
import { EnvError, getServerEnv } from "@/lib/env";

export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  try {
    const { fxApiUrl } = getServerEnv();

    const response = await fetch(fxApiUrl, {
      cache: "no-store",
    });

    if (!response.ok) {
      return apiError(
        `FX API returned ${response.status}`,
        response.status >= 500 ? 502 : response.status,
      );
    }

    const payload = (await response.json()) as ExchangeRateApiResponse;
    const quote = mapFxApiToFxQuote(payload);

    if (!quote) {
      return apiError("Invalid or empty FX API response", 502);
    }

    return apiSuccess(quote);
  } catch (error) {
    if (error instanceof EnvError) {
      return apiError(error.message, 500);
    }
    return apiError("Failed to fetch USD to LKR rate", 500);
  }
}
