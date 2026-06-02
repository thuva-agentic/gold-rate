import { formatLkr } from "../formatLkr";

type PawnPriceHeroProps = {
  pawnLkr?: number;
  isLoading: boolean;
  karat: string;
};

export const PawnPriceHero = ({
  pawnLkr,
  isLoading,
  karat,
}: PawnPriceHeroProps) => (
  <div className="text-center">
    <p className="text-sm font-medium uppercase tracking-widest text-amber-800/80 dark:text-amber-300/80">
      1 pawn · 8g · {karat}
    </p>
    {isLoading ? (
      <div
        className="mx-auto mt-4 h-16 w-64 animate-pulse rounded-lg bg-amber-200/60 dark:bg-amber-900/40"
        aria-hidden
      />
    ) : (
      <p
        className="mt-2 text-5xl font-bold tracking-tight text-amber-950 dark:text-amber-50 sm:text-6xl"
        aria-live="polite"
      >
        {pawnLkr !== undefined ? formatLkr(pawnLkr) : "—"}
      </p>
    )}
  </div>
);
