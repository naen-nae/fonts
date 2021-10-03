"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs/promises"));
const lodash_1 = __importDefault(require("lodash"));
const subset_font_1 = __importDefault(require("subset-font"));
const genNewDir_1 = __importDefault(require("./utils/genNewDir"));
const SUBSET_STRING = '다람쥐 헌 쳇바퀴에 타고파';
const createdDirNames = {};
exports.default = async (fontsObj) => {
    // gen subset font files
    await (0, genNewDir_1.default)('subset-fonts');
    await Promise.all(lodash_1.default.map(fontsObj, async ({ files: filePaths }) => {
        // gen subset dir
        const dir = filePaths[0].split('/')[0];
        if (!createdDirNames.hasOwnProperty(dir)) {
            createdDirNames[dir] = undefined;
            await (0, genNewDir_1.default)(`subset-fonts/${dir}`);
        }
        console.log(`generating subset font files for ${dir}`);
        return await Promise.all(lodash_1.default.flow(
        // get font bufs
        lodash_1.default.partial(lodash_1.default.map, lodash_1.default, async (filePath) => ({
            path: filePath,
            buf: await fs.readFile(`./files/${filePath}`),
        })), 
        // gen subset bufs
        lodash_1.default.partial(lodash_1.default.map, lodash_1.default, async (subset) => {
            const { path, buf } = await subset;
            return {
                path,
                buf: await (0, subset_font_1.default)(buf, SUBSET_STRING, {
                    targetFont: 'woff2',
                }),
            };
        }), 
        // gen subset font file
        lodash_1.default.partial(lodash_1.default.map, lodash_1.default, async (subset) => {
            const { path, buf } = await subset;
            return fs.writeFile(`./build/subset-fonts/${path}.woff2`, buf);
        }))(filePaths));
    }));
    console.log(`>> subset-fonts done`);
};
