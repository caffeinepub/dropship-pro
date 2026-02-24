export function calculateProfitMargin(wholesalePrice: number, retailPrice: number): number {
  return retailPrice - wholesalePrice;
}

export function calculateOrderProfit(
  wholesalePrice: number,
  retailPrice: number,
  quantity: bigint
): number {
  const profitPerUnit = calculateProfitMargin(wholesalePrice, retailPrice);
  return profitPerUnit * Number(quantity);
}
