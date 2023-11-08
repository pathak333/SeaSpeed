

import React, { useRef } from 'react'
import jsPDF from 'jspdf';
import Contract from './contract';

export default function GenratePdf() {
    const reportTemplateRef = useRef(null);
    
    const handleGeneratePdf = () => {
		const doc = new jsPDF({
			format: 'a4',
            unit: 'pt', 
            putOnlyUsedFonts: true,
            compress: true,
            userUnit:1
            
		});

		// Adding the fonts.
		doc.setFont('Inter-Regular', 'normal');
        if (reportTemplateRef.current !== null) {
    
		doc.html(reportTemplateRef.current, {
			async callback(doc) {
				await doc.save('document');
			},
		});
}
	};




  return (
    <div>
    <button className="button" onClick={handleGeneratePdf}>
        Generate PDF
    </button>
    <div ref={reportTemplateRef}>
        <Contract />
    </div>
</div>
  )
}
