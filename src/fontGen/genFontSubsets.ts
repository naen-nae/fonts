import { FaceGenArguments, Font } from 'font-gen';
import * as fs from 'fs/promises';
import _ from 'lodash';

import toCdnSrc from './utils/toCdnSrc';
import getFaces from './utils/getFaces';
import genNewDir from './utils/genNewDir';

export default async (fontsObj: Font[]) => {
  const fonts = _.map(fontsObj, font =>
    _.set(
      font,
      'files',
      _.map(font.files, path => toCdnSrc(`build/subset-fonts/${path}`)),
    ),
  );

  const faceOptions = _.flatMap(fonts, ({ files, fontWeights, fontFamily }) =>
    _.map(_.zip(files, fontWeights), ([src, fontWeight = 400]) => ({
      src: `${src}.woff2`,
      fontFamily,
      fontWeight,
      format: 'woff2',
    })),
  ) as unknown as FaceGenArguments[];

  const faceOptionsGroupByFamily = _.groupBy(
    faceOptions,
    ({ fontFamily }) => fontFamily,
  );

  const facesByFamily = _.map(faceOptionsGroupByFamily, (options, name) => [
    name,
    getFaces(options),
  ]);

  await genNewDir('subset-css');
  _.forEach(facesByFamily, ([name, css]) =>
    fs.writeFile(`./build/subset-css/${name}.css`, css),
  );
};
