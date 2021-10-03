import * as fs from 'fs/promises';

export default async (name: string) => {
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
