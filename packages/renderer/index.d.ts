/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-unused-vars */
/* eslint-disable max-classes-per-file */
import * as React from "react";
import {
  Style,
  PageSize,
  FontStore,
  PDFVersion,
  Orientation,
  SourceObject,
  HyphenationCallback,
  SVGPresentationAttributes,
  Bookmark,
  PageLayout,
  PageMode,
} from "@easypliant/react-pdf-types";

declare class ReactPDF {
  // eslint-disable-next-line no-use-before-define
  static default: typeof ReactPDF;
}

export = ReactPDF;

// eslint-disable-next-line no-redeclare
declare namespace ReactPDF {
  interface Styles {
    [key: string]: Style;
  }

  interface OnRenderProps {
    blob?: Blob;
  }

  interface Attachment {
    content: Buffer | ArrayBuffer | string;
    creationDate: Date;
    description?: string;
    hidden?: boolean;
    modifiedDate?: Date;
    relationship?: "Alternative" | "Data" | "Source" | "Supplement" | "Unspecified";
    name: string;
    type: string;
  }

  type PDFSubset = `PDF/A-1${"" | "a" | "b"}` | `PDF/A-2${"" | "a" | "b"}` | `PDF/A-3${"" | "a" | "b"}`;

  interface DocumentProps {
    attachments: Attachment[];
    author?: string;
    creationDate?: Date;
    creator?: string;
    keywords?: string;
    language?: string;
    modificationDate?: Date;
    pageLayout?: PageLayout;
    pageMode?: PageMode;
    pdfVersion?: PDFVersion;
    producer?: string;
    style?: Style | Style[];
    subject?: string;
    subset?: PDFSubset;
    tagged?: boolean;
    title?: string;
    onRender?: (props: OnRenderProps) => any;
  }

  /**
   * This component represent the PDF document itself. It must be the root
   * of your tree element structure, and under no circumstances should it be
   * used as children of another react-pdf component. In addition, it should
   * only have childs of type <Page />.
   */
  export class Document extends React.Component<React.PropsWithChildren<DocumentProps>> {}

  interface NodeProps {
    id?: string;
    style?: Style | Style[];
    /**
     * Render component in all wrapped pages.
     * @see https://react-pdf.org/advanced#fixed-components
     */
    fixed?: boolean;
    /**
     * Force the wrapping algorithm to start a new page when rendering the
     * element.
     * @see https://react-pdf.org/advanced#page-breaks
     */
    break?: boolean;
    /**
     * Hint that no page wrapping should occur between all sibling elements following the element within n points
     * @see https://react-pdf.org/advanced#orphan-&-widow-protection
     */
    minPresenceAhead?: number;
  }

  interface PageProps extends NodeProps {
    /**
     * Enable page wrapping for this page.
     * @see https://react-pdf.org/components#page-wrapping
     */
    wrap?: boolean;
    /**
     * Enables debug mode on page bounding box.
     * @see https://react-pdf.org/advanced#debugging
     */
    debug?: boolean;
    size?: PageSize;
    orientation?: Orientation;
    dpi?: number;
    bookmark?: Bookmark;
  }

  /**
   * Represents single page inside the PDF document, or a subset of them if
   * using the wrapping feature. A <Document /> can contain as many pages as
   * you want, but ensure not rendering a page inside any component besides
   * Document.
   */
  export class Page extends React.Component<React.PropsWithChildren<PageProps>> {}

  interface ViewProps extends NodeProps {
    id?: string;
    /**
     * Enable/disable page wrapping for element.
     * @see https://react-pdf.org/components#page-wrapping
     */
    wrap?: boolean;
    /**
     * Enables debug mode on page bounding box.
     * @see https://react-pdf.org/advanced#debugging
     */
    debug?: boolean;
    render?: (props: { pageNumber: number; subPageNumber: number }) => React.ReactNode;
  }

  /**
   * The most fundamental component for building a UI and is designed to be
   * nested inside other views and can have 0 to many children.
   */
  export class View extends React.Component<React.PropsWithChildren<ViewProps>> {}

  interface BaseImageProps extends NodeProps {
    /**
     * Enables debug mode on page bounding box.
     * @see https://react-pdf.org/advanced#debugging
     */
    debug?: boolean;
    cache?: boolean;
  }

  interface ImageWithSrcProp extends BaseImageProps {
    src: SourceObject;
  }

  interface ImageWithSourceProp extends BaseImageProps {
    source: SourceObject;
  }

  type ImageProps = ImageWithSrcProp | ImageWithSourceProp;

  /**
   * A React component for displaying network or local (Node only) JPG or
   * PNG images, as well as base64 encoded image strings.
   */
  export class Image extends React.Component<ImageProps> {}

  interface TextProps extends NodeProps {
    id?: string;
    /**
     * Enable/disable page wrapping for element.
     * @see https://react-pdf.org/components#page-wrapping
     */
    wrap?: boolean;
    /**
     * Enables debug mode on page bounding box.
     * @see https://react-pdf.org/advanced#debugging
     */
    debug?: boolean;
    render?: (props: {
      pageNumber: number;
      totalPages: number;
      subPageNumber: number;
      subPageTotalPages: number;
    }) => React.ReactNode;
    /**
     * Override the default hyphenation-callback
     * @see https://react-pdf.org/fonts#registerhyphenationcallback
     */
    hyphenationCallback?: HyphenationCallback;
    /**
     * Specifies the minimum number of lines in a text element that must be shown at the bottom of a page or its container.
     * @see https://react-pdf.org/advanced#orphan-&-widow-protection
     */
    orphans?: number;
    /**
     * Specifies the minimum number of lines in a text element that must be shown at the top of a page or its container..
     * @see https://react-pdf.org/advanced#orphan-&-widow-protection
     */
    widows?: number;
  }

  interface SVGTextProps extends SVGPresentationAttributes {
    style?: SVGPresentationAttributes;
    x: string | number;
    y: string | number;
    /**
     * Override the default hyphenation-callback
     * @see https://react-pdf.org/fonts#registerhyphenationcallback
     */
    hyphenationCallback?: HyphenationCallback;
  }

  /**
   * A React component for displaying text. Text supports nesting of other
   * Text or Link components to create inline styling.
   */
  export class Text extends React.Component<React.PropsWithChildren<TextProps> | SVGTextProps> {}

  interface LinkProps extends NodeProps {
    /**
     * Enable/disable page wrapping for element.
     * @see https://react-pdf.org/components#page-wrapping
     */
    wrap?: boolean;
    /**
     * Enables debug mode on page bounding box.
     * @see https://react-pdf.org/advanced#debugging
     */
    debug?: boolean;
    href?: string;
    src?: string;
  }

  interface XmlProps {
    value: string;
  }

  export class Xml extends React.Component<XmlProps> {}

  /**
   * A React component for displaying a hyperlink. Link’s can be nested
   * inside a Text component, or being inside any other valid primitive.
   */
  export class Link extends React.Component<React.PropsWithChildren<LinkProps>> {}

  interface NoteProps extends NodeProps {
    children: string;
  }

  export class Note extends React.Component<NoteProps> {}

  interface CanvasProps extends NodeProps {
    /**
     * Enables debug mode on page bounding box.
     * @see https://react-pdf.org/advanced#debugging
     */
    debug?: boolean;
    paint: (painter: any, availableWidth: number, availableHeight: number) => null;
  }

  export class Canvas extends React.Component<CanvasProps> {}

  interface SVGProps extends NodeProps, SVGPresentationAttributes {
    /**
     * Enables debug mode on page bounding box.
     * @see https://react-pdf.org/advanced#debugging
     */
    debug?: boolean;
    width?: string | number;
    height?: string | number;
    viewBox?: string;
    preserveAspectRatio?: string;
  }

  /**
   * The <SVG /> element is a container that defines a new coordinate system and viewport. It is used as the outermost element of SVG documents.
   */
  export class Svg extends React.Component<React.PropsWithChildren<SVGProps>> {}

  interface LineProps extends SVGPresentationAttributes {
    style?: SVGPresentationAttributes;
    x1: string | number;
    x2: string | number;
    y1: string | number;
    y2: string | number;
  }

  /**
   * The <Line /> element is used to create a line.
   */
  export class Line extends React.Component<React.PropsWithChildren<LineProps>> {}

  interface PolylineProps extends SVGPresentationAttributes {
    style?: SVGPresentationAttributes;
    points: string;
  }

  /**
   * The <Polyline /> element is used to create any shape that consists of only straight lines (that is connected at several points).
   */
  export class Polyline extends React.Component<React.PropsWithChildren<PolylineProps>> {}

  interface PolygonProps extends SVGPresentationAttributes {
    style?: SVGPresentationAttributes;
    points: string;
  }

  /**
   * The <Polygon /> element is used to create a graphic that contains at least three sides.
   * Polygons are made of straight lines, and the shape is "closed" (all the lines connect up).
   */
  export class Polygon extends React.Component<React.PropsWithChildren<PolygonProps>> {}

  interface PathProps extends SVGPresentationAttributes {
    style?: SVGPresentationAttributes;
    d: string;
  }

  /**
   * The <Path /> element is the most powerful element in the SVG library of basic shapes. It can be used to create lines, curves, arcs, and more.
   */
  export class Path extends React.Component<React.PropsWithChildren<PathProps>> {}

  interface RectProps extends SVGPresentationAttributes {
    style?: SVGPresentationAttributes;
    x?: string | number;
    y?: string | number;
    width: string | number;
    height: string | number;
    rx?: string | number;
    ry?: string | number;
  }

  /**
   * The <Rect /> element is used to create a rectangle and variations of a rectangle shape.
   */
  export class Rect extends React.Component<React.PropsWithChildren<RectProps>> {}

  interface CircleProps extends SVGPresentationAttributes {
    style?: SVGPresentationAttributes;
    cx?: string | number;
    cy?: string | number;
    r: string | number;
  }

  /**
   * The <Circle /> element is used to create a circle.
   */
  export class Circle extends React.Component<React.PropsWithChildren<CircleProps>> {}

  interface EllipseProps extends SVGPresentationAttributes {
    style?: SVGPresentationAttributes;
    cx?: string | number;
    cy?: string | number;
    rx: string | number;
    ry: string | number;
  }

  /**
   * The <Ellipse /> element is used to create an ellipse.
   * An ellipse is closely related to a circle. The difference is that an ellipse has an x and a y radius that differs from each other, while a circle has equal x and y radius.
   */
  export class Ellipse extends React.Component<React.PropsWithChildren<EllipseProps>> {}

  interface TspanProps extends SVGPresentationAttributes {
    x?: string | number;
    y?: string | number;
  }

  /**
   * The <Tspan /> element defines a subtext within a <Text /> element or another <Tspan /> element.
   * It allows for adjustment of the style and/or position of that subtext as needed.
   */
  export class Tspan extends React.Component<React.PropsWithChildren<TspanProps>> {}

  interface GProps extends SVGPresentationAttributes {
    style?: Style;
  }

  /**
   * The <G /> SVG element is a container used to group other SVG elements.
   * Transformations applied to the <G /> element are performed on its child elements, and its attributes are inherited by its children.
   */
  export class G extends React.Component<React.PropsWithChildren<GProps>> {}

  interface StopProps {
    offset: string | number;
    stopColor: string;
    stopOpacity?: string | number;
  }

  /**
   * The SVG <Stop /> element defines a color and its position to use on a gradient. This element is always a child of a <LinearGradient /> or <RadialGradient /> element
   */
  export class Stop extends React.Component<React.PropsWithChildren<StopProps>> {}

  interface DefsProps {}

  /**
   * The <Defs /> element is used to store graphical objects that will be used at a later time. Objects created inside a <Defs /> element are not rendered directly. To display them you have to reference them
   */
  export class Defs extends React.Component<React.PropsWithChildren<DefsProps>> {}

  interface ClipPathProps {
    id?: string;
  }

  /**
   * The <ClipPath /> SVG element defines a clipping path, to be used by the clipPath property.
   * A clipping path restricts the region to which paint can be applied. Conceptually, parts of the drawing that lie outside of the region bounded by the clipping path are not drawn.
   */
  export class ClipPath extends React.Component<React.PropsWithChildren<ClipPathProps>> {}

  interface LinearGradientProps {
    id: string;
    x1?: string | number;
    x2?: string | number;
    y1?: string | number;
    y2?: string | number;
  }

  /**
   * The <LinearGradient /> element lets authors define linear gradients that can be applied to fill or stroke of graphical elements.
   */
  export class LinearGradient extends React.Component<React.PropsWithChildren<LinearGradientProps>> {}

  interface RadialGradientProps {
    id: string;
    cx?: string | number;
    cy?: string | number;
    fr?: string | number;
    fx?: string | number;
    fy?: string | number;
  }

  /**
   * The <RadialGradient /> element lets authors define radial gradients that can be applied to fill or stroke of graphical elements.
   */
  export class RadialGradient extends React.Component<React.PropsWithChildren<RadialGradientProps>> {}

  interface BlobProviderParams {
    blob: Blob | null;
    url: string | null;
    loading: boolean;
    error: Error | null;
  }
  interface BlobProviderProps {
    document: React.ReactElement<DocumentProps>;
    children: (params: BlobProviderParams) => React.ReactNode;
  }

  /**
   * Easy and declarative way of getting document's blob data without
   * showing it on screen.
   * @see https://react-pdf.org/advanced#on-the-fly-rendering
   * @platform web
   */
  export class BlobProvider extends React.Component<BlobProviderProps> {}

  interface PDFViewerProps {
    width?: number | string;
    height?: number | string;
    style?: Style | Style[];
    className?: string;
    children?: React.ReactElement<DocumentProps>;
    innerRef?: React.Ref<HTMLIFrameElement>;
    showToolbar?: boolean;
  }

  /**
   * Iframe PDF viewer for client-side generated documents.
   * @platform web
   */
  export class PDFViewer extends React.Component<PDFViewerProps> {}

  interface PDFDownloadLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
    /** PDF filename. Alias for anchor tag `download` attribute. */
    fileName?: string;
    document: React.ReactElement<DocumentProps>;
    children?: React.ReactNode | React.ReactElement<BlobProviderParams>;
    onClick?: React.AnchorHTMLAttributes<HTMLAnchorElement>["onClick"] &
      ((event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, instance: UsePDFInstance) => void);
  }

  /**
   * Anchor tag to enable generate and download PDF documents on the fly.
   * @see https://react-pdf.org/advanced#on-the-fly-rendering
   * @platform web
   */
  export class PDFDownloadLink extends React.Component<PDFDownloadLinkProps> {}

  interface UsePDFInstance {
    loading: boolean;
    blob: Blob | null;
    url: string | null;
    error: string | null;
  }

  /**
   * React hook for creating and updating a PDF document instance
   * @platform web
   */
  export function usePDF(options?: {
    document?: React.ReactElement<DocumentProps>;
  }): [UsePDFInstance, (newDocument: React.ReactElement<DocumentProps>) => void];

  export const Font: FontStore;

  export const StyleSheet: {
    create: <T extends Styles>(styles: T) => T;
  };

  export const version: any;

  export const PDFRenderer: any;

  export const pdf: (initialValue?: React.ReactElement<DocumentProps>) => {
    container: any;
    isDirty: () => boolean;
    toString: () => string;
    toBlob: () => Promise<Blob>;
    // eslint-disable-next-line no-undef
    toBuffer: () => Promise<NodeJS.ReadableStream>;
    on: (event: "change", callback: () => void) => void;
    updateContainer: (document: React.ReactElement<any>, callback?: () => void) => void;
    removeListener: (event: "change", callback: () => void) => void;
  };

  export const renderToStream: (
    document: React.ReactElement<DocumentProps>,
    // eslint-disable-next-line no-undef
  ) => Promise<NodeJS.ReadableStream>;

  /**
   * @deprecated use the `renderToBuffer` method
   */
  export const renderToString: (document: React.ReactElement<DocumentProps>) => Promise<string>;

  export const renderToFile: (
    document: React.ReactElement<DocumentProps>,
    filePath: string,
    // eslint-disable-next-line no-undef
    callback?: (output: NodeJS.ReadableStream, _filePath: string) => any,
    // eslint-disable-next-line no-undef
  ) => Promise<NodeJS.ReadableStream>;

  const render: typeof renderToFile;

  /**
   * Render document into a nodejs buffer
   * @platform node
   */
  export const renderToBuffer: (document: React.ReactElement<ReactPDF.DocumentProps>) => Promise<Buffer>;
}
