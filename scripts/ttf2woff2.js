const fs = require('fs');
const ttf2woff2 = require('ttf2woff2');

(async () => {
  const dirNames = fs
    .readdirSync('./files/')
    .filter(name => !/\.(js)/.test(name))
    .filter(name =>
      [
        /* directory name */
      ].includes(name),
    );

  const fontNames = dirNames.map(name => [
    name,
    fs.readdirSync(`./files/${name}`).filter(name => /\.ttf$/.test(name)),
  ]);

  fontNames
    .flatMap(([dirName, names]) => names.map(name => [dirName, name]))
    .map(([dirName, name]) => [
      `./files/${dirName}/${name}`,
      fs.readFileSync(`./files/${dirName}/${name}`),
    ])
    .forEach(([fileName, input], ind, { length }) => {
      fs.writeFileSync(`${fileName}.woff2`, ttf2woff2(input));
      fs.rmSync(fileName);
      console.log('prosessing...', ind + 1, '/', length);
    });
})();
