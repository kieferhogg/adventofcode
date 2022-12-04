import { mkdir, writeFile, readFile } from 'fs/promises';
import { existsSync } from 'fs';
import { argv } from 'process';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import { importer } from './util.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

try {
  const today = new Date().toLocaleString("en-US", { timeZone: "UTC" });
  const year = argv[2] || today.split("/")[2].split(",")[0];
  const day = argv[3] || today.split("/")[1];
  const yearFolder = join(__dirname, year);
  const dayFolder = join(yearFolder, day);

  if (!existsSync(yearFolder)) {
    console.log(`Creating ${year}`);
    await mkdir(join(__dirname, `${year}`));
  }

  if (!existsSync(dayFolder)) {
    console.log(`Creating ${year}/day${day}`);
    await mkdir(join(__dirname, `${year}`, `${day}`));
  }

  if (!existsSync(join(dayFolder, 'input.txt'))) {
    console.log(`Creating input.txt`);
    const input = await importer(year, day);
    await writeFile(join(__dirname, `./${year}/${day}/input.txt`), input);
  }

  if (!existsSync(join(dayFolder, 'test.txt'))) {
    console.log(`Creating test.txt`);
    await writeFile(join(__dirname, `./${year}/${day}/test.txt`), "");
  }

  if (!existsSync(join(dayFolder, 'index.js'))) {
    console.log(`Creating index.js`);
    const template = await readFile(join(__dirname, 'template.js'), 'utf8');
    await writeFile(join(__dirname, `./${year}/${day}/index.js`), template.replace(/year/g, year).replace(/day/g, `${day}`));
  }
  console.log(`${"\n".repeat(5)}${" ".repeat(20)}https://adventofcode.com/${year}/day/${day}${"\n".repeat(4)}`);
} catch (error) {
  console.error(error);
}