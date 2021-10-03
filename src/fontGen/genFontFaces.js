const fs = require('fs/promises');
const _ = require('lodash');
const jsonMin = require('jsonminify');

const getFontFormat = require('./utils/getFontFormat');
const toCdnSrc = require('./utils/toCdnSrc');
const getFaces = require('./utils/getFaces');
const genNewDir = require('./utils/genNewDir');

module.exports = async fontsObj => {
  // parse
  const fonts = _.flow(
    fonts => fonts.sort(({ author: a }, { author: b }) => a.localeCompare(b)),
    _.partial(_.map, _, font =>
      _.set(
        font,
        'files',
        _.map(font.files, path => toCdnSrc(`files/${path}`)),
      ),
    ),
  )(fontsObj);

  // gen font-face options
  const faceOptions = _.flatMap(fonts, ({ files, fontWeights, fontFamily }) =>
    _.map(_.zip(files, fontWeights), ([src, fontWeight]) => ({
      src,
      fontFamily,
      fontWeight,
      format: getFontFormat(src),
    })),
  );

  const faceOptionsGroupByFamily = _.groupBy(
    faceOptions,
    ({ fontFamily }) => fontFamily,
  );

  // gen font-faces
  const facesByFamily = _.map(faceOptionsGroupByFamily, (options, name) => [
    name,
    getFaces(options),
  ]);

  // write to files
  fs.writeFile('./build/fonts.json', jsonMin(JSON.stringify(fonts)));

  await genNewDir('css');
  _.forEach(facesByFamily, ([name, css]) =>
    fs.writeFile(`./build/css/${name}.css`, css),
  );
};
