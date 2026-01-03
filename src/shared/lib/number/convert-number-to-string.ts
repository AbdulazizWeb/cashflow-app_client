export function convertNumberToString(number: number): string {
  return number.toString();
}

const nf = new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 2 });

export function formatMoney(n: number) {
  return nf.format(n);
}
