import { GoldRateDashboard } from "@/features/gold-rate/components/GoldRateDashboard";

export default function Home() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-gradient-to-b from-amber-50 via-white to-amber-50/50 font-sans dark:from-zinc-950 dark:via-black dark:to-zinc-950">
      <GoldRateDashboard />
    </div>
  );
}
