import { contents, submit } from "../../util.js";
Array.prototype.sum = function () {
  return this.reduce((a, b) => a + b, 0);
};

const testAnswer = ""

const getOutput = (input) => {
  const output = input
    .split("\n");

  return output;
}

const testOutput = getOutput(contents('year/day/test.txt'));
console.log(`------ Test -------\n${testOutput}\n--- Test Answer ---\n${testAnswer}\n------ Final ------`);

if (testOutput === testAnswer) {
  const output = getOutput(contents('year/day/input.txt'));
  console.log(output);
  console.log(await submit(year, day, output, 1)) // Change last parameter to 2 for part 2
}
