import { contents, submit } from "../../util.js";

try {
  const output = contents('/year/day/input.txt')
    .split("\n");

  let answer = output;

  console.log(answer);

  // console.log(await submit(year, day, answer, 1)) // Change last parameter to 2 for part 2
} catch (error) {
  console.error(error);
}