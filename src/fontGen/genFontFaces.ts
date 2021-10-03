import { FaceGenArguments, Font } from 'font-gen';
import * as fs from 'fs/promises';
import _ from 'lodash';
import jsonminify from 'jsonminify';

import getFontFormat from './utils/getFontFormat';
import toCdnSrc from './utils/toCdnSrc';
import getFaces from './utils/getFaces';
import genNewDir from './utils/genNewDir';

const convFontsToMinifyJson = (fonts: Font[]) =>
  _.flow(JSON.stringify, jsonminify)(fonts);
const mapPathToCdnSrc = (path: string) => toCdnSrc(`files/${path}`);

export default async (fontsObj: Font[]) => {
  // parse
  const fonts = _(fontsObj)
    .sort(({ author: a }, { author: b }) => a.localeCompare(b))
    .map(font => _.set(font, 'files', _.map(font.files, mapPathToCdnSrc)))
    .value();

  // gen font-face options
  const faceOptions = _.flatMap(fonts, ({ files, fontWeights, fontFamily }) =>
    _.map(
      _.zip(files, fontWeights),
      ([src, fontWeight]: [string, number]): FaceGenArguments => ({
        src,
        fontFamily,
        fontWeight: fontWeight.toString(),
        format: getFontFormat(src),
      }),
    ),
  ) as unknown as FaceGenArguments[];

  const faceOptionsGroupByFamily = _.groupBy(
    faceOptions,
    ({ fontFamily }) => fontFamily,
  );

  // gen font-faces
  const facesByFamily = _.map(
    faceOptionsGroupByFamily,
    (options: FaceGenArguments[], name) => [name, getFaces(options)],
  );

  // write to files
  fs.writeFile('./build/fonts.json', convFontsToMinifyJson(fonts));

  await genNewDir('css');
  _.forEach(facesByFamily, ([name, css]) =>
    fs.writeFile(`./build/css/${name}.css`, css),
  );
};
