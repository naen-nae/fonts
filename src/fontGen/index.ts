import genFontFaces from './genFontFaces';
import genFontSubsets from './genFontSubsets';
import genSubsetFontFiles from './genSubsetFontFiles';

import getFontsObj from './utils/getFontsObj';

export default async () => {
  await genFontFaces(await getFontsObj());
  await genFontSubsets(await getFontsObj());
  await genSubsetFontFiles(await getFontsObj());
};
