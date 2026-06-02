"use client";

import { useState } from "react";
import type { Karat } from "../types";
import { usePawnPrice } from "../usePawnPrice";
import { KaratToggle } from "./KaratToggle";
import { LastUpdated } from "./LastUpdated";
import { PawnPriceHero } from "./PawnPriceHero";
import { RateDetails } from "./RateDetails";
import { RateStatusBanner } from "./RateStatusBanner";

export const GoldRateDashboard = () => {
  const [karat, setKarat] = useState<Karat>("24k");
  const {
    spot,
    fx,
    pawnPrice,
    isLoading,
    isFetching,
    isError,
    isStale,
    error,
    dataUpdatedAt,
  } = usePawnPrice(karat);

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-12 sm:px-6">
      <div className="w-full max-w-lg">
        <header className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-amber-950 dark:text-amber-50 sm:text-3xl">
            Gold Rate LKR
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Live international spot · 8 gram pawn in Sri Lankan Rupees
          </p>
        </header>

        <div className="space-y-6 rounded-2xl border border-amber-200/80 bg-white/90 p-6 shadow-lg backdrop-blur-sm dark:border-amber-900/50 dark:bg-zinc-900/80 sm:p-8">
          <RateStatusBanner
            isLoading={isLoading}
            isError={isError}
            isStale={isStale}
            isFetching={isFetching}
            error={error}
          />

          <div className="flex justify-center">
            <KaratToggle karat={karat} onKaratChange={setKarat} />
          </div>

          <PawnPriceHero
            pawnLkr={pawnPrice?.pawnLkr}
            isLoading={isLoading}
            karat={karat}
          />

          <RateDetails
            perGramLkr={pawnPrice?.perGramLkr}
            usdPerTroyOz={spot?.usdPerTroyOz}
            usdToLkr={fx?.usdToLkr}
            spotSource={spot?.source}
            fxSource={fx?.source}
            isLoading={isLoading}
          />

          <LastUpdated
            dataUpdatedAt={dataUpdatedAt}
            isFetching={isFetching}
          />
        </div>
      </div>
    </main>
  );
};
