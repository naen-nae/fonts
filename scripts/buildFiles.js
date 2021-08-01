const simpleGit = require('simple-git');
const git = simpleGit();
const fontGen = require('./fontGen');

(async () => {
  const { files } = await git.status();

  if (files.some(({ path }) => path.startsWith('files/'))) {
    await fontGen();
    await git.add('build');
  }
})();
