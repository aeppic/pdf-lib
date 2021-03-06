import { PDFDictionary, PDFIndirectObject, PDFObject } from 'core/pdf-objects';
import { isInstance, validate, validateArr } from 'utils/validate';

class PDFObjectStream extends PDFObject {
  static from = (dictionary: PDFDictionary, objects: PDFIndirectObject[]) =>
    new PDFObjectStream(dictionary, objects);

  dict: PDFDictionary;
  objects: PDFIndirectObject[];

  constructor(dictionary: PDFDictionary, objects: PDFIndirectObject[]) {
    super();
    validate(
      dictionary,
      isInstance(PDFDictionary),
      'PDFObjectStream.dictionary must be a PDFDictionary',
    );
    validateArr(
      objects,
      isInstance(PDFIndirectObject),
      'PDFObjectStream.objects must be an array of PDFIndirectObject',
    );
    this.dict = dictionary;
    this.objects = objects;
  }
}

export default PDFObjectStream;
