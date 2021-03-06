import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

import { PDFName } from 'core/pdf-objects';
import PDFOperator from 'core/pdf-operators/PDFOperator';
import PDFTextObject from 'core/pdf-operators/text/PDFTextObject';
import { isInRange, validate } from 'utils/validate';

import {
  appendBezierCurve,
  clip,
  closePath,
  dashPattern,
  endPath,
  fill,
  fillAndStroke,
  fillingRgbColor,
  fontAndSize,
  image,
  lineHeight,
  lineWidth,
  moveTo,
  nextLine,
  popGraphicsState,
  pushGraphicsState,
  rectangle,
  scale,
  square,
  stroke,
  strokingRgbColor,
  text,
  textPosition,
  translate,
} from 'helpers/pdf-operators/simple';

// TODO: Make a "drawPolygon" function

// TODO: Implement cornerStyle option
/**
 * Options object with named parameters for the [[drawRectangle]] operator helper.
 */
export interface IDrawRectangleOptions {
  /**
   * Default value is `0`.
   *
   * `x` coordinate to position the lower left corner of the rectangle.
   */
  x?: number;
  /**
   * Default value is `0`.
   *
   * `y` coordinate to position the lower left corner of the rectangle.
   */
  y?: number;
  /**
   * Default value is `150`.
   *
   * `width` of the rectangle.
   */
  width?: number;
  /**
   * Default value is `100`.
   *
   * `height` of the rectangle.
   */
  height?: number;
  /**
   * Default value is `15`.
   *
   * `borderWidth` of the rectangle.
   */
  borderWidth?: number;
  /**
   * Default value is `[0, 0, 0]` (black).
   *
   * Array of 3 values between `0.0` and `1.0` representing a point in the
   * RGB color space. E.g. `colorRgb: [1, 0.2, 1]` will draw the rectangle in a
   * shade of pink - it's equivalent to `rgb(255, 50, 255)` in CSS.
   *
   * RGB values are usually expressed in numbers from `0`-`255`, not `0.0`-`1.0`
   * as used here. You can simply divide by 255 to do the conversion. E.g. we
   * could achieve the same shade of pink with
   * `colorRgb: [255 / 255, 50 / 255, 255 / 255]`.
   */
  colorRgb?: number[];
  /**
   * Default value is `[0, 0, 0]` (black).
   *
   * Array of 3 values between `0.0` and `1.0` representing a point in the
   * RGB color space. E.g. `borderColorRgb: [1, 0.2, 1]` will draw the border in a
   * shade of pink - it's equivalent to `rgb(255, 50, 255)` in CSS.
   *
   * RGB values are usually expressed in numbers from `0`-`255`, not `0.0`-`1.0`
   * as used here. You can simply divide by 255 to do the conversion. E.g. we
   * could achieve the same shade of pink with
   * `borderColorRgb: [255 / 255, 50 / 255, 255 / 255]`.
   */
  borderColorRgb?: number[];
}

/**
 * Draws a rectangle in a content stream.
 *
 * ```javascript
 * const contentStream = pdfDoc.register(
 *   pdfDoc.createContentStream(
 *     drawRectangle({
 *       x: 25,
 *       y: 50,
 *       width: 1000,
 *       height: 500,
 *       borderWidth: 25,
 *       colorRgb: [0.25, 1.0, 0.79],
 *       borderColorRgb: [0.79, 0.25, 1.0],
 *     }),
 *   ),
 * );
 * const page = pdfDoc
 *   .createPage([250, 500])
 *   .addContentStreams(contentStream);
 * ```
 *
 * @param options An options object with named parameters.
 */
export const drawRectangle = (
  options: IDrawRectangleOptions,
): PDFOperator[] => [
  pushGraphicsState(),
  fillingRgbColor(
    get(options, 'colorRgb[0]', 0),
    get(options, 'colorRgb[1]', 0),
    get(options, 'colorRgb[2]', 0),
  ),
  strokingRgbColor(
    get(options, 'borderColorRgb[0]', 0),
    get(options, 'borderColorRgb[1]', 0),
    get(options, 'borderColorRgb[2]', 0),
  ),
  lineWidth(options.borderWidth || 15),
  rectangle(
    options.x || 0,
    options.y || 0,
    options.width || 150,
    options.height || 100,
  ),
  // prettier-ignore
  !isEmpty(options.colorRgb) && !isEmpty(options.borderColorRgb) ? fillAndStroke()
  : !isEmpty(options.colorRgb)                                     ? fill()
  : !isEmpty(options.borderColorRgb)                               ? stroke()
  : closePath(),
  popGraphicsState(),
];

// TODO: Implement cornerStyle option
/**
 * Options object with named parameters for the [[drawSquare]] operator helper.
 */
export interface IDrawSquareOptions {
  /**
   * Default value is `0`.
   *
   * `x` coordinate to position the lower left corner of the square.
   */
  x?: number;
  /**
   * Default value is `0`.
   *
   * `y` coordinate to position the lower left corner of the square.
   */
  y?: number;
  /**
   * Default value is `100`.
   *
   * `size` of the square.
   */
  size?: number;
  /**
   * Default value is `15`.
   *
   * `borderWidth` of the square.
   */
  borderWidth?: number;
  /**
   * Default value is `[0, 0, 0]` (black).
   *
   * Array of 3 values between `0.0` and `1.0` representing a point in the
   * RGB color space. E.g. `colorRgb: [1, 0.2, 1]` will draw the square in a
   * shade of pink - it's equivalent to `rgb(255, 50, 255)` in CSS.
   *
   * RGB values are usually expressed in numbers from `0`-`255`, not `0.0`-`1.0`
   * as used here. You can simply divide by 255 to do the conversion. E.g. we
   * could achieve the same shade of pink with
   * `colorRgb: [255 / 255, 50 / 255, 255 / 255]`.
   */
  colorRgb?: number[];
  /**
   * Default value is `[0, 0, 0]` (black).
   *
   * Array of 3 values between `0.0` and `1.0` representing a point in the
   * RGB color space. E.g. `borderColorRgb: [1, 0.2, 1]` will draw the border in a
   * shade of pink - it's equivalent to `rgb(255, 50, 255)` in CSS.
   *
   * RGB values are usually expressed in numbers from `0`-`255`, not `0.0`-`1.0`
   * as used here. You can simply divide by 255 to do the conversion. E.g. we
   * could achieve the same shade of pink with
   * `borderColorRgb: [255 / 255, 50 / 255, 255 / 255]`.
   */
  borderColorRgb?: number[];
}

/**
 * Draws a square in a content stream.
 *
 * ```javascript
 * const contentStream = pdfDoc.register(
 *   pdfDoc.createContentStream(
 *     drawSquare({
 *       x: 25,
 *       y: 50,
 *       size: 500,
 *       borderWidth: 25,
 *       colorRgb: [0.25, 1.0, 0.79],
 *       borderColorRgb: [0.79, 0.25, 1.0],
 *     }),
 *   ),
 * );
 * const page = pdfDoc
 *   .createPage([250, 500])
 *   .addContentStreams(contentStream);
 * ```
 *
 * @param options An options object with named parameters.
 */
export const drawSquare = (options: IDrawSquareOptions): PDFOperator[] =>
  drawRectangle({
    x: options.x || 0,
    y: options.y || 0,
    width: options.size || 100,
    height: options.size || 100,
    borderWidth: options.borderWidth || 15,
    colorRgb: options.colorRgb || [],
    borderColorRgb: options.borderColorRgb || [],
  });
