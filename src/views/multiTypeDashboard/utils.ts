export function displayLocalePercent(v: unknown) {
  if (typeof v !== 'number' || Number.isNaN(v)) return '-';
  return `${Number(v.toFixed(1)).toLocaleString('pt-br')}%`;
}

export function displayLocaleNumber(v: unknown) {
  return typeof v === 'number' && !Number.isNaN(v) ? v.toLocaleString('pt-br') : '-';
}
