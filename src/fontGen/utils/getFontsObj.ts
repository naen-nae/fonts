import { Font } from 'font-gen';
import * as fs from 'fs/promises';
import * as yaml from 'yaml';

export default async () => {
  const rawFonts = await (
    await fs.readFile('./fonts.yml', { encoding: 'utf-8' })
  ).toString();

  return yaml.parse(rawFonts).fonts as Font[];
};
