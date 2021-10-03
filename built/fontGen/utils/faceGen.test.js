"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const faceGen_1 = __importDefault(require("./faceGen"));
test('test faceGen', () => {
    [
        [
            {
                src: 'NanumGothic/NanumGothic-Regular.ttf',
                fontWeight: 'normal',
                fontFamily: 'Nanum Gothic',
                format: 'truetype',
            },
            `
      @font-face {
        font-family: 'Nanum Gothic';
        src: url('NanumGothic/NanumGothic-Regular.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
      }
      `
                .trim()
                .split('\n')
                .map(line => line.trim())
                .join(''),
        ],
        [
            {
                src: 'NanumGothic/NanumGothic-Bold.ttf',
                fontWeight: 'bold',
                fontFamily: 'Nanum Gothic',
                format: 'truetype',
            },
            `
      @font-face {
        font-family: 'Nanum Gothic';
        src: url('NanumGothic/NanumGothic-Bold.ttf') format('truetype');
        font-weight: bold;
        font-style: normal;
      }
      `
                .trim()
                .split('\n')
                .map(line => line.trim())
                .join(''),
        ],
        [
            {
                src: 'NanumGothic/NanumGothic-ExtraBold.ttf',
                fontWeight: 'bolder',
                fontFamily: 'Nanum Gothic',
                format: 'truetype',
            },
            `
      @font-face {
        font-family: 'Nanum Gothic';
        src: url('NanumGothic/NanumGothic-ExtraBold.ttf') format('truetype');
        font-weight: bolder;
        font-style: normal;
      }
      `
                .trim()
                .split('\n')
                .map(line => line.trim())
                .join(''),
        ],
    ].forEach(([options, expectValue]) => expect((0, faceGen_1.default)(options)
        .trim()
        .split('\n')
        .map(line => line.trim())
        .join('')).toBe(expectValue));
});
