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
const jsonminify_1 = __importDefault(require("jsonminify"));
const getFontFormat_1 = __importDefault(require("./utils/getFontFormat"));
const toCdnSrc_1 = __importDefault(require("./utils/toCdnSrc"));
const getFaces_1 = __importDefault(require("./utils/getFaces"));
const genNewDir_1 = __importDefault(require("./utils/genNewDir"));
const convFontsToMinifyJson = (fonts) => lodash_1.default.flow(JSON.stringify, jsonminify_1.default)(fonts);
const mapPathToCdnSrc = (path) => (0, toCdnSrc_1.default)(`files/${path}`);
exports.default = async (fontsObj) => {
    // parse
    const fonts = (0, lodash_1.default)(fontsObj)
        .sort(({ author: a }, { author: b }) => a.localeCompare(b))
        .map(font => lodash_1.default.set(font, 'files', lodash_1.default.map(font.files, mapPathToCdnSrc)))
        .value();
    // gen font-face options
    const faceOptions = lodash_1.default.flatMap(fonts, ({ files, fontWeights, fontFamily }) => lodash_1.default.map(lodash_1.default.zip(files, fontWeights), ([src, fontWeight]) => ({
        src,
        fontFamily,
        fontWeight: fontWeight.toString(),
        format: (0, getFontFormat_1.default)(src),
    })));
    const faceOptionsGroupByFamily = lodash_1.default.groupBy(faceOptions, ({ fontFamily }) => fontFamily);
    // gen font-faces
    const facesByFamily = lodash_1.default.map(faceOptionsGroupByFamily, (options, name) => [name, (0, getFaces_1.default)(options)]);
    // write to files
    fs.writeFile('./build/fonts.json', convFontsToMinifyJson(fonts));
    await (0, genNewDir_1.default)('css');
    lodash_1.default.forEach(facesByFamily, ([name, css]) => fs.writeFile(`./build/css/${name}.css`, css));
};
