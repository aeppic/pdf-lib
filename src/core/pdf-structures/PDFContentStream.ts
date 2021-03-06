import add from 'lodash/add';
import flatten from 'lodash/flatten';
import isNumber from 'lodash/isNumber';

import 'core/pdf-objects';

import { PDFDictionary, PDFNumber, PDFStream } from 'core/pdf-objects';
import PDFOperator from 'core/pdf-operators/PDFOperator';
import { addStringToBuffer, or } from 'utils';
import { typedArrayProxy } from 'utils/proxies';
import { isArrayOf, isInstance, validateArr } from 'utils/validate';

class PDFContentStream extends PDFStream {
  static of = (
    dict: PDFDictionary,
    ...operators: Array<PDFOperator | PDFOperator[]>
  ) => new PDFContentStream(dict, ...operators);

  static validateOperators = (elements: any[]) =>
    validateArr(
      elements,
      isInstance(PDFOperator),
      'Only PDFOperators can be pushed to a PDFContentStream.',
    );

  // TODO: Should this allow text showing operators?
  // TODO: Prevent this from being reassigned
  // TODO: Should disallow non-numeric indexes
  operators: PDFOperator[];

  constructor(
    dictionary: PDFDictionary,
    ...operators: Array<PDFOperator | PDFOperator[]>
  ) {
    super(dictionary);
    validateArr(
      operators,
      or(isInstance(PDFOperator), isArrayOf(PDFOperator)),
      'PDFContentStream requires PDFOperators or PDFOperator[]s to be constructed.',
    );

    this.operators = typedArrayProxy(flatten(operators), PDFOperator, {
      set: (property) => {
        if (isNumber(Number(property))) {
          this.Length.number = this.operatorsBytesSize();
        }
      },
    });

    this.dictionary.set(
      'Length',
      PDFNumber.fromNumber(this.operatorsBytesSize()),
    );
  }

  get Length() {
    const Length = this.dictionary.get('Length');
    return this.dictionary.index.lookup(Length) as PDFNumber;
  }

  operatorsBytesSize = (): number =>
    this.operators
      .filter(Boolean)
      .map((op) => op.bytesSize())
      .reduce(add, 0);

  bytesSize = () =>
    this.dictionary.bytesSize() +
    1 + // "\n"
    7 + // "stream\n"
    this.operatorsBytesSize() +
    10; // \nendstream

  copyBytesInto = (buffer: Uint8Array): Uint8Array => {
    this.validateDictionary();
    let remaining = this.dictionary.copyBytesInto(buffer);
    remaining = addStringToBuffer('\nstream\n', remaining);

    remaining = this.operators
      .filter(Boolean)
      .reduce(
        (remBytes: Uint8Array, op: PDFOperator) => op.copyBytesInto(remBytes),
        remaining,
      );

    remaining = addStringToBuffer('\nendstream', remaining);
    return remaining;
  };
}

export default PDFContentStream;
