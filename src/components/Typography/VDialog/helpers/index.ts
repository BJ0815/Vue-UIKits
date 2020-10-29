export function convertToUnit(
  str: string | number | null | undefined,
  unit = 'px'
): string | undefined {
  if (str == null || str === '') {
    return undefined;
  }

  // eslint-disable-next-line no-restricted-globals
  if (isNaN(+str)) {
    return String(str);
  }
  return `${Number(str)}${unit}`;
}

export default {
  convertToUnit,
};
