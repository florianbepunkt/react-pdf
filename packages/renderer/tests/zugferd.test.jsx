/* eslint-disable import/no-named-as-default-member */
import { describe, expect, test } from 'vitest';

import fs from 'fs';
import path from 'path';
import url from 'url';
import ReactPDF from '../src/node';

const { Document, Font, Page, Text, Xml } = ReactPDF;

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const fontPath = path.join(path.resolve(__dirname), 'assets/inter-500.ttf');
const exampleXml = fs.readFileSync(
  path.join(path.resolve(__dirname), 'assets/example.xml'),
);

Font.register({ family: 'Inter', src: fontPath });

/**
 * @param {Object} props
 */
const TestDocument = ({ onRender }) => {
  return (
    <Document
      attachments={[
        {
          content: exampleXml,
          creationDate: new Date(2020, 3, 1),
          description: 'ZUGFeRD Invoice Data',
          hidden: false,
          modifiedDate: new Date(2020, 3, 1),
          name: 'zugferd-invoice.xml',
          relationship: 'Alternative',
          type: 'application/xml',
        },
      ]}
      author="Test GmbH"
      creationDate={new Date()}
      creator="Test GmbH"
      keywords="test"
      onRender={onRender}
      pdfVersion="1.7"
      producer="Test"
      subject="Test"
      subset="PDF/A-3"
      tagged
      title="Test"
    >
      <Page>
        <Text style={{ fontFamily: 'Inter' }}>Lorem</Text>
        <Xml
          value={`<rdf:Description rdf:about="" xmlns:zf="urn:zugferd:pdfa:CrossIndustryDocument:invoice:2p0#">
        <zf:ConformanceLevel>BASIC</zf:ConformanceLevel>
        <zf:DocumentFileName>zugferd-invoice.xml</zf:DocumentFileName>
        <zf:DocumentType>INVOICE</zf:DocumentType>
        <zf:Version>2p0</zf:Version>
    </rdf:Description>
    
    <!-- PDF/A extension schema description for the ZUGFeRD schema.
        It is crucial for PDF/A-3 conformance. Don't touch! -->
    <rdf:Description rdf:about=""
            xmlns:pdfaExtension="http://www.aiim.org/pdfa/ns/extension/"
            xmlns:pdfaSchema="http://www.aiim.org/pdfa/ns/schema#"
            xmlns:pdfaProperty="http://www.aiim.org/pdfa/ns/property#">

    <pdfaExtension:schemas>
        <rdf:Bag>
            <rdf:li rdf:parseType="Resource">
                <pdfaSchema:schema>ZUGFeRD PDFA Extension Schema</pdfaSchema:schema>
                <pdfaSchema:namespaceURI>urn:zugferd:pdfa:CrossIndustryDocument:invoice:2p0#</pdfaSchema:namespaceURI>
                <pdfaSchema:prefix>zf</pdfaSchema:prefix>
                <pdfaSchema:property>
                    <rdf:Seq>
                    <rdf:li rdf:parseType="Resource">
                        <pdfaProperty:name>DocumentFileName</pdfaProperty:name>
                        <pdfaProperty:valueType>Text</pdfaProperty:valueType>
                        <pdfaProperty:category>external</pdfaProperty:category>
                        <pdfaProperty:description>name of the embedded XML invoice file</pdfaProperty:description>
                    </rdf:li>
                    <rdf:li rdf:parseType="Resource">
                        <pdfaProperty:name>DocumentType</pdfaProperty:name>
                        <pdfaProperty:valueType>Text</pdfaProperty:valueType>
                        <pdfaProperty:category>external</pdfaProperty:category>
                        <pdfaProperty:description>INVOICE</pdfaProperty:description>
                    </rdf:li>
                    <rdf:li rdf:parseType="Resource">
                        <pdfaProperty:name>Version</pdfaProperty:name>
                        <pdfaProperty:valueType>Text</pdfaProperty:valueType>
                        <pdfaProperty:category>external</pdfaProperty:category>
                        <pdfaProperty:description>The actual version of the ZUGFeRD XML schema</pdfaProperty:description>
                    </rdf:li>
                    <rdf:li rdf:parseType="Resource">
                        <pdfaProperty:name>ConformanceLevel</pdfaProperty:name>
                        <pdfaProperty:valueType>Text</pdfaProperty:valueType>
                        <pdfaProperty:category>external</pdfaProperty:category>
                        <pdfaProperty:description>The conformance level of the embedded ZUGFeRD data</pdfaProperty:description>
                    </rdf:li>
                    </rdf:Seq>
                </pdfaSchema:property>
            </rdf:li>
        </rdf:Bag>
        </pdfaExtension:schemas>
    </rdf:Description>`}
        />
      </Page>
    </Document>
  );
};

describe('node', () => {
  test('should render to file', async () => {
    const pdfPath = `${__dirname}/test.pdf`;
    await ReactPDF.renderToFile(<TestDocument />, pdfPath);
    expect(fs.existsSync(pdfPath)).toBeTruthy();
    fs.unlinkSync(pdfPath);
  });
});
