import { FaceGenArguments } from 'font-gen';

export default ({ src, fontWeight, fontFamily, format }: FaceGenArguments) =>
  `
  @font-face {
    font-family: '${fontFamily}';
    src: url('${src}') format('${format}');
    font-weight: ${fontWeight};
    font-style: normal;
  }
  `;
