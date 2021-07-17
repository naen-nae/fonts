const fs = require('fs/promises');
const _ = require('lodash');
const subsetFont = require('subset-font');

const genNewDir = require('./utils/genNewDir');

// gen subset-fonts
module.exports = async fontsObj => {
  // gen subset font files
  await genNewDir('subset-fonts');

  _.map(fontsObj, async ({ files: filePaths }, ind, { length }) => {
    // gen subset dir
    const dir = filePaths[0].split('/')[0];
    await genNewDir(`subset-fonts/${dir}`);

    await _.flow(
      // get font bufs
      _.partial(_.map, _, async filePath => ({
        path: filePath,
        buf: await fs.readFile(`./files/${filePath}`),
      })),
      // gen subset bufs
      _.partial(_.map, _, async file => {
        const { path, buf } = await file;

        return {
          path,
          buf: await subsetFont(buf, '다람쥐 헌 쳇바퀴에 타고파', {
            targetFont: 'woff2',
          }),
        };
      }),
      // gen subset font file
      _.partial(_.forEach, _, async subset => {
        const { path, buf } = await subset;
        return fs.writeFile(`./build/subset-fonts/${path}.woff2`, buf);
      }),
    )(filePaths);

    console.log(`>> start gen '`, dir, `' fonts (${ind + 1} / ${length})`);
  });
};
