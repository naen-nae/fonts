const fs = require('fs/promises');
const _ = require('lodash');

const toCdnSrc = require('./utils/toCdnSrc');
const getFaces = require('./utils/getFaces');
const genNewDir = require('./utils/genNewDir');

module.exports = async fontsObj => {
  const fonts = _.map(fontsObj, font =>
    _.set(
      font,
      'files',
      _.map(font.files, path => toCdnSrc(`build/subset-fonts/${path}`)),
    ),
  );

  const faceOptions = _.flatMap(fonts, ({ files, fontWeights, fontFamily }) =>
    _.map(_.zip(files, fontWeights), ([src, fontWeight]) => ({
      src: `${src}.woff2`,
      fontFamily,
      fontWeight,
      format: 'woff2',
    })),
  );

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
