export function isNotNANNumber(v: unknown): v is number {
  return typeof v === 'number' && !Number.isNaN(v);
}

export function displayLocalePercent(v: unknown) {
  if (!isNotNANNumber(v)) return '-';
  return `${Number(v.toFixed(1)).toLocaleString('pt-br')}%`;
}

export function displayLocaleNumber(v: unknown) {
  return isNotNANNumber(v) ? v.toLocaleString('pt-br') : '-';
}
