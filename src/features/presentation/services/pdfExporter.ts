import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export async function exportPresentationToPDF(containerElementId: string, title: string): Promise<void> {
  const slideElements = document.querySelectorAll<HTMLElement>(`.${containerElementId}`);
  if (!slideElements || slideElements.length === 0) {
    throw new Error('No slide elements found for PDF export.');
  }

  // Create 16:9 Landscape PDF Document (297mm x 167mm or 10in x 5.625in)
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: [297, 167]
  });

  for (let i = 0; i < slideElements.length; i++) {
    const slideEl = slideElements[i];

    // Render slide element to high-res canvas (300 DPI equivalent with scale 2)
    const canvas = await html2canvas(slideEl, {
      scale: 2,
      useCORS: true,
      backgroundColor: null,
      logging: false,
      onclone: (clonedDoc) => {
        const styleElements = clonedDoc.querySelectorAll('style');
        styleElements.forEach((styleEl) => {
          if (styleEl.textContent && (styleEl.textContent.includes('oklab') || styleEl.textContent.includes('oklch'))) {
            styleEl.textContent = styleEl.textContent
              .replace(/oklab\([^)]+\)/g, '#00daf3')
              .replace(/oklch\([^)]+\)/g, '#00daf3');
          }
        });
        const allElements = clonedDoc.getElementsByTagName('*');
        for (let i = 0; i < allElements.length; i++) {
          const el = allElements[i] as HTMLElement;
          if (el.style) {
            ['color', 'backgroundColor', 'borderColor', 'outlineColor', 'fill', 'stroke'].forEach((prop) => {
              const val = el.style.getPropertyValue(prop);
              if (val && (val.includes('oklab') || val.includes('oklch'))) {
                el.style.setProperty(prop, '#00daf3');
              }
            });
          }
        }
      }
    });

    const imgData = canvas.toDataURL('image/png', 1.0);

    if (i > 0) {
      pdf.addPage([297, 167], 'landscape');
    }

    pdf.addImage(imgData, 'PNG', 0, 0, 297, 167, undefined, 'FAST');
  }

  const filename = `${title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_presentation.pdf`;
  pdf.save(filename);
}
