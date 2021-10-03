const genFontFaces = require('./genFontFaces');
const genFontSubsets = require('./genFontSubsets');
const genSubsetFontFiles = require('./genSubsetFontFiles');

const getFontsObj = require('./utils/getFontsObj');

module.exports = async () => {
  await genFontFaces(await getFontsObj());
  await genFontSubsets(await getFontsObj());
  await genSubsetFontFiles(await getFontsObj());
};
