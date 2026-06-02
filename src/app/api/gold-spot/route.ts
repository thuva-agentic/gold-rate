import { mapMetalsApiToGoldSpot } from "@/features/gold-rate/mapApiResponses";
import type { MetalsApiLatestResponse } from "@/features/gold-rate/mapApiResponses";
import { apiError, apiSuccess } from "@/lib/api-response";
import { EnvError, getServerEnv } from "@/lib/env";

export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  try {
    const { metalsApiKey, metalsApiBaseUrl } = getServerEnv();
    const base = metalsApiBaseUrl.replace(/\/$/, "");
    const url = new URL(`${base}/latest`);
    url.searchParams.set("access_key", metalsApiKey);
    url.searchParams.set("base", "USD");
    url.searchParams.set("symbols", "XAU");

    const response = await fetch(url.toString(), {
      cache: "no-store",
    });

    if (!response.ok) {
      return apiError(
        `Metals API returned ${response.status}`,
        response.status >= 500 ? 502 : response.status,
      );
    }

    const payload = (await response.json()) as MetalsApiLatestResponse;
    const quote = mapMetalsApiToGoldSpot(payload);

    if (!quote) {
      return apiError("Invalid or empty metals API response", 502);
    }

    return apiSuccess(quote);
  } catch (error) {
    if (error instanceof EnvError) {
      return apiError(error.message, 500);
    }
    return apiError("Failed to fetch gold spot price", 500);
  }
}
