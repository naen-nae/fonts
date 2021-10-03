"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ src, fontWeight, fontFamily, format }) => `
  @font-face {
    font-family: '${fontFamily}';
    src: url('${src}') format('${format}');
    font-weight: ${fontWeight};
    font-style: normal;
  }
  `;
