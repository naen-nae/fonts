import { Font } from 'font-gen';
import * as fs from 'fs/promises';
import _ from 'lodash';
import subsetFont from 'subset-font';
import genNewDir from './utils/genNewDir';

const SUBSET_STRING = '다람쥐 헌 쳇바퀴에 타고파';

interface Subset {
  path: string;
  buf: Buffer;
}

const createdDirNames: { [key: string]: undefined } = {};

export default async (fontsObj: Font[]) => {
  // gen subset font files
  await genNewDir('subset-fonts');

  await Promise.all(
    _.map(fontsObj, async ({ files: filePaths }) => {
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
          _.partial(_.map, _, async (filePath: string) => ({
            path: filePath,
            buf: await fs.readFile(`./files/${filePath}`),
          })),
          // gen subset bufs
          _.partial(_.map, _, async (subset: Subset) => {
            const { path, buf } = await subset;

            return {
              path,
              buf: await subsetFont(buf, SUBSET_STRING, {
                targetFont: 'woff2',
              }),
            };
          }),
          // gen subset font file
          _.partial(_.map, _, async (subset: Subset) => {
            const { path, buf } = await subset;
            return fs.writeFile(`./build/subset-fonts/${path}.woff2`, buf);
          }),
        )(filePaths),
      );
    }),
  );

  console.log(`>> subset-fonts done`);
};
