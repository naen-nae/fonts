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
const toCdnSrc_1 = __importDefault(require("./utils/toCdnSrc"));
const getFaces_1 = __importDefault(require("./utils/getFaces"));
const genNewDir_1 = __importDefault(require("./utils/genNewDir"));
exports.default = async (fontsObj) => {
    const fonts = lodash_1.default.map(fontsObj, font => lodash_1.default.set(font, 'files', lodash_1.default.map(font.files, path => (0, toCdnSrc_1.default)(`build/subset-fonts/${path}`))));
    const faceOptions = lodash_1.default.flatMap(fonts, ({ files, fontWeights, fontFamily }) => lodash_1.default.map(lodash_1.default.zip(files, fontWeights), ([src, fontWeight = 400]) => ({
        src: `${src}.woff2`,
        fontFamily,
        fontWeight,
        format: 'woff2',
    })));
    const faceOptionsGroupByFamily = lodash_1.default.groupBy(faceOptions, ({ fontFamily }) => fontFamily);
    const facesByFamily = lodash_1.default.map(faceOptionsGroupByFamily, (options, name) => [
        name,
        (0, getFaces_1.default)(options),
    ]);
    await (0, genNewDir_1.default)('subset-css');
    lodash_1.default.forEach(facesByFamily, ([name, css]) => fs.writeFile(`./build/subset-css/${name}.css`, css));
};
