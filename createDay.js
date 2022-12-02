import fsp from 'fs/promises';
import fs from 'fs';
import process from 'process';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import { importer } from './util.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

try {
  const today = new Date().toLocaleString("en-US", { timeZone: "UTC" });
  const year = process.argv[2] || today.split("/")[2].split(",")[0];
  const day = process.argv[3] || today.split("/")[1];
  const yearFolder = join(__dirname, year);
  const dayFolder = join(yearFolder, day);

  if (!fs.existsSync(yearFolder)) {
    console.log(`Creating ${year}`);
    await fsp.mkdir(join(__dirname, `${year}`));
  }

  if (!fs.existsSync(dayFolder)) {
    console.log(`Creating ${year}/day${day}`);
    await fsp.mkdir(join(__dirname, `${year}`, `${day}`));
  }

  if (!fs.existsSync(join(dayFolder, 'input.txt'))) {
    console.log(`Creating input.txt`);
    const input = await importer(year, day);
    await fsp.writeFile(join(__dirname, `./${year}/${day}/input.txt`), input);
  }

  if (!fs.existsSync(join(dayFolder, 'index.js'))) {
    console.log(`Creating index.js`);
    const template = await fsp.readFile(join(__dirname, 'template.js'), 'utf8');
    await fsp.writeFile(join(__dirname, `./${year}/${day}/index.js`), template.replace(/year/g, year).replace(/day/g, `${day}`));
  }
  console.log(`${"\n".repeat(5)}${" ".repeat(20)}https://adventofcode.com/${year}/day/${day}${"\n".repeat(4)}`);
} catch (error) {
  console.error(error);
}