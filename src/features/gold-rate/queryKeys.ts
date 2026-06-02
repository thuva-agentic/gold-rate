export const goldRateQueryKeys = {
  all: ["gold-rate"] as const,
  spot: () => [...goldRateQueryKeys.all, "spot"] as const,
  fx: () => [...goldRateQueryKeys.all, "fx"] as const,
};
