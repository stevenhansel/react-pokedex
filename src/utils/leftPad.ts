export const leftPad = (number: number, targetLength: number): string => {
  let output = Math.abs(number).toString();
  while (output.length < Math.abs(targetLength)) {
    output = "0" + output;
  }
  return output;
};
