import simpleGit from 'simple-git';
import fontGen from './fontGen';

const git = simpleGit();

(async () => {
  const diff = await git.diff(['fonts.yml']);
  const isDiff =
    diff
      .split('\n')
      .filter(line => line.startsWith('- ') || line.startsWith('+ ')).length >
    0;

  if (isDiff) {
    await fontGen();
  }
})();
