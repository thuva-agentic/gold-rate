import { formatLkr } from "../formatLkr";

type RateDetailsProps = {
  perGramLkr?: number;
  usdPerTroyOz?: number;
  usdToLkr?: number;
  spotSource?: string;
  fxSource?: string;
  isLoading: boolean;
};

const DetailRow = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <div className="flex items-center justify-between gap-4 border-b border-amber-100 py-3 last:border-0 dark:border-amber-900/40">
    <dt className="text-sm text-zinc-600 dark:text-zinc-400">{label}</dt>
    <dd className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
      {value}
    </dd>
  </div>
);

export const RateDetails = ({
  perGramLkr,
  usdPerTroyOz,
  usdToLkr,
  spotSource,
  fxSource,
  isLoading,
}: RateDetailsProps) => {
  if (isLoading) {
    return (
      <div className="space-y-3" aria-hidden>
        {[1, 2, 3].map((key) => (
          <div
            key={key}
            className="h-10 animate-pulse rounded bg-amber-100/80 dark:bg-amber-900/30"
          />
        ))}
      </div>
    );
  }

  return (
    <dl>
      <DetailRow
        label="Per gram (LKR)"
        value={perGramLkr !== undefined ? formatLkr(perGramLkr) : "—"}
      />
      <DetailRow
        label="Spot (USD / troy oz)"
        value={
          usdPerTroyOz !== undefined
            ? `$${usdPerTroyOz.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
            : "—"
        }
      />
      <DetailRow
        label="USD → LKR"
        value={
          usdToLkr !== undefined
            ? usdToLkr.toLocaleString("en-LK", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            : "—"
        }
      />
      <DetailRow
        label="Sources"
        value={[spotSource, fxSource].filter(Boolean).join(" · ") || "—"}
      />
    </dl>
  );
};
