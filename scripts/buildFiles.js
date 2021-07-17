const simpleGit = require('simple-git');
const git = simpleGit();
const fontGen = require('./fontGen');

(async () => {
  await fontGen();
  await git.add('build');
  await git.commit('build font files');
})();
