/** Format an LKR amount with Rs. prefix and exactly 2 decimal places */
export const formatLkr = (amount: number): string => {
  const safe = Number.isFinite(amount) ? amount : 0;
  const formatted = safe.toLocaleString("en-LK", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `Rs. ${formatted}`;
};
