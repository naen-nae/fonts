const fs = require('fs/promises');

/**
 * generate a new directory
 *
 * @returns {Promise<void>}
 */
module.exports = async name => {
  try {
    await fs.access(`./build/${name}`);
    await fs.rm(`./build/${name}`, {
      recursive: true,
      force: true,
    });
  } catch {
    // nothing
  }

  return await fs.mkdir(`./build/${name}`);
};
