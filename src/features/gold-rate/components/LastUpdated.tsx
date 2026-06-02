type LastUpdatedProps = {
  dataUpdatedAt?: number;
  isFetching: boolean;
};

const formatTimestamp = (ms: number): string =>
  new Date(ms).toLocaleString("en-LK", {
    dateStyle: "medium",
    timeStyle: "short",
  });

export const LastUpdated = ({
  dataUpdatedAt,
  isFetching,
}: LastUpdatedProps) => (
  <p className="text-center text-xs text-zinc-500 dark:text-zinc-400">
    {dataUpdatedAt !== undefined ? (
      <>
        Last updated:{" "}
        <time dateTime={new Date(dataUpdatedAt).toISOString()}>
          {formatTimestamp(dataUpdatedAt)}
        </time>
        {isFetching ? " · refreshing…" : " · auto-refresh every 30s"}
      </>
    ) : (
      "Waiting for live rates…"
    )}
  </p>
);
