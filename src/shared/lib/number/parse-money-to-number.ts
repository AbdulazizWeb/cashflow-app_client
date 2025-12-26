export function parseMoneyToNumber(s: string) {
  const cleaned = s.replace(/\s|\u00A0/g, "").replace(",", ".");
  if (!cleaned || cleaned === ".") return 0;
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : 0;
}
