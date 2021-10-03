declare module 'font-gen' {
  export type FontFormat = 'ttf' | 'woff' | 'woff2' | 'otf' | 'eot' | 'svg';

  export interface FaceGenArguments {
    src: string;
    fontWeight: string;
    fontFamily: string;
    format: string;
  }

  interface LicenseSummary {
    print: boolean;
    website: boolean;
    video: boolean;
    paper: boolean;
    embeding: boolean;
    bici: boolean;
    ofl: boolean;
  }

  export interface Font {
    author: string;
    name: string;
    files: string[];
    fontWeights: number[];
    fontFamily: string;
    licenseSummary: LicenseSummary;
    license: string;
  }
}
