import dotenv from 'dotenv';
dotenv.config();
const session = process.env.SESSION;

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * 
 * @param {string} path 
 * @returns 
 */
export function contents(path) { return readFileSync(join(__dirname, path), 'utf8'); }

/**
 * 
 * @param {number} year 
 * @param {number} day 
 * @param {*} answer 
 * @param {number} level 
 * @returns 
 */
export async function submit(year, day, answer, level) {
  try {
    const url = `https://adventofcode.com/${year}/day/${day}/answer`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Cookie: `session=${session}`
      },
      body: `level=${level}&answer=${answer}`,
      credentials: 'include',
    });
    const htmlText = await res.text();
    return htmlText.match(/<p>([\s\S]*)<\/p>/)[1];

  } catch (error) {
    console.error(error);
  }
}
/**
 * 
 * @param {number} year 
 * @param {number} day 
 * @returns 
 */
export async function importer(year, day) {
  try {
    const url = `https://adventofcode.com/${year}/day/${day}/input`;
    const res = await fetch(url, {
      method: 'GET',
      headers: { Cookie: `session=${session}` },
      credentials: 'include'
    });
    return await (await res.text()).trim();
  } catch (error) {
    console.error(error);
  }
}
