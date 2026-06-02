import type { Karat } from "../types";

type KaratToggleProps = {
  karat: Karat;
  onKaratChange: (karat: Karat) => void;
};

const options: { value: Karat; label: string }[] = [
  { value: "24k", label: "24K" },
  { value: "22k", label: "22K" },
];

export const KaratToggle = ({ karat, onKaratChange }: KaratToggleProps) => (
  <div
    className="inline-flex rounded-full border border-amber-200/80 bg-amber-50/80 p-1 dark:border-amber-900/60 dark:bg-amber-950/40"
    role="group"
    aria-label="Gold purity"
  >
    {options.map(({ value, label }) => {
      const selected = karat === value;
      return (
        <button
          key={value}
          type="button"
          aria-pressed={selected}
          onClick={() => onKaratChange(value)}
          className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
            selected
              ? "bg-amber-500 text-amber-950 shadow-sm"
              : "text-amber-900/70 hover:text-amber-950 dark:text-amber-200/70 dark:hover:text-amber-50"
          }`}
        >
          {label}
        </button>
      );
    })}
  </div>
);
