export const randomize = (minimum: number, maximum: number) =>
  Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
