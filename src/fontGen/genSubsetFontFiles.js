const fs = require('fs/promises');
const _ = require('lodash');
const subsetFont = require('subset-font');

const genNewDir = require('./utils/genNewDir');
const createdDirNames = {};

// gen subset-fonts
module.exports = async fontsObj => {
  // gen subset font files
  await genNewDir('subset-fonts');

  await Promise.all(
    _.partial(_.map, _, async ({ files: filePaths }) => {
      // gen subset dir
      const dir = filePaths[0].split('/')[0];

      if (!createdDirNames.hasOwnProperty(dir)) {
        createdDirNames[dir] = undefined;
        await genNewDir(`subset-fonts/${dir}`);
      }

      console.log(`generating subset font files for ${dir}`);

      return await Promise.all(
        _.flow(
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
          _.partial(_.map, _, async subset => {
            const { path, buf } = await subset;
            return fs.writeFile(`./build/subset-fonts/${path}.woff2`, buf);
          }),
        )(filePaths),
      );
    })(fontsObj),
  );

  console.log(`>> subset-fonts done`);
};
