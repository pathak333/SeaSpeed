import { Document, Page, pdfjs } from 'react-pdf';
import { useState } from 'react';
import { MinusCircle, PlusCircle } from 'react-feather';

interface Props{
    url: any;
}
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export default function PdfViewer({url}:Props) {
    const [numPages, setNumPages] = useState<number>(1);
    const [pageNumber, setPageNumber] = useState<number>(1);
  
    function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
        console.log(numPages)
      setNumPages(numPages);
    }
    function changePageNumber(e: any, sign: any) {
        console.log(pageNumber,"of ",numPages, "before");
        
        if (sign === "+") {
            
           if(pageNumber < numPages){ setPageNumber(pageNumber+1)}
        } else {
            if(pageNumber >1) {setPageNumber(pageNumber-1)}
        }
        console.log(pageNumber,"of ",numPages);
        
   }
console.log(url);

    return (
      <div>
        <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document>
        <div className='flex flex-row'>
       <MinusCircle  onClick={($event)=> changePageNumber($event,"-")}/> &nbsp;&nbsp;  Page {pageNumber} of {numPages} &nbsp;&nbsp; <PlusCircle onClick={($event)=> changePageNumber($event,"+")} />
        </div>
      </div>
    );
}
  
