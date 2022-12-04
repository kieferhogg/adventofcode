import { contents, submit } from "../../util.js";
import _ from "lodash";
Array.prototype.sum = function () {
  return this.reduce((a, b) => a + b, 0);
};

const testAnswer = ""

const getOutput = (input) => {
  const output = input
    .split("\n")

  return output;
}

const testOutput = getOutput(contents('year/day/test.txt'));
console.log(`------ Test -------`);
console.log(testOutput);
console.log(`--- Test Answer ---`);
console.log(testAnswer);

if (testOutput === testAnswer) {
  const output = getOutput(contents('year/day/input.txt'));
  console.log(`------ Final ------`);
  console.log(output);
  console.log(await submit(year, day, output, 1)) // Change last parameter to 2 for part 2
}