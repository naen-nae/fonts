"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const simple_git_1 = __importDefault(require("simple-git"));
const fontGen_1 = __importDefault(require("./fontGen"));
const git = (0, simple_git_1.default)();
(async () => {
    const diff = await git.diff(['fonts.yml']);
    const isDiff = diff
        .split('\n')
        .filter(line => line.startsWith('- ') || line.startsWith('+ ')).length >
        0;
    await (0, fontGen_1.default)();
    return;
    /*
    if (isDiff) {
      await fontGen();
      await git.add('build');
      await git.commit('build files');
    }
    */
})();
