import { displayLocaleNumber, displayLocalePercent } from '@/views/multiTypeDashboard/utils';

describe('utils.ts', () => {
  it('displayLocalePercent', () => {
    expect(displayLocalePercent(undefined)).toBe('-');
    expect(displayLocalePercent(null)).toBe('-');
    expect(displayLocalePercent(false)).toBe('-');
    expect(displayLocalePercent('abc')).toBe('-');
    expect(displayLocalePercent(NaN)).toBe('-');
    expect(displayLocalePercent(-12)).toBe('-12%');
    expect(displayLocalePercent(34)).toBe('34%');
    expect(displayLocalePercent(-1234.63)).toBe('-1.234,6%');
    expect(displayLocalePercent(1234.35)).toBe('1.234,3%');
    expect(displayLocalePercent(56.3)).toBe('56,3%');
    expect(displayLocalePercent(57.0)).toBe('57%');
  });

  it('displayLocaleNumber', () => {
    expect(displayLocaleNumber(undefined)).toBe('-');
    expect(displayLocaleNumber(null)).toBe('-');
    expect(displayLocaleNumber(false)).toBe('-');
    expect(displayLocaleNumber('abc')).toBe('-');
    expect(displayLocaleNumber(NaN)).toBe('-');
    expect(displayLocaleNumber(-12)).toBe('-12');
    expect(displayLocaleNumber(34)).toBe('34');
    expect(displayLocaleNumber(-1234.63)).toBe('-1.234,63');
    expect(displayLocaleNumber(1234.35)).toBe('1.234,35');
    expect(displayLocaleNumber(56.3)).toBe('56,3');
    expect(displayLocaleNumber(57.0)).toBe('57');
  });
});
