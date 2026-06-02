type RateStatusBannerProps = {
  isLoading: boolean;
  isError: boolean;
  isStale: boolean;
  isFetching: boolean;
  error?: Error;
};

export const RateStatusBanner = ({
  isLoading,
  isError,
  isStale,
  isFetching,
  error,
}: RateStatusBannerProps) => {
  if (isLoading) {
    return (
      <div
        className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-900 dark:bg-amber-950/50 dark:text-amber-100"
        role="status"
      >
        Loading live gold rates…
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-900 dark:border-red-900 dark:bg-red-950/40 dark:text-red-100"
        role="alert"
      >
        <p className="font-medium">Could not load rates</p>
        <p className="mt-1 opacity-90">
          {error?.message ?? "An unexpected error occurred."}
        </p>
      </div>
    );
  }

  if (isStale && !isFetching) {
    return (
      <div
        className="rounded-lg border border-amber-400 bg-amber-100 px-4 py-3 text-sm text-amber-950 dark:border-amber-700 dark:bg-amber-900/30 dark:text-amber-50"
        role="status"
      >
        Rates may be outdated. Showing last successful fetch.
      </div>
    );
  }

  return null;
};
