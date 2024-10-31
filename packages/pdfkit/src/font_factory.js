import * as fontkit from 'fontkit';
import fs from "node:fs"
import EmbeddedFont from './font/embedded';
import StandardFont from './font/standard';

class PDFFontFactory {
  static open(document, src, family, id) {
    let font;
    
    if (typeof src === 'string') {
      if (StandardFont.isStandardFont(src)) {
        return new StandardFont(document, src, id);
      }

      
      if (!BROWSER) {
         src = fs.readFileSync(src);
      } else {
        throw new Error(`Can't open ${src} in browser build`);
      }
    }

    if (Buffer.isBuffer(src)) {
      font = fontkit.create(src, family);  
    } else if (src instanceof Uint8Array) {
      font = fontkit.create(Buffer.from(src), family);
    } else if (src instanceof ArrayBuffer) {
      font = fontkit.create(Buffer.from(new Uint8Array(src)), family);
    } else if (typeof src === 'object') {
      font = src;
    }

    if (font == null) {
      throw new Error('Not a supported font format or standard PDF font.');
    }

    return new EmbeddedFont(document, font, id);
  }
}

export { PDFFontFactory }
export default PDFFontFactory;