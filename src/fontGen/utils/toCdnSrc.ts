/**
 * to jsdelivr cdn src
 *
 * @param src origin src
 * @param branch repo branch name
 */
export default (src: string, branch?: string) =>
  `https://cdn.jsdelivr.net/gh/naen-nae/fonts${
    branch !== undefined ? `@${branch}` : ''
  }/${src.replace(/^\//, '')}`;
