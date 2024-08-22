export const pad = (num: number) => {
  if (num > 99) {
    return `#${num}`;
  }

  if (num > 9) {
    return `#0${num}`;
  }

  return `#00${num}`;
};
