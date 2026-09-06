const fs = require('fs');
const path = require('path');

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

const baseDir = path.join(__dirname, 'frontend', 'public', 'products');
ensureDir(path.join(baseDir, 'monitor'));
ensureDir(path.join(baseDir, 'keyboard'));
ensureDir(path.join(baseDir, 'cpu'));
ensureDir(path.join(baseDir, 'gpu'));
ensureDir(path.join(baseDir, 'ram'));
ensureDir(path.join(baseDir, 'ssd'));

// Dell Monitor SVG
const dellSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <rect width="800" height="600" fill="#ffffff"/>
  <!-- Stand -->
  <rect x="360" y="440" width="80" height="70" fill="#94a3b8" rx="4"/>
  <ellipse cx="400" cy="510" rx="140" ry="18" fill="#64748b"/>
  <!-- Monitor Frame -->
  <rect x="120" y="100" width="560" height="340" rx="8" fill="#0f172a" stroke="#38bdf8" stroke-width="4"/>
  <rect x="135" y="115" width="530" height="310" rx="4" fill="#0284c7"/>
  <!-- Screen Glow -->
  <path d="M 135 115 L 665 115 L 500 425 L 135 425 Z" fill="rgba(255,255,255,0.15)"/>
  <!-- Dell Logo -->
  <circle cx="400" cy="460" r="12" fill="#0284c7"/>
  <text x="400" y="465" font-family="Arial" font-size="12" font-weight="900" fill="#ffffff" text-anchor="middle">DELL</text>
  <text x="400" y="270" font-family="Arial" font-size="28" font-weight="900" fill="#ffffff" text-anchor="middle">DELL ULTRASHARP 27" 4K</text>
</svg>`;

// HP Monitor SVG
const hpSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <rect width="800" height="600" fill="#ffffff"/>
  <!-- Stand -->
  <rect x="375" y="420" width="50" height="90" fill="#cbd5e1" rx="4"/>
  <rect x="280" y="500" width="240" height="15" fill="#475569" rx="6"/>
  <!-- Curved Frame -->
  <rect x="100" y="110" width="600" height="320" rx="12" fill="#1e293b" stroke="#3b82f6" stroke-width="3"/>
  <rect x="115" y="125" width="570" height="290" rx="6" fill="#1e1b4b"/>
  <!-- HP Logo -->
  <text x="400" y="450" font-family="Arial" font-size="16" font-weight="900" fill="#2563eb" text-anchor="middle">hp</text>
  <text x="400" y="270" font-family="Arial" font-size="28" font-weight="900" fill="#a5b4fc" text-anchor="middle">HP OMEN 27" CURVED 165Hz</text>
</svg>`;

// Lenovo Monitor SVG
const lenovoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <rect width="800" height="600" fill="#ffffff"/>
  <!-- Stand -->
  <polygon points="340,510 460,510 420,430 380,430" fill="#dc2626"/>
  <!-- Frame -->
  <rect x="110" y="90" width="580" height="340" rx="10" fill="#0f172a" stroke="#ef4444" stroke-width="4"/>
  <rect x="125" y="105" width="550" height="310" rx="4" fill="#0f172a"/>
  <!-- Lenovo Brand Tag -->
  <rect x="130" y="405" width="60" height="20" fill="#dc2626"/>
  <text x="160" y="420" font-family="Arial" font-size="11" font-weight="900" fill="#ffffff" text-anchor="middle">Lenovo</text>
  <text x="400" y="270" font-family="Arial" font-size="28" font-weight="900" fill="#fca5a5" text-anchor="middle">LENOVO LEGION 24.5" 240Hz</text>
</svg>`;

// Mechanical Keyboard SVG
const mechKeyboardSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <rect width="800" height="600" fill="#ffffff"/>
  <!-- Keyboard Base -->
  <rect x="100" y="200" width="600" height="220" rx="16" fill="#0f172a" stroke="#2563eb" stroke-width="4"/>
  <!-- RGB Keys Simulation -->
  <g fill="#1e293b" stroke="#38bdf8" stroke-width="2">
    <rect x="130" y="230" width="40" height="35" rx="4"/>
    <rect x="180" y="230" width="40" height="35" rx="4"/>
    <rect x="230" y="230" width="40" height="35" rx="4"/>
    <rect x="280" y="230" width="40" height="35" rx="4"/>
    <rect x="330" y="230" width="40" height="35" rx="4"/>
    <rect x="380" y="230" width="40" height="35" rx="4"/>
    <rect x="430" y="230" width="40" height="35" rx="4"/>
    <rect x="480" y="230" width="40" height="35" rx="4"/>
    <rect x="530" y="230" width="40" height="35" rx="4"/>
    <rect x="580" y="230" width="80" height="35" rx="4"/>

    <rect x="130" y="280" width="50" height="35" rx="4"/>
    <rect x="190" y="280" width="40" height="35" rx="4"/>
    <rect x="240" y="280" width="40" height="35" rx="4"/>
    <rect x="290" y="280" width="40" height="35" rx="4"/>
    <rect x="340" y="280" width="40" height="35" rx="4"/>
    <rect x="390" y="280" width="40" height="35" rx="4"/>
    <rect x="440" y="280" width="40" height="35" rx="4"/>
    <rect x="490" y="280" width="40" height="35" rx="4"/>
    <rect x="540" y="280" width="120" height="35" rx="4"/>

    <rect x="250" y="340" width="300" height="35" rx="4" fill="#2563eb"/>
  </g>
  <text x="400" y="160" font-family="Arial" font-size="26" font-weight="900" fill="#0f172a" text-anchor="middle">CORSAIR K70 RGB MECHANICAL KEYBOARD</text>
</svg>`;

// Wireless Keyboard SVG
const wirelessKeyboardSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <rect width="800" height="600" fill="#ffffff"/>
  <rect x="120" y="220" width="560" height="180" rx="12" fill="#e2e8f0" stroke="#64748b" stroke-width="3"/>
  <g fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5">
    <rect x="140" y="240" width="35" height="30" rx="4"/>
    <rect x="185" y="240" width="35" height="30" rx="4"/>
    <rect x="230" y="240" width="35" height="30" rx="4"/>
    <rect x="275" y="240" width="35" height="30" rx="4"/>
    <rect x="320" y="240" width="35" height="30" rx="4"/>
    <rect x="365" y="240" width="35" height="30" rx="4"/>
    <rect x="410" y="240" width="35" height="30" rx="4"/>
    <rect x="455" y="240" width="35" height="30" rx="4"/>
    <rect x="500" y="240" width="35" height="30" rx="4"/>
    <rect x="545" y="240" width="110" height="30" rx="4"/>

    <rect x="240" y="345" width="280" height="30" rx="4" fill="#000000"/>
  </g>
  <text x="400" y="170" font-family="Arial" font-size="26" font-weight="900" fill="#0f172a" text-anchor="middle">LOGITECH MX KEYS WIRELESS KEYBOARD</text>
</svg>`;

// i3 CPU SVG
const i3CpuSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <rect width="800" height="600" fill="#ffffff"/>
  <rect x="250" y="150" width="300" height="300" rx="20" fill="#0284c7" stroke="#0369a1" stroke-width="4"/>
  <text x="400" y="280" font-family="Arial" font-size="44" font-weight="900" fill="#ffffff" text-anchor="middle">intel</text>
  <text x="400" y="350" font-family="Arial" font-size="52" font-weight="900" fill="#ffffff" text-anchor="middle">CORE i3</text>
  <text x="400" y="400" font-family="Arial" font-size="22" font-weight="700" fill="#bae6fd" text-anchor="middle">12100F Processor</text>
</svg>`;

// GTX 1650 GPU SVG
const gtx1650Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <rect width="800" height="600" fill="#ffffff"/>
  <rect x="200" y="180" width="400" height="240" rx="16" fill="#1e293b" stroke="#16a34a" stroke-width="4"/>
  <circle cx="330" cy="300" r="65" fill="#0f172a" stroke="#16a34a" stroke-width="3"/>
  <circle cx="470" cy="300" r="65" fill="#0f172a" stroke="#16a34a" stroke-width="3"/>
  <text x="400" y="130" font-family="Arial" font-size="28" font-weight="900" fill="#0f172a" text-anchor="middle">MSI GEFORCE GTX 1650 4GB OC</text>
</svg>`;

// RTX 4090 GPU SVG
const rtx4090Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <rect width="800" height="600" fill="#ffffff"/>
  <rect x="120" y="160" width="560" height="280" rx="20" fill="#0f172a" stroke="#38bdf8" stroke-width="5"/>
  <circle cx="240" cy="300" r="75" fill="#1e293b" stroke="#38bdf8" stroke-width="4"/>
  <circle cx="400" cy="300" r="75" fill="#1e293b" stroke="#38bdf8" stroke-width="4"/>
  <circle cx="560" cy="300" r="75" fill="#1e293b" stroke="#38bdf8" stroke-width="4"/>
  <text x="400" y="110" font-family="Arial" font-size="30" font-weight="900" fill="#0f172a" text-anchor="middle">ASUS ROG STRIX RTX 4090 24GB EXTREME</text>
</svg>`;

// Kingston Fury RAM SVG
const kingstonRamSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <rect width="800" height="600" fill="#ffffff"/>
  <rect x="160" y="240" width="480" height="140" rx="10" fill="#1e293b" stroke="#ef4444" stroke-width="4"/>
  <text x="400" y="310" font-family="Arial" font-size="32" font-weight="900" fill="#ffffff" text-anchor="middle">KINGSTON FURY BEAST</text>
  <text x="400" y="350" font-family="Arial" font-size="20" font-weight="700" fill="#fca5a5" text-anchor="middle">8GB DDR4 3200MHz</text>
</svg>`;

// Crucial P3 SSD SVG
const crucialSsdSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <rect width="800" height="600" fill="#ffffff"/>
  <rect x="160" y="220" width="480" height="160" rx="12" fill="#0f172a" stroke="#2563eb" stroke-width="4"/>
  <text x="400" y="290" font-family="Arial" font-size="34" font-weight="900" fill="#60a5fa" text-anchor="middle">CRUCIAL P3 NVMe</text>
  <text x="400" y="340" font-family="Arial" font-size="22" font-weight="700" fill="#ffffff" text-anchor="middle">512GB PCIe 3.0 M.2 SSD</text>
</svg>`;

// Write all SVGs to files
fs.writeFileSync(path.join(baseDir, 'monitor', 'dell-monitor.svg'), dellSvg);
fs.writeFileSync(path.join(baseDir, 'monitor', 'hp-monitor.svg'), hpSvg);
fs.writeFileSync(path.join(baseDir, 'monitor', 'lenovo-monitor.svg'), lenovoSvg);
fs.writeFileSync(path.join(baseDir, 'monitor', 'monitor.svg'), dellSvg);

fs.writeFileSync(path.join(baseDir, 'keyboard', 'mechanical-rgb.svg'), mechKeyboardSvg);
fs.writeFileSync(path.join(baseDir, 'keyboard', 'wireless-slim.svg'), wirelessKeyboardSvg);
fs.writeFileSync(path.join(baseDir, 'keyboard', 'keyboard.svg'), mechKeyboardSvg);

fs.writeFileSync(path.join(baseDir, 'cpu', 'core-i3-12100f.svg'), i3CpuSvg);
fs.writeFileSync(path.join(baseDir, 'gpu', 'gtx-1650.svg'), gtx1650Svg);
fs.writeFileSync(path.join(baseDir, 'gpu', 'rtx-4090.svg'), rtx4090Svg);
fs.writeFileSync(path.join(baseDir, 'ram', 'kingston-fury.svg'), kingstonRamSvg);
fs.writeFileSync(path.join(baseDir, 'ssd', 'crucial-p3.svg'), crucialSsdSvg);

console.log("All unique product vector images created successfully!");
