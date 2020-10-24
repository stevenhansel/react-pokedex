export const leftPad = (number: number, targetLength: number) => {
  let output = number + "";
  while (output.length < targetLength) {
    output = "0" + output;
  }
  return output;
};
