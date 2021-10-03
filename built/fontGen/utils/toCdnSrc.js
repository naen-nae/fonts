"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * to jsdelivr cdn src
 *
 * @param src origin src
 * @param branch repo branch name
 */
exports.default = (src, branch) => `https://cdn.jsdelivr.net/gh/naen-nae/fonts${branch !== undefined ? `@${branch}` : ''}/${src.replace(/^\//, '')}`;
