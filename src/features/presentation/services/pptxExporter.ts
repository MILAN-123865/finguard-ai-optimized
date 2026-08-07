import pptxgen from 'pptxgenjs';

export interface PresentationData {
  title: string;
  subtitle: string;
  author: string;
  theme: 'dark' | 'light';
  logoDataUrl: string;
  slides: Array<{
    id: string;
    title: string;
    subtitle?: string;
    bullets?: string[];
    metrics?: Array<{ label: string; value: string; change?: string }>;
    tableData?: {
      headers: string[];
      rows: string[][];
    };
    quote?: string;
  }>;
}

export async function exportToPowerPoint(data: PresentationData): Promise<void> {
  const pptx = new pptxgen();

  // Set Widescreen 16:9 Presentation Format (13.33 x 7.5 inches)
  pptx.layout = 'LAYOUT_16x9';
  pptx.author = data.author || 'FinGuard AI SOC';
  pptx.company = 'FinGuard AI Security';
  pptx.title = data.title;

  const isDark = data.theme === 'dark';
  const bgColor = isDark ? '0F1321' : 'F8FAFC';
  const cardBgColor = isDark ? '1E293B' : 'FFFFFF';
  const textColor = isDark ? 'FFFFFF' : '0F172A';
  const mutedTextColor = isDark ? 'BAC9CC' : '475569';
  const accentColor = '00DAF3';
  const secondaryAccent = '6001D1';
  const borderColor = isDark ? '334155' : 'E2E8F0';

  // Helper to add top-right logo on EVERY slide strictly adhering to requirements
  const addTopRightLogo = (slide: pptxgen.Slide) => {
    // 16:9 Slide width is 13.33". Top-Right Logo: x = 11.8", y = 0.35", w = 1.0", h = 0.5" (~3-5% width)
    if (data.logoDataUrl) {
      slide.addImage({
        data: data.logoDataUrl,
        x: 11.8,
        y: 0.35,
        w: 1.0,
        h: 0.5,
        sizing: { type: 'contain', w: 1.0, h: 0.5 }
      });
    }
  };

  // --- SLIDE 1: Title Cover Slide ---
  const slide1 = pptx.addSlide();
  slide1.background = { color: bgColor };

  // Decorative Accent Line
  slide1.addShape(pptx.ShapeType.rect, {
    x: 0.8,
    y: 2.2,
    w: 0.15,
    h: 3.2,
    fill: { color: accentColor },
    line: { color: accentColor }
  });

  // Main Title
  slide1.addText(data.title, {
    x: 1.2,
    y: 2.1,
    w: 10.0,
    h: 1.8,
    fontSize: 34,
    bold: true,
    color: textColor,
    fontFace: 'Arial',
    align: 'left',
    valign: 'middle'
  });

  // Subtitle
  slide1.addText(data.subtitle, {
    x: 1.2,
    y: 3.9,
    w: 10.0,
    h: 0.8,
    fontSize: 18,
    color: accentColor,
    fontFace: 'Arial',
    align: 'left'
  });

  // Author / Footer Meta
  slide1.addText(`Prepared by: ${data.author}  |  Enterprise Cyber Intelligence  |  Confidential`, {
    x: 1.2,
    y: 6.5,
    w: 10.0,
    h: 0.5,
    fontSize: 11,
    color: mutedTextColor,
    fontFace: 'Arial'
  });

  addTopRightLogo(slide1);

  // --- CONTENT SLIDES ---
  data.slides.forEach((slideContent, index) => {
    const slide = pptx.addSlide();
    slide.background = { color: bgColor };

    // Slide Header Title
    slide.addText(slideContent.title, {
      x: 0.8,
      y: 0.4,
      w: 10.5,
      h: 0.7,
      fontSize: 24,
      bold: true,
      color: textColor,
      fontFace: 'Arial'
    });

    if (slideContent.subtitle) {
      slide.addText(slideContent.subtitle, {
        x: 0.8,
        y: 1.0,
        w: 10.5,
        h: 0.4,
        fontSize: 13,
        color: accentColor,
        fontFace: 'Arial'
      });
    }

    // Divider Line below header
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.8,
      y: 1.45,
      w: 11.7,
      h: 0.02,
      fill: { color: borderColor },
      line: { color: borderColor }
    });

    // Render Metrics if present
    if (slideContent.metrics && slideContent.metrics.length > 0) {
      const cardWidth = 3.6;
      const gap = 0.45;
      slideContent.metrics.forEach((m, mIdx) => {
        const xPos = 0.8 + mIdx * (cardWidth + gap);
        // Card Background Container
        slide.addShape(pptx.ShapeType.roundRect, {
          x: xPos,
          y: 1.8,
          w: cardWidth,
          h: 1.5,
          fill: { color: cardBgColor },
          line: { color: borderColor, width: 1 },
          rectRadius: 0.1
        });

        // Metric Value
        slide.addText(m.value, {
          x: xPos + 0.2,
          y: 1.95,
          w: cardWidth - 0.4,
          h: 0.6,
          fontSize: 28,
          bold: true,
          color: accentColor,
          fontFace: 'Arial'
        });

        // Metric Label
        slide.addText(m.label, {
          x: xPos + 0.2,
          y: 2.55,
          w: cardWidth - 0.4,
          h: 0.5,
          fontSize: 12,
          bold: true,
          color: textColor,
          fontFace: 'Arial'
        });
      });
    }

    // Render Bullets if present
    if (slideContent.bullets && slideContent.bullets.length > 0) {
      const yStart = slideContent.metrics ? 3.6 : 1.8;
      const bulletItems = slideContent.bullets.map(b => ({
        text: b,
        options: { fontSize: 14, color: textColor, bullet: true, spaceAfter: 12, fontFace: 'Arial' }
      }));

      slide.addText(bulletItems, {
        x: 0.8,
        y: yStart,
        w: 11.7,
        h: 3.2,
        valign: 'top'
      });
    }

    // Render Table if present
    if (slideContent.tableData) {
      const tableRows: pptxgen.TableRow[] = [];

      // Header Row
      const headerRow: pptxgen.TableCell[] = slideContent.tableData.headers.map(h => ({
        text: h,
        options: {
          fill: { color: secondaryAccent },
          color: 'FFFFFF',
          bold: true,
          fontSize: 12,
          align: 'left',
          valign: 'middle'
        }
      }));
      tableRows.push(headerRow);

      // Data Rows
      slideContent.tableData.rows.forEach(r => {
        const rowCells: pptxgen.TableCell[] = r.map(cellText => ({
          text: cellText,
          options: {
            fill: { color: cardBgColor },
            color: textColor,
            fontSize: 11,
            align: 'left',
            valign: 'middle'
          }
        }));
        tableRows.push(rowCells);
      });

      slide.addTable(tableRows, {
        x: 0.8,
        y: 2.2,
        w: 11.7,
        colW: [2.5, 1.8, 3.4, 4.0],
        border: { pt: 0.5, color: borderColor }
      });
    }

    // Slide Number & Footer
    slide.addText(`FinGuard AI | Executive Presentation   •   Slide ${index + 2}`, {
      x: 0.8,
      y: 7.0,
      w: 11.7,
      h: 0.3,
      fontSize: 10,
      color: mutedTextColor,
      fontFace: 'Arial'
    });

    // Top-Right Logo on Every Slide
    addTopRightLogo(slide);
  });

  // Save PPTX File
  const filename = `${data.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_presentation.pptx`;
  await pptx.writeFile({ fileName: filename });
}
