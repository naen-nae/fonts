const simpleGit = require('simple-git');
const git = simpleGit();
const fontGen = require('./fontGen');

(async () => {
  const diff = await git.diff('fonts.yml');
  const isDiff =
    diff
      .split('\n')
      .filter(line => line.startsWith('- ') || line.startsWith('+ ')).length >
    0;

  if (isDiff) {
    await fontGen();
    await git.add('build');
  }
})();
