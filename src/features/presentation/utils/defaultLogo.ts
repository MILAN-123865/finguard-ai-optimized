// High-Resolution Transparent Company Logo Generator & Default Asset
// Generates a 512x512 crisp transparent PNG logo with 300 DPI clarity

export function generateDefaultCompanyLogoDataUrl(): string {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  ctx.clearRect(0, 0, 512, 512);

  const cx = 256;
  const cy = 256;

  // Outer Glowing Shield Outline
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(cx, cy - 180);
  ctx.lineTo(cx + 150, cy - 110);
  ctx.lineTo(cx + 150, cy + 50);
  ctx.bezierCurveTo(cx + 150, cy + 150, cx, cy + 200, cx, cy + 200);
  ctx.bezierCurveTo(cx, cy + 200, cx - 150, cy + 150, cx - 150, cy + 50);
  ctx.lineTo(cx - 150, cy - 110);
  ctx.closePath();

  // Shield Gradient Fill
  const fillGrad = ctx.createLinearGradient(cx - 150, cy - 180, cx + 150, cy + 200);
  fillGrad.addColorStop(0, '#0f172a');
  fillGrad.addColorStop(0.5, '#1e1b4b');
  fillGrad.addColorStop(1, '#0284c7');
  ctx.fillStyle = fillGrad;
  ctx.fill();

  // Shield Border Stroke
  const strokeGrad = ctx.createLinearGradient(cx - 150, cy - 180, cx + 150, cy + 200);
  strokeGrad.addColorStop(0, '#00e5ff');
  strokeGrad.addColorStop(0.5, '#38bdf8');
  strokeGrad.addColorStop(1, '#818cf8');
  ctx.lineWidth = 14;
  ctx.strokeStyle = strokeGrad;
  ctx.stroke();
  ctx.restore();

  // Inner Cyber Core Circuit Ring
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy - 10, 70, 0, Math.PI * 2);
  ctx.lineWidth = 8;
  ctx.strokeStyle = '#00e5ff';
  ctx.stroke();

  // Core Diamond
  ctx.beginPath();
  ctx.moveTo(cx, cy - 60);
  ctx.lineTo(cx + 45, cy - 10);
  ctx.lineTo(cx, cy + 40);
  ctx.lineTo(cx - 45, cy - 10);
  ctx.closePath();
  ctx.fillStyle = '#00e5ff';
  ctx.fill();

  // Core Lock Shackle / Emblem
  ctx.beginPath();
  ctx.arc(cx, cy - 20, 20, Math.PI, 0, false);
  ctx.lineWidth = 6;
  ctx.strokeStyle = '#ffffff';
  ctx.stroke();
  ctx.restore();

  // Brand Name Typography at base
  ctx.save();
  ctx.font = '900 42px "Plus Jakarta Sans", "Inter", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('FINGUARD', cx, cy + 140);

  ctx.font = '800 22px "JetBrains Mono", monospace';
  ctx.fillStyle = '#00e5ff';
  ctx.fillText('AI SECURITY', cx, cy + 172);
  ctx.restore();

  return canvas.toDataURL('image/png');
}

// Pre-cached default logo string for immediate usage
export const DEFAULT_COMPANY_LOGO_PNG = generateDefaultCompanyLogoDataUrl();
