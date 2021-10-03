"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getFontFormat_1 = __importDefault(require("./getFontFormat"));
test('test getFontFormat', () => {
    [
        ['test.ttf', 'truetype'],
        ['/test/test.test.test.ttf', 'truetype'],
        ['woff.woff', 'woff'],
        ['woff.woff2.woff.woff2', 'woff2'],
        ['..svg', 'svg'],
    ].forEach(([src, format]) => expect((0, getFontFormat_1.default)(src)).toBe(format));
});
