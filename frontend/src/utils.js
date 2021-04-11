export function getKeyByValue(obj, value) {
  return Object.keys(obj)
    .find((key) => obj[key] === value);
}

export function getAxisTitles(str, separator) {
  return str.split(separator).map((item) => item.trim());
}
