

# Hierarchy

**PDFDocument**

# Constructors

<a id="constructor"></a>

##  constructor

⊕ **new PDFDocument**(index: *`PDFObjectIndex`*): [PDFDocument](_core_pdf_document_pdfdocument_.pdfdocument.md)

*Defined in [core/pdf-document/PDFDocument.ts:40](https://github.com/Hopding/pdf-lib/blob/d7334b8/src/core/pdf-document/PDFDocument.ts#L40)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| index | `PDFObjectIndex` |

**Returns:** [PDFDocument](_core_pdf_document_pdfdocument_.pdfdocument.md)

___

# Methods

<a id="addpage"></a>

##  addPage

▸ **addPage**(page: *[PDFPage](_core_pdf_structures_pdfpage_.pdfpage.md)*): `this`

*Defined in [core/pdf-document/PDFDocument.ts:129](https://github.com/Hopding/pdf-lib/blob/d7334b8/src/core/pdf-document/PDFDocument.ts#L129)*

Adds a page to the end of the [PDFDocument](_core_pdf_document_pdfdocument_.pdfdocument.md).

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| page | [PDFPage](_core_pdf_structures_pdfpage_.pdfpage.md) |  The page to be added. |

**Returns:** `this`

___
<a id="createcontentstream"></a>

##  createContentStream

▸ **createContentStream**(...operators: *`Array`< `PDFOperator` &#124; `PDFOperator`[]>*): `PDFContentStream`

*Defined in [core/pdf-document/PDFDocument.ts:119](https://github.com/Hopding/pdf-lib/blob/d7334b8/src/core/pdf-document/PDFDocument.ts#L119)*

Creates a new \[\[PDFContentStream\]\] with the given operators.

Note that the \[\[PDFContentStream\]\] returned by this method is **not** automatically registered to the document or added to any of its pages. You must first call the [register](_core_pdf_document_pdfdocument_.pdfdocument.md#register) method for it to be registered to the [PDFDocument](_core_pdf_document_pdfdocument_.pdfdocument.md). Then, you must call [PDFPage.addContentStreams](_core_pdf_structures_pdfpage_.pdfpage.md#addcontentstreams) to add the registered \[\[PDFContentStream\]\] to the desired page(s).

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| `Rest` operators | `Array`< `PDFOperator` &#124; `PDFOperator`[]> |  One or more \[\[PDFOperator\]\]s to be added to the \[\[PDFContentStream\]\]. |

**Returns:** `PDFContentStream`
The newly created [[PDFContentStream]].

___
<a id="createpage"></a>

##  createPage

▸ **createPage**(size: *[`number`, `number`]*, resources?: *`PDFDictionary`*): [PDFPage](_core_pdf_structures_pdfpage_.pdfpage.md)

*Defined in [core/pdf-document/PDFDocument.ts:102](https://github.com/Hopding/pdf-lib/blob/d7334b8/src/core/pdf-document/PDFDocument.ts#L102)*

Creates a new [PDFPage](_core_pdf_structures_pdfpage_.pdfpage.md) of the given `size`. And optionally, with the given `resources` dictionary.

Note that the [PDFPage](_core_pdf_structures_pdfpage_.pdfpage.md) returned by this method is **not** automatically added to the [PDFDocument](_core_pdf_document_pdfdocument_.pdfdocument.md). You must call the [addPage](_core_pdf_document_pdfdocument_.pdfdocument.md#addpage) or [insertPage](_core_pdf_document_pdfdocument_.pdfdocument.md#insertpage) methods for it to be rendered in the document.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| size | [`number`, `number`] |  A tuple containing the width and height of the page, respectively. |
| `Optional` resources | `PDFDictionary` |  A resources dictionary for the page. |

**Returns:** [PDFPage](_core_pdf_structures_pdfpage_.pdfpage.md)
The newly created [[PDFPage]].

___
<a id="embedfont"></a>

##  embedFont

▸ **embedFont**(fontData: *`Uint8Array`*, fontFlags?: *[IFontFlagOptions](../interfaces/_core_pdf_structures_factories_pdffontfactory_.ifontflagoptions.md)*): [`PDFIndirectReference`<`PDFDictionary`>, [PDFFontFactory](_core_pdf_structures_factories_pdffontfactory_.pdffontfactory.md)]

*Defined in [core/pdf-document/PDFDocument.ts:274](https://github.com/Hopding/pdf-lib/blob/d7334b8/src/core/pdf-document/PDFDocument.ts#L274)*

Embeds the font contained in the specified `Uint8Array` in the document.

**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| fontData | `Uint8Array` | - |  A \`Uint8Array\` containing an OpenType (`.otf`) or TrueType (`.ttf`) font. |
| `Default value` fontFlags | [IFontFlagOptions](../interfaces/_core_pdf_structures_factories_pdffontfactory_.ifontflagoptions.md) |  { Nonsymbolic: true } |

**Returns:** [`PDFIndirectReference`<`PDFDictionary`>, [PDFFontFactory](_core_pdf_structures_factories_pdffontfactory_.pdffontfactory.md)]
A tuple containing (1) the [[PDFIndirectReference]] under which the
         specified font is registered, and (2) a [[PDFFontFactory]] object
         containing font metadata properties and methods.

___
<a id="embedjpg"></a>

##  embedJPG

▸ **embedJPG**(jpgData: *`Uint8Array`*): [`PDFIndirectReference`<`PDFRawStream`>, [JPEGXObjectFactory](_core_pdf_structures_factories_jpegxobjectfactory_.jpegxobjectfactory.md)]

*Defined in [core/pdf-document/PDFDocument.ts:307](https://github.com/Hopding/pdf-lib/blob/d7334b8/src/core/pdf-document/PDFDocument.ts#L307)*

Embeds the JPG image contained in the specified `Uint8Array` in the document.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| jpgData | `Uint8Array` |  A \`Uint8Array\` containing a JPG (`.jpg`) image. |

**Returns:** [`PDFIndirectReference`<`PDFRawStream`>, [JPEGXObjectFactory](_core_pdf_structures_factories_jpegxobjectfactory_.jpegxobjectfactory.md)]
A tuple containing (1) the [[PDFIndirectReference]] under which the
         specified image is registered, and (2) a [[JPEGXObjectFactory]]
         object containing the image's width and height.

___
<a id="embedpng"></a>

##  embedPNG

▸ **embedPNG**(pngData: *`Uint8Array`*): [`PDFIndirectReference`<`PDFRawStream`>, [PNGXObjectFactory](_core_pdf_structures_factories_pngxobjectfactory_.pngxobjectfactory.md)]

*Defined in [core/pdf-document/PDFDocument.ts:291](https://github.com/Hopding/pdf-lib/blob/d7334b8/src/core/pdf-document/PDFDocument.ts#L291)*

Embeds the PNG image contained in the specified `Uint8Array` in the document.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| pngData | `Uint8Array` |  A \`Uint8Array\` containing a PNG (`.png`) image. |

**Returns:** [`PDFIndirectReference`<`PDFRawStream`>, [PNGXObjectFactory](_core_pdf_structures_factories_pngxobjectfactory_.pngxobjectfactory.md)]
A tuple containing (1) the [[PDFIndirectReference]] under which the
         specified image is registered, and (2) a [[PNGXObjectFactory]]
         object containing the image's width and height.

___
<a id="embedstandardfont"></a>

##  embedStandardFont

▸ **embedStandardFont**(fontName: *[IStandard14FontsUnion](../modules/_core_pdf_document_standard14fonts_.md#istandard14fontsunion)*): [`PDFIndirectReference`<`PDFDictionary`>]

*Defined in [core/pdf-document/PDFDocument.ts:225](https://github.com/Hopding/pdf-lib/blob/d7334b8/src/core/pdf-document/PDFDocument.ts#L225)*

Embeds one of the Standard 14 Fonts fonts in the document. This method does **not** require a `Uint8Array` containing a font to be passed, because the Standard 14 Fonts are automatically available to all PDF documents.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| fontName | [IStandard14FontsUnion](../modules/_core_pdf_document_standard14fonts_.md#istandard14fontsunion) |  Name of the font to be embedded. |

**Returns:** [`PDFIndirectReference`<`PDFDictionary`>]
A tuple containing the [[PDFIndirectReference]] under which the
         specified font is registered.

___
<a id="getpages"></a>

##  getPages

▸ **getPages**(): [PDFPage](_core_pdf_structures_pdfpage_.pdfpage.md)[]

*Defined in [core/pdf-document/PDFDocument.ts:80](https://github.com/Hopding/pdf-lib/blob/d7334b8/src/core/pdf-document/PDFDocument.ts#L80)*

**Returns:** [PDFPage](_core_pdf_structures_pdfpage_.pdfpage.md)[]
An array of [[PDFPage]] objects representing the pages of the
         [[PDFDocument]]. The order of the [[PDFPage]] documents in the
         array mirrors the order in which they will be rendered in the
         [[PDFDocument]].

___
<a id="insertpage"></a>

##  insertPage

▸ **insertPage**(index: *`number`*, page: *[PDFPage](_core_pdf_structures_pdfpage_.pdfpage.md)*): `this`

*Defined in [core/pdf-document/PDFDocument.ts:189](https://github.com/Hopding/pdf-lib/blob/d7334b8/src/core/pdf-document/PDFDocument.ts#L189)*

Inserts a page into the document at the specified index. The page that is displaced by the insertion will be become the page immediately following the inserted page.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| index | `number` |  The index of the page to be removed. The index is zero-based, e.g. the first page in the document is index \`0\`. |
| page | [PDFPage](_core_pdf_structures_pdfpage_.pdfpage.md) |  The page to be inserted. |

**Returns:** `this`

___
<a id="register"></a>

##  register

▸ **register**T(object: *`T`*): `PDFIndirectReference`<`T`>

*Defined in [core/pdf-document/PDFDocument.ts:66](https://github.com/Hopding/pdf-lib/blob/d7334b8/src/core/pdf-document/PDFDocument.ts#L66)*

Registers a \[\[PDFObject\]\] to the [PDFDocument](_core_pdf_document_pdfdocument_.pdfdocument.md)'s `index`. Returns a \[\[PDFIndirectReference\]\] that can be used to reference the given `object` in other `pdf-lib` methods.

**Type parameters:**

#### T :  `PDFObject`
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| object | `T` |  The \[\[PDFObject\]\] to be registered. |

**Returns:** `PDFIndirectReference`<`T`>
The [[PDFIndirectReference]] under which the `object` has been
         registered.

___
<a id="removepage"></a>

##  removePage

▸ **removePage**(index: *`number`*): `this`

*Defined in [core/pdf-document/PDFDocument.ts:155](https://github.com/Hopding/pdf-lib/blob/d7334b8/src/core/pdf-document/PDFDocument.ts#L155)*

Removes a page from the document.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| index | `number` |  The index of the page to be removed. The index is zero-based, e.g. the first page in the document is index \`0\`. |

**Returns:** `this`

___
<a id="fromindex"></a>

## `<Static>` fromIndex

▸ **fromIndex**(index: *`PDFObjectIndex`*): [PDFDocument](_core_pdf_document_pdfdocument_.pdfdocument.md)

*Defined in [core/pdf-document/PDFDocument.ts:31](https://github.com/Hopding/pdf-lib/blob/d7334b8/src/core/pdf-document/PDFDocument.ts#L31)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| index | `PDFObjectIndex` |

**Returns:** [PDFDocument](_core_pdf_document_pdfdocument_.pdfdocument.md)

___

