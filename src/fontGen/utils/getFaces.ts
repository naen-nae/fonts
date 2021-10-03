import * as csso from 'csso';
import _ from 'lodash';
import faceGen from './faceGen';
import { FaceGenArguments } from 'font-gen';

/**
 * @returns minified face-face css string array
 */
export default (args: FaceGenArguments[]) =>
  _.flow(
    _.partial(_.map, _, faceGen),
    _.partial(_.join, _, ''),
    rawCss => csso.minify(rawCss).css,
  )(args);
