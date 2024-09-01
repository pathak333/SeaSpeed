

import React, { useEffect, useRef, useState } from 'react'
import jsPDF from 'jspdf';
import Contract from './contract';
import html2canvas from 'html2canvas';
import { applicationPdf } from '../../../services/admin.service';
import { useLocation } from 'react-router-dom';
import { useGlobalState } from '../../../contexts/global.context';
import { LOADING } from '../../../constants/action.constant';


export default function GenratePdf() {
  const reportTemplateRef = useRef<HTMLDivElement>(null);
  const [crew, updateCrew] = useState();
  const location = useLocation();
  const [globalData,dispatch] = useGlobalState()
  const [canvasDataUrl, setCanvasDataUrl] = useState('');


  const fetchData = async () => {
    // applicationPdf
    dispatch({ type: LOADING, payload: true });
    const { data } = await applicationPdf(location.state.id)

    if (data) {
      console.log(data.data[0]);
    
    updateCrew(data.data[0])
    dispatch({ type: LOADING, payload: false });
    }


  }

  useEffect(() => {
    fetchData()
  }, [])


  const convertToPDF = () => {
    const doc = new jsPDF({
      format: 'a4',
      unit: 'pt',
      putOnlyUsedFonts: true,
      compress: true,
      userUnit: 0.2,
      floatPrecision: "smart"

    });
    doc.setFontSize(2);
    // Adding the fonts.
    doc.setFont('Inter-Regular', 'normal');
    if (reportTemplateRef.current !== null) {

      doc.html(reportTemplateRef.current, {
       
        async callback(doc) {
          
         
         
          // doc.text("Scaled down text", 50, 50); // Adjust the coordinates as needed
          await doc.save('document');
        },
      });
    }
  };




  // const convertToPDF = async () => {
  //   const content = reportTemplateRef.current;

  //   if (!content) {
  //     console.error("Content not found");
  //     return;
  //   }
  //   // Center all text within the content div
  //   const textElements = content.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div, td');
  //   textElements.forEach((element: any) => {
  //     element.style.lineHeight = 1.5;
  //   });



  //   try {
  //     const pdf = new jsPDF('p', 'pt', 'a4');
  //     const canvas = await html2canvas(content, { scale: 2 });
  //     const totalHeight = canvas.height;
  //     const pageHeight =800;
  //     let position = 0;
  //     while (position < totalHeight) {
  //       // Divide canvas into parts
  //       const partCanvas = document.createElement('canvas');
  //       const ctx = canvas.getContext('2d');
  //       partCanvas.width = pdf.internal.pageSize.width;
  //       partCanvas.height = Math.min(pageHeight, totalHeight - position);
  //       const partContext = partCanvas.getContext('2d');
  //       partContext?.drawImage(canvas, 0, position);
  //       ctx?.clearRect(0, 0, canvas.width, partCanvas.height);
  
  //       // Add part to PDF
  //       pdf.addImage(partCanvas.toDataURL('image/png'), 'PNG', 0, 0, pdf.internal.pageSize.width, 0);
  
  //       position += pageHeight;
  
  //       if (position < totalHeight) {
  //         pdf.addPage();
  //       }
  //     }
  //     // Save or display the PDF
  //   pdf.save('exported-document.pdf');
  //     // const imageData = canvas.toDataURL('image/png');
  //     // setCanvasDataUrl(imageData);
     
  //     // pdf.addImage(imageData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
  //     // pdf.save('converted-document.pdf');
  //   } catch (error) {
  //     console.error('Error converting to PDF:', error);
  //   }
  // };




  console.log(crew)
  return (
    <div>
      <button className="tracking-wider text-white bg-gradient-to-r from-cyan-600 to-blue-600 font-bold px-14 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" onClick={convertToPDF}>
        Generate PDF
      </button>
      <div className='bg-white' ref={reportTemplateRef} style={{width:600,}}>
        {crew && <Contract crew={crew} />}
      </div>
      {/* Display the canvas element */}
      {canvasDataUrl && (
        <div>
          <h2>Preview</h2>
          <img src={canvasDataUrl} alt="Canvas Preview" style={{ maxWidth: '100%' }} />
        </div>
      )}
    </div>
  )
}
