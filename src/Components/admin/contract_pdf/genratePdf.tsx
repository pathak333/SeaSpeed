

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

  const fetchData = async () => {
    // applicationPdf
    dispatch({ type: LOADING, payload: true });
    const { data } = await applicationPdf(location.state.id)
    if (data) {
      console.log(data);
    
      updateCrew(data.data[0])
    }

    dispatch({ type: LOADING, payload: false });

  }

  useEffect(() => {
    fetchData()
  }, [])


  // const handleGeneratePdf = () => {
  //   const doc = new jsPDF({
  //     format: 'a4',
  //     unit: 'pt',
  //     putOnlyUsedFonts: true,
  //     compress: true,
  //     userUnit: 1,
  //     floatPrecision: "smart"

  //   });

  //   // Adding the fonts.
  //   doc.setFont('Inter-Regular', 'normal');
  //   if (reportTemplateRef.current !== null) {

  //     doc.html(reportTemplateRef.current, {
  //       async callback(doc) {
  //         const originalFontSize = 12;
  //         const scaledFontSize = originalFontSize * 0.5; // Adjust the scaling factor as needed
  //         doc.setFontSize(scaledFontSize);
  //         doc.text("Scaled down text", 50, 50); // Adjust the coordinates as needed

  //         await doc.save('document');
  //       },
  //     });
  //   }
  // };




  const convertToPDF = async () => {
    const content = reportTemplateRef.current;

    if (!content) {
      console.error("Content not found");
      return;
    }
    // Center all text within the content div
    const textElements = content.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div, td');
    textElements.forEach((element: any) => {
      element.style.lineHeight = 1.5;
    });
    try {
      const canvas = await html2canvas(content, { scale: 2 });
      const imageData = canvas.toDataURL('image/png');

      const pdf = new jsPDF();
      pdf.addImage(imageData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
      pdf.save('converted-document.pdf');
    } catch (error) {
      console.error('Error converting to PDF:', error);
    }
  };




  return (
    <div>
      <button className="button" onClick={convertToPDF}>
        Generate PDF
      </button>
      <div ref={reportTemplateRef}>
        {crew && <Contract crew={crew} />}
      </div>
    </div>
  )
}
