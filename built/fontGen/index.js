"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const genFontFaces_1 = __importDefault(require("./genFontFaces"));
const genFontSubsets_1 = __importDefault(require("./genFontSubsets"));
const genSubsetFontFiles_1 = __importDefault(require("./genSubsetFontFiles"));
const getFontsObj_1 = __importDefault(require("./utils/getFontsObj"));
exports.default = async () => {
    await (0, genFontFaces_1.default)(await (0, getFontsObj_1.default)());
    await (0, genFontSubsets_1.default)(await (0, getFontsObj_1.default)());
    await (0, genSubsetFontFiles_1.default)(await (0, getFontsObj_1.default)());
};
