const simpleGit = require('simple-git');
const git = simpleGit();
const fontGen = require('./fontGen');

(async () => {
  const status = await git.status();
  const { files } = status;

  console.log(status);

  if (files.some(({ path }) => path.startsWith('files/'))) {
    await fontGen();
    await git.add('build');
  }
})();
