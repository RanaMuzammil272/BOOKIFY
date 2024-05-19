import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import "./pdf-style.css"
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
const PdfComp = ({ pdfFile }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const renderPages = () => {
    const pages = [];
    for (let i = 1; i <= numPages; i++) {
      pages.push(
        <Page key={i} pageNumber={i} />
      );
    }
    return pages;
  };

  return (
    <div className="pdf-container">
      <Document
        file={pdfFile}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {renderPages()}
      </Document>
      <p>Page {pageNumber} of {numPages}</p>
    </div>
  );
};

export default PdfComp;
