import { Document, Page, pdfjs } from 'react-pdf';
import { useState } from 'react';
import { DownloadCloud, MinusCircle, PlusCircle } from 'react-feather';
import { Close } from '@mui/icons-material';
import { IconButton } from '@mui/material';


interface Props {
  url: any;
  close?: () => void;
}
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export default function PdfViewer({ url, close }: Props) {
  const [numPages, setNumPages] = useState<number>(1);
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    console.log(numPages)
    setNumPages(numPages);
  }
  function changePageNumber(e: any, sign: any) {
    console.log(pageNumber, "of ", numPages, "before");
    if (sign === "+") {
      if (pageNumber < numPages) { setPageNumber(pageNumber + 1) }
    } else {
      if (pageNumber > 1) { setPageNumber(pageNumber - 1) }
    }
    console.log(pageNumber, "of ", numPages);

  }
  console.log(url);


  const isImageUrl = (url:string) => {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp'];
    const lowerCaseUrl = url.toLowerCase();
  
    return imageExtensions.some((extension) => lowerCaseUrl.endsWith(extension));
  };
  
  const isPdfUrl = (url:string) => {
    const pdfExtensions = ['.pdf'];
    const lowerCaseUrl = url.toLowerCase();
  
    return pdfExtensions.some((extension) => lowerCaseUrl.endsWith(extension));
  };


  const isImage = isImageUrl(url);
  const isPdf = isPdfUrl(url);


  return (
    <>
      {url && <div>
        <div className="flex flex-row">
          <IconButton component="a"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            download>
            <DownloadCloud className='mr-3' size={44} />
          </IconButton>
          {/* <a href={url}><DownloadCloud className='mr-3'  size={44}/></a> */}
          {close && <Close style={{ fontSize: 44, color: 'red' }} onClick={close} />}
        </div>
       { isPdf && <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document>}
        {isImage && <img src={url} alt="Sea Speed" />}
        <div className='flex flex-row m-6'>
          <MinusCircle onClick={($event) => changePageNumber($event, "-")} /> &nbsp;&nbsp;  Page {pageNumber} of {numPages} &nbsp;&nbsp; <PlusCircle onClick={($event) => changePageNumber($event, "+")} />
        </div>
      </div>}
    </>
  );
}

