import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import html2canvas from 'html2canvas';
import { ScanResult } from '../types';

export type ExportFormat = 'csv' | 'xlsx' | 'pdf' | 'json';

export interface ExportFilters {
  filterType?: string;
  riskFilter?: string;
  dateFilter?: string;
  searchQuery?: string;
  sortOrder?: string;
}

export interface FormattedTelemetryRow {
  detectionId: string;
  threatType: string;
  source: string;
  payload: string;
  riskScore: string;
  threatLevel: string;
  aiConfidence: string;
  detectionTime: string;
  status: string;
  analystNotes: string;
  resolutionStatus: string;
}

export interface ExecutiveSummaryMetrics {
  totalRecords: number;
  safeCount: number;
  suspiciousCount: number;
  dangerousCount: number;
  criticalCount: number;
  highRiskCount: number;
  averageConfidence: number;
  averageScore: number;
}

/**
 * Format telemetry records into standardized row objects
 */
export function formatTelemetryData(records: ScanResult[]): FormattedTelemetryRow[] {
  return records.map((item) => ({
    detectionId: item.id,
    threatType: item.type.toUpperCase(),
    source: item.sender || 'Unknown',
    payload: item.content,
    riskScore: `${item.score}%`,
    threatLevel: item.level,
    aiConfidence: `${item.confidence}%`,
    detectionTime: String(item.timestamp),
    status: item.phishKitDetected ? 'PhishKit / Threat Detected' : 'Scan Completed',
    analystNotes: 'Standard automated threat assessment completed.',
    resolutionStatus: typeof item.recommendation === 'string' ? item.recommendation : (typeof item.recommendation === 'object' && item.recommendation?.title ? item.recommendation.title : (item.level === 'SAFE' ? 'Resolved / Clean' : 'Action Required')),
  }));
}

/**
 * Generate Executive Summary metrics from records
 */
export function generateExecutiveSummary(records: ScanResult[]): ExecutiveSummaryMetrics {
  const totalRecords = records.length;
  if (totalRecords === 0) {
    return {
      totalRecords: 0,
      safeCount: 0,
      suspiciousCount: 0,
      dangerousCount: 0,
      criticalCount: 0,
      highRiskCount: 0,
      averageConfidence: 0,
      averageScore: 0,
    };
  }

  const safeCount = records.filter((r) => r.level === 'SAFE').length;
  const suspiciousCount = records.filter((r) => r.level === 'SUSPICIOUS').length;
  const dangerousCount = records.filter((r) => r.level === 'DANGEROUS').length;
  const criticalCount = records.filter((r) => r.level === 'CRITICAL').length;
  const highRiskCount = dangerousCount + criticalCount;

  const totalConfidence = records.reduce((acc, r) => acc + (r.confidence || 0), 0);
  const totalScore = records.reduce((acc, r) => acc + (r.score || 0), 0);

  return {
    totalRecords,
    safeCount,
    suspiciousCount,
    dangerousCount,
    criticalCount,
    highRiskCount,
    averageConfidence: Math.round(totalConfidence / totalRecords),
    averageScore: Math.round(totalScore / totalRecords),
  };
}

/**
 * Generates standard timestamped filename
 */
export function generateExportFilename(format: ExportFormat, prefix?: string): string {
  const dateStr = new Date().toISOString().split('T')[0];
  const pfx = prefix || (format === 'pdf' ? 'Threat_Report' : 'Threat_History');
  const extension = format === 'xlsx' ? 'xlsx' : format;
  return `${pfx}_${dateStr}.${extension}`;
}

/**
 * Universal browser file downloader
 */
export function downloadFile(content: Blob | string, filename: string, mimeType: string = 'text/plain'): void {
  let blob: Blob;
  if (typeof content === 'string') {
    blob = new Blob([content], { type: mimeType });
  } else {
    blob = content;
  }
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Attempts to capture chart DOM elements as Base64 images
 */
export async function captureCharts(chartSelectors: string[]): Promise<string[]> {
  const capturedImages: string[] = [];

  for (const selector of chartSelectors) {
    try {
      const el = document.querySelector(selector) as HTMLElement | null;
      if (el) {
        const canvas = await html2canvas(el, {
          backgroundColor: '#0a0d1a',
          scale: 2,
          useCORS: true,
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
              const elem = allElements[i] as HTMLElement;
              if (elem.style) {
                ['color', 'backgroundColor', 'borderColor', 'outlineColor', 'fill', 'stroke'].forEach((prop) => {
                  const val = elem.style.getPropertyValue(prop);
                  if (val && (val.includes('oklab') || val.includes('oklch'))) {
                    elem.style.setProperty(prop, '#00daf3');
                  }
                });
              }
            }
          },
        });
        capturedImages.push(canvas.toDataURL('image/png'));
      }
    } catch (err) {
      console.warn(`Could not capture chart with selector "${selector}":`, err);
    }
  }

  return capturedImages;
}

/**
 * Export scan records to CSV with UTF-8 BOM, escaped values & proper column headers
 */
export async function exportToCSV(records: ScanResult[], _filters?: ExportFilters): Promise<void> {
  if (!records || records.length === 0) {
    throw new Error('No data available to export.');
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      const formatted = formatTelemetryData(records);

      const headers = [
        'Detection ID',
        'Threat Type',
        'Source',
        'Payload',
        'Risk Score',
        'Threat Level',
        'AI Confidence',
        'Detection Time',
        'Status',
        'Analyst Notes',
        'Resolution Status',
      ];

      const escapeCSVField = (val: any): string => {
        if (val === null || val === undefined) return '""';
        const str = String(val).replace(/"/g, '""');
        return `"${str}"`;
      };

      const rows = formatted.map((row) => [
        escapeCSVField(row.detectionId),
        escapeCSVField(row.threatType),
        escapeCSVField(row.source),
        escapeCSVField(row.payload),
        escapeCSVField(row.riskScore),
        escapeCSVField(row.threatLevel),
        escapeCSVField(row.aiConfidence),
        escapeCSVField(row.detectionTime),
        escapeCSVField(row.status),
        escapeCSVField(row.analystNotes),
        escapeCSVField(row.resolutionStatus),
      ]);

      // Add UTF-8 Byte Order Mark (BOM)
      const csvContent =
        '\uFEFF' +
        [
          headers.map((h) => `"${h}"`).join(','),
          ...rows.map((r) => r.join(',')),
        ].join('\r\n');

      const filename = generateExportFilename('csv', 'Threat_History');
      downloadFile(csvContent, filename, 'text/csv;charset=utf-8;');
      resolve();
    }, 150);
  });
}

/**
 * Export scan records to Excel (.xlsx) using SheetJS
 */
export async function exportToExcel(records: ScanResult[], _filters?: ExportFilters): Promise<void> {
  if (!records || records.length === 0) {
    throw new Error('No data available to export.');
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      const formatted = formatTelemetryData(records);

      const formattedData = formatted.map((row) => ({
        'Detection ID': row.detectionId,
        'Threat Type': row.threatType,
        'Source': row.source,
        'Payload': row.payload,
        'Risk Score': row.riskScore,
        'Threat Level': row.threatLevel,
        'AI Confidence': row.aiConfidence,
        'Detection Time': row.detectionTime,
        'Status': row.status,
        'Analyst Notes': row.analystNotes,
        'Resolution Status': row.resolutionStatus,
      }));

      const worksheet = XLSX.utils.json_to_sheet(formattedData);

      if (formattedData.length > 0) {
        const colWidths = Object.keys(formattedData[0]).map((key) => {
          const maxLen = Math.max(
            key.length,
            ...formattedData.slice(0, 500).map((r) => String((r as any)[key] || '').length)
          );
          return { wch: Math.min(Math.max(maxLen + 3, 12), 60) };
        });
        worksheet['!cols'] = colWidths;
      }

      worksheet['!views'] = [{ state: 'frozen', xSplit: 0, ySplit: 1, activeCell: 'A2' }];

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Scan History Logs');

      const filename = generateExportFilename('xlsx', 'Threat_History');
      XLSX.writeFile(workbook, filename);
      resolve();
    }, 150);
  });
}

/**
 * Export scan records to professional PDF report using jsPDF and autoTable
 */
export async function exportToPDF(
  records: ScanResult[],
  filters?: ExportFilters,
  operatorName: string = 'Security Operator'
): Promise<void> {
  if (!records || records.length === 0) {
    throw new Error('No data available to export.');
  }

  // Try capturing DOM charts if available
  const chartSelectors = ['#safe-vs-threat-chart', '#threat-trend-chart', '#threat-distribution-chart'];
  let chartImages: string[] = [];
  try {
    chartImages = await captureCharts(chartSelectors);
  } catch (e) {
    console.warn('DOM chart capture skipped or failed:', e);
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      const summary = generateExecutiveSummary(records);
      const now = new Date();
      const generatedDate = now.toISOString().split('T')[0];
      const generatedTime = now.toTimeString().split(' ')[0];

      // Top Dark Header Banner
      doc.setFillColor(10, 13, 26); // #0a0d1a
      doc.rect(0, 0, pageWidth, 32, 'F');

      // Cyan Accent Line
      doc.setFillColor(0, 218, 243); // #00daf3
      doc.rect(0, 32, pageWidth, 1.5, 'F');

      // Header Text & Company Logo Title
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('FINGUARD AI — THREAT HISTORY AUDIT REPORT', 14, 12);

      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(186, 201, 204);
      doc.text(
        `Generated: ${generatedDate} ${generatedTime}  |  Operator: ${operatorName}  |  Total Records: ${summary.totalRecords}`,
        14,
        19
      );

      // Active Filters
      const dateRangeStr = filters?.dateFilter && filters.dateFilter !== 'all' ? filters.dateFilter : 'All Time';
      const filterDesc = `Active Filters: Vector: [${filters?.filterType || 'All'}] • Risk: [${filters?.riskFilter || 'All'}] • Range: [${dateRangeStr}] • Search: "${filters?.searchQuery || 'None'}"`;
      doc.setFontSize(8);
      doc.setTextColor(0, 218, 243);
      doc.text(filterDesc, 14, 26);

      // Summary Cards Block
      doc.setFillColor(15, 19, 33);
      doc.roundedRect(14, 37, pageWidth - 28, 16, 2, 2, 'F');

      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');

      // Total Threats
      doc.setTextColor(255, 255, 255);
      doc.text('TOTAL LOGS:', 18, 44);
      doc.setFontSize(10);
      doc.setTextColor(0, 218, 243);
      doc.text(`${summary.totalRecords}`, 18, 49.5);

      // Safe
      doc.setFontSize(8);
      doc.setTextColor(255, 255, 255);
      doc.text('SAFE:', 60, 44);
      doc.setFontSize(10);
      doc.setTextColor(34, 197, 94);
      doc.text(`${summary.safeCount}`, 60, 49.5);

      // Suspicious
      doc.setFontSize(8);
      doc.setTextColor(255, 255, 255);
      doc.text('SUSPICIOUS:', 95, 44);
      doc.setFontSize(10);
      doc.setTextColor(234, 179, 8);
      doc.text(`${summary.suspiciousCount}`, 95, 49.5);

      // High Risk / Critical
      doc.setFontSize(8);
      doc.setTextColor(255, 255, 255);
      doc.text('HIGH RISK (CRITICAL/DANGEROUS):', 135, 44);
      doc.setFontSize(10);
      doc.setTextColor(239, 68, 68);
      doc.text(`${summary.highRiskCount} (${summary.criticalCount} Critical)`, 135, 49.5);

      // Avg Confidence
      doc.setFontSize(8);
      doc.setTextColor(255, 255, 255);
      doc.text('AVG AI CONFIDENCE:', 215, 44);
      doc.setFontSize(10);
      doc.setTextColor(168, 85, 247);
      doc.text(`${summary.averageConfidence}%`, 215, 49.5);

      let currentY = 58;

      // Render Captured Charts if available
      if (chartImages.length > 0) {
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(255, 255, 255);
        doc.text('THREAT INTELLIGENCE & DISTRIBUTION VISUALIZATIONS', 14, currentY);
        currentY += 4;

        const chartWidth = (pageWidth - 36) / Math.min(chartImages.length, 3);
        const chartHeight = 32;

        chartImages.slice(0, 3).forEach((imgData, idx) => {
          try {
            const xPos = 14 + idx * (chartWidth + 4);
            doc.addImage(imgData, 'PNG', xPos, currentY, chartWidth, chartHeight);
          } catch (err) {
            console.warn('Failed to embed chart image in PDF:', err);
          }
        });

        currentY += chartHeight + 6;
      }

      // Telemetry Data Table
      const formatted = formatTelemetryData(records);

      const head = [[
        'Detection ID',
        'Vector',
        'Sender / Source',
        'Payload',
        'Risk Level',
        'Risk Score',
        'AI Conf.',
        'Detection Time'
      ]];

      const body = formatted.map((r) => [
        r.detectionId,
        r.threatType,
        r.source,
        r.payload.length > 60 ? r.payload.substring(0, 57) + '...' : r.payload,
        r.threatLevel,
        r.riskScore,
        r.aiConfidence,
        r.detectionTime
      ]);

      autoTable(doc, {
        startY: currentY,
        head: head,
        body: body,
        theme: 'grid',
        headStyles: {
          fillColor: [15, 19, 33],
          textColor: [0, 218, 243],
          fontStyle: 'bold',
          fontSize: 8,
          halign: 'left',
        },
        bodyStyles: {
          textColor: [220, 225, 235],
          fontSize: 7.5,
          cellPadding: 2.2,
        },
        alternateRowStyles: {
          fillColor: [12, 16, 28],
        },
        styles: {
          fillColor: [8, 11, 22],
          lineColor: [35, 45, 68],
          lineWidth: 0.1,
          overflow: 'linebreak',
        },
        columnStyles: {
          0: { cellWidth: 26 }, // ID
          1: { cellWidth: 18 }, // Vector
          2: { cellWidth: 38 }, // Source
          3: { cellWidth: 88 }, // Payload
          4: { cellWidth: 22 }, // Level
          5: { cellWidth: 18 }, // Score
          6: { cellWidth: 18 }, // Confidence
          7: { cellWidth: 38 }, // Timestamp
        },
        didDrawPage: (data) => {
          const totalPages = (doc as any).internal.getNumberOfPages();
          const currentPage = data.pageNumber;

          // Footer Bar
          doc.setFillColor(10, 13, 26);
          doc.rect(0, pageHeight - 11, pageWidth, 11, 'F');

          doc.setFontSize(8);
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(140, 155, 175);
          doc.text(`Page ${currentPage} of ${totalPages}`, 14, pageHeight - 4.5);
          doc.text(
            `Generated by FinGuard AI • Confidential Report`,
            pageWidth - 14,
            pageHeight - 4.5,
            { align: 'right' }
          );
        },
      });

      const filename = generateExportFilename('pdf', 'Threat_Report');
      doc.save(filename);
      resolve();
    }, 200);
  });
}

/**
 * Export scan records to structured JSON file
 */
export async function exportToJSON(records: ScanResult[], filters?: ExportFilters): Promise<void> {
  if (!records || records.length === 0) {
    throw new Error('No data available to export.');
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      const summary = generateExecutiveSummary(records);

      const exportPayload = {
        $schema: 'https://finguard.ai/schemas/telemetry-export-v1.json',
        metadata: {
          system: 'FinGuard AI Cyber Threat Intelligence Engine',
          exportTimestamp: new Date().toISOString(),
          reportTitle: 'Raw Telemetry & Threat History Export',
          totalRecords: records.length,
          appliedFilters: {
            filterType: filters?.filterType || 'all',
            riskFilter: filters?.riskFilter || 'all',
            dateFilter: filters?.dateFilter || 'all',
            searchQuery: filters?.searchQuery || '',
            sortOrder: filters?.sortOrder || 'latest',
          },
          riskSummary: summary,
        },
        records: formatTelemetryData(records),
      };

      const jsonString = JSON.stringify(exportPayload, null, 2);
      const filename = generateExportFilename('json', 'Threat_History');
      downloadFile(jsonString, filename, 'application/json');
      resolve();
    }, 150);
  });
}

/**
 * Triggers printer-friendly view and window.print()
 */
export async function printReport(): Promise<void> {
  return new Promise((resolve) => {
    // Add print trigger delay so browser layout updates if needed
    setTimeout(() => {
      window.print();
      resolve();
    }, 100);
  });
}
