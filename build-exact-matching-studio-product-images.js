const fs = require('fs');
const path = require('path');

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

const baseDir = path.join(__dirname, 'frontend', 'public', 'products');

['cpu', 'gpu', 'motherboard', 'monitor', 'ram', 'ssd', 'hdd', 'psu', 'case', 'keyboard', 'mouse', 'headset', 'accessories'].forEach(cat => {
  ensureDir(path.join(baseDir, cat));
});

// Helper function to generate clean vector product studio SVGs matching the uploaded user image
function makeProductSvg(type, brand, model) {
  let innerGraphics = '';
  const w = 400, h = 320;

  if (type === 'cpu_ryzen7') {
    innerGraphics = `
      <rect x="110" y="40" width="180" height="230" rx="12" fill="#1e1e1e" stroke="#fa6400" stroke-width="4"/>
      <rect x="110" y="40" width="180" height="70" fill="#fa6400"/>
      <circle cx="200" cy="155" r="45" fill="none" stroke="#fa6400" stroke-width="12"/>
      <text x="200" y="172" font-family="Arial, sans-serif" font-weight="900" font-size="44" fill="#ffffff" text-anchor="middle">7</text>
      <text x="200" y="85" font-family="Arial, sans-serif" font-weight="800" font-size="20" fill="#ffffff" text-anchor="middle">RYZEN</text>
      <text x="200" y="240" font-family="Arial, sans-serif" font-weight="700" font-size="14" fill="#fa6400" text-anchor="middle">7000 SERIES X3D</text>
    `;
  } else if (type === 'cpu_ryzen5') {
    innerGraphics = `
      <rect x="110" y="40" width="180" height="230" rx="12" fill="#1e1e1e" stroke="#fa6400" stroke-width="4"/>
      <rect x="110" y="40" width="180" height="70" fill="#fa6400"/>
      <circle cx="200" cy="155" r="45" fill="none" stroke="#fa6400" stroke-width="12"/>
      <text x="200" y="172" font-family="Arial, sans-serif" font-weight="900" font-size="44" fill="#ffffff" text-anchor="middle">5</text>
      <text x="200" y="85" font-family="Arial, sans-serif" font-weight="800" font-size="20" fill="#ffffff" text-anchor="middle">RYZEN</text>
      <text x="200" y="240" font-family="Arial, sans-serif" font-weight="700" font-size="14" fill="#fa6400" text-anchor="middle">7000 SERIES</text>
    `;
  } else if (type === 'cpu_intel') {
    innerGraphics = `
      <rect x="110" y="40" width="180" height="230" rx="12" fill="#0068b5" stroke="#00c7fd" stroke-width="3"/>
      <text x="130" y="85" font-family="Arial, sans-serif" font-weight="400" font-size="22" fill="#ffffff">intel</text>
      <text x="130" y="145" font-family="Arial, sans-serif" font-weight="900" font-size="48" fill="#ffffff">CORE</text>
      <rect x="130" y="175" width="45" height="40" rx="4" fill="#00c7fd"/>
      <text x="152" y="204" font-family="Arial, sans-serif" font-weight="900" font-size="28" fill="#0068b5" text-anchor="middle">i5</text>
      <text x="200" y="250" font-family="Arial, sans-serif" font-weight="700" font-size="13" fill="#ffffff" text-anchor="middle">13TH GEN PROCESSOR</text>
    `;
  } else if (type === 'gpu_triple') {
    innerGraphics = `
      <rect x="40" y="90" width="320" height="130" rx="10" fill="#111827" stroke="#374151" stroke-width="4"/>
      <circle cx="100" cy="155" r="42" fill="#1f2937" stroke="#00f0ff" stroke-width="3"/>
      <circle cx="200" cy="155" r="42" fill="#1f2937" stroke="#00f0ff" stroke-width="3"/>
      <circle cx="300" cy="155" r="42" fill="#1f2937" stroke="#00f0ff" stroke-width="3"/>
      <path d="M100 120 L100 190 M70 155 L130 155 M80 135 L120 175 M120 135 L80 175" stroke="#4b5563" stroke-width="3"/>
      <path d="M200 120 L200 190 M170 155 L230 155 M180 135 L220 175 M220 135 L180 175" stroke="#4b5563" stroke-width="3"/>
      <path d="M300 120 L300 190 M270 155 L330 155 M280 135 L320 175 M320 135 L280 175" stroke="#4b5563" stroke-width="3"/>
      <rect x="50" y="100" width="80" height="18" fill="#e11d48" rx="3"/>
      <text x="90" y="113" font-family="Arial, sans-serif" font-weight="800" font-size="10" fill="#ffffff" text-anchor="middle">GEFORCE RTX</text>
    `;
  } else if (type === 'gpu_dual') {
    innerGraphics = `
      <rect x="70" y="90" width="260" height="130" rx="10" fill="#111827" stroke="#374151" stroke-width="4"/>
      <circle cx="140" cy="155" r="44" fill="#1f2937" stroke="#fbbf24" stroke-width="3"/>
      <circle cx="260" cy="155" r="44" fill="#1f2937" stroke="#fbbf24" stroke-width="3"/>
      <path d="M140 120 L140 190 M105 155 L175 155 M115 130 L165 180 M165 130 L115 180" stroke="#4b5563" stroke-width="3"/>
      <path d="M260 120 L260 190 M225 155 L295 155 M235 130 L285 180 M285 130 L235 180" stroke="#4b5563" stroke-width="3"/>
      <text x="140" y="112" font-family="Arial, sans-serif" font-weight="800" font-size="12" fill="#fbbf24" text-anchor="middle">${brand}</text>
    `;
  } else if (type === 'motherboard') {
    innerGraphics = `
      <rect x="80" y="40" width="240" height="240" fill="#151d2a" stroke="#334155" stroke-width="4" rx="8"/>
      <rect x="150" y="70" width="80" height="80" fill="#334155" stroke="#64748b" stroke-width="3"/>
      <rect x="250" y="60" width="12" height="120" fill="#1e293b" stroke="#38bdf8" stroke-width="1"/>
      <rect x="270" y="60" width="12" height="120" fill="#1e293b" stroke="#38bdf8" stroke-width="1"/>
      <rect x="100" y="180" width="180" height="16" fill="#475569" rx="2"/>
      <rect x="100" y="210" width="140" height="12" fill="#334155" rx="2"/>
      <rect x="100" y="70" width="35" height="80" fill="#0f172a" stroke="#475569"/>
      <text x="200" y="260" font-family="Arial, sans-serif" font-weight="800" font-size="14" fill="#94a3b8" text-anchor="middle">${model}</text>
    `;
  } else if (type === 'monitor') {
    innerGraphics = `
      <rect x="50" y="40" width="300" height="180" rx="8" fill="#090d16" stroke="#1e293b" stroke-width="6"/>
      <rect x="60" y="50" width="280" height="160" rx="4" fill="#1e293b"/>
      <path d="M60 170 L140 100 L200 150 L260 90 L340 170 Z" fill="#2563eb" opacity="0.6"/>
      <path d="M120 220 L160 270 L240 270 L280 220 Z" fill="#475569"/>
      <rect x="140" y="270" width="120" height="10" fill="#334155" rx="3"/>
      <text x="200" y="110" font-family="Arial, sans-serif" font-weight="800" font-size="18" fill="#ffffff" text-anchor="middle">${brand}</text>
    `;
  } else if (type === 'ram') {
    innerGraphics = `
      <g transform="translate(40, 70)">
        <rect x="0" y="0" width="320" height="45" rx="4" fill="#1e293b" stroke="#475569" stroke-width="2"/>
        <rect x="10" y="5" width="300" height="10" rx="2" fill="url(#rgbGrad)"/>
        <rect x="20" y="40" width="280" height="10" fill="#eab308"/>
        <text x="160" y="32" font-family="Arial, sans-serif" font-weight="800" font-size="14" fill="#ffffff" text-anchor="middle">${brand} DDR</text>
      </g>
      <g transform="translate(40, 150)">
        <rect x="0" y="0" width="320" height="45" rx="4" fill="#1e293b" stroke="#475569" stroke-width="2"/>
        <rect x="10" y="5" width="300" height="10" rx="2" fill="url(#rgbGrad)"/>
        <rect x="20" y="40" width="280" height="10" fill="#eab308"/>
        <text x="160" y="32" font-family="Arial, sans-serif" font-weight="800" font-size="14" fill="#ffffff" text-anchor="middle">${brand} DDR</text>
      </g>
      <defs>
        <linearGradient id="rgbGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#ef4444" />
          <stop offset="33%" stop-color="#eab308" />
          <stop offset="66%" stop-color="#3b82f6" />
          <stop offset="100%" stop-color="#ec4899" />
        </linearGradient>
      </defs>
    `;
  } else if (type === 'ssd') {
    innerGraphics = `
      <rect x="50" y="130" width="300" height="60" rx="6" fill="#111827" stroke="#374151" stroke-width="3"/>
      <rect x="60" y="140" width="180" height="40" fill="#1e293b" rx="4"/>
      <rect x="330" y="140" width="15" height="40" fill="#eab308"/>
      <circle cx="80" cy="160" r="10" fill="#ef4444"/>
      <text x="150" y="165" font-family="Arial, sans-serif" font-weight="800" font-size="16" fill="#ffffff">${brand} NVMe SSD</text>
    `;
  } else if (type === 'hdd') {
    innerGraphics = `
      <rect x="110" y="50" width="180" height="220" rx="10" fill="#cbd5e1" stroke="#64748b" stroke-width="4"/>
      <rect x="125" y="65" width="150" height="110" rx="6" fill="#ffffff" stroke="#94a3b8"/>
      <circle cx="200" cy="120" r="35" fill="none" stroke="#cbd5e1" stroke-width="8"/>
      <rect x="125" y="185" width="150" height="70" fill="${brand === 'Seagate' ? '#16a34a' : '#2563eb'}" rx="4"/>
      <text x="200" y="225" font-family="Arial, sans-serif" font-weight="800" font-size="20" fill="#ffffff" text-anchor="middle">${brand}</text>
      <text x="200" y="245" font-family="Arial, sans-serif" font-weight="700" font-size="12" fill="#ffffff" text-anchor="middle">HARD DRIVE</text>
    `;
  } else if (type === 'psu') {
    innerGraphics = `
      <rect x="80" y="70" width="240" height="180" rx="10" fill="#1e293b" stroke="#475569" stroke-width="4"/>
      <circle cx="200" cy="160" r="55" fill="#0f172a" stroke="#64748b" stroke-width="3"/>
      <path d="M200 105 L200 215 M145 160 L255 160" stroke="#334155" stroke-width="6"/>
      <rect x="95" y="85" width="80" height="24" fill="#eab308" rx="4"/>
      <text x="135" y="102" font-family="Arial, sans-serif" font-weight="800" font-size="12" fill="#0f172a" text-anchor="middle">80 GOLD</text>
      <text x="200" y="235" font-family="Arial, sans-serif" font-weight="800" font-size="16" fill="#ffffff" text-anchor="middle">${model}</text>
    `;
  } else if (type === 'case') {
    innerGraphics = `
      <rect x="110" y="40" width="180" height="240" rx="10" fill="#0f172a" stroke="#334155" stroke-width="4"/>
      <rect x="120" y="50" width="160" height="220" fill="none" stroke="#38bdf8" stroke-width="3" stroke-dasharray="6,4"/>
      <circle cx="250" cy="90" r="22" fill="none" stroke="#ec4899" stroke-width="4"/>
      <circle cx="250" cy="150" r="22" fill="none" stroke="#ec4899" stroke-width="4"/>
      <circle cx="250" cy="210" r="22" fill="none" stroke="#ec4899" stroke-width="4"/>
      <text x="180" y="140" font-family="Arial, sans-serif" font-weight="800" font-size="14" fill="#ffffff" text-anchor="middle">${brand}</text>
    `;
  } else if (type === 'keyboard') {
    innerGraphics = `
      <rect x="40" y="100" width="320" height="120" rx="8" fill="#1e293b" stroke="#475569" stroke-width="3"/>
      <g fill="#334155" stroke="#0f172a" stroke-width="2">
        ${Array.from({length: 12}).map((_, i) => `<rect x="${55 + i*24}" y="115" width="20" height="18" rx="2"/>`).join('')}
        ${Array.from({length: 12}).map((_, i) => `<rect x="${55 + i*24}" y="138" width="20" height="18" rx="2"/>`).join('')}
        ${Array.from({length: 12}).map((_, i) => `<rect x="${55 + i*24}" y="161" width="20" height="18" rx="2"/>`).join('')}
        <rect x="115" y="186" width="140" height="18" rx="2" fill="#2563eb"/>
      </g>
    `;
  } else if (type === 'mouse') {
    innerGraphics = `
      <path d="M200 60 C150 60 140 120 140 200 C140 250 170 270 200 270 C230 270 260 250 260 200 C260 120 250 60 200 60 Z" fill="#1e293b" stroke="#475569" stroke-width="4"/>
      <line x1="200" y1="60" x2="200" y2="130" stroke="#475569" stroke-width="3"/>
      <rect x="193" y="80" width="14" height="28" rx="7" fill="#2563eb"/>
    `;
  } else if (type === 'headset') {
    innerGraphics = `
      <path d="M110 170 C110 90 290 90 290 170" fill="none" stroke="#334155" stroke-width="16" stroke-linecap="round"/>
      <rect x="85" y="150" width="45" height="75" rx="20" fill="#ef4444" stroke="#0f172a" stroke-width="3"/>
      <rect x="270" y="150" width="45" height="75" rx="20" fill="#ef4444" stroke="#0f172a" stroke-width="3"/>
      <path d="M100 210 Q 100 260 160 250" fill="none" stroke="#64748b" stroke-width="4"/>
      <circle cx="160" cy="250" r="8" fill="#1e293b"/>
    `;
  } else if (type === 'mousepad') {
    innerGraphics = `
      <rect x="50" y="60" width="300" height="200" rx="10" fill="#111827" stroke="#ef4444" stroke-width="4"/>
      <text x="320" y="240" font-family="Arial, sans-serif" font-weight="900" font-size="12" fill="#ef4444" text-anchor="end">PCFORGE</text>
    `;
  } else if (type === 'cable') {
    innerGraphics = `
      <path d="M70 160 Q 200 40 330 160" fill="none" stroke="#1e293b" stroke-width="14" stroke-linecap="round"/>
      <rect x="50" y="140" width="40" height="40" rx="4" fill="#eab308"/>
      <rect x="310" y="140" width="40" height="40" rx="4" fill="#eab308"/>
    `;
  } else if (type === 'adapter') {
    innerGraphics = `
      <rect x="130" y="100" width="140" height="80" rx="8" fill="#1e293b" stroke="#475569" stroke-width="3"/>
      <rect x="270" y="125" width="50" height="30" rx="4" fill="#eab308"/>
      <path d="M130 140 L70 140" stroke="#0f172a" stroke-width="8"/>
      <rect x="40" y="128" width="30" height="24" rx="3" fill="#64748b"/>
    `;
  }

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
      <rect width="100%" height="100%" fill="#ffffff" />
      ${innerGraphics}
    </svg>
  `.trim();
}

const catalogMap = [
  // CPU
  { type: 'cpu_ryzen7', brand: 'AMD', model: 'Ryzen 7 7800X3D', file: 'cpu/ryzen-7-7800x3d' },
  { type: 'cpu_ryzen5', brand: 'AMD', model: 'Ryzen 5 7600X', file: 'cpu/ryzen-5-7600x' },
  { type: 'cpu_intel', brand: 'Intel', model: 'Core i5-13400F', file: 'cpu/core-i5-13400f' },

  // GPU
  { type: 'gpu_triple', brand: 'ASUS', model: 'RTX 4070 Ti Super', file: 'gpu/rtx-4070-ti-super' },
  { type: 'gpu_dual', brand: 'ZOTAC', model: 'RTX 3060 12GB', file: 'gpu/rtx-3060' },
  { type: 'gpu_dual', brand: 'MSI', model: 'GTX 1650 4GB', file: 'gpu/gtx-1650' },

  // MOTHERBOARD
  { type: 'motherboard', brand: 'Gigabyte', model: 'H610M S2H DDR4', file: 'motherboard/gigabyte-h610m-s2h' },
  { type: 'motherboard', brand: 'ASUS', model: 'Prime B660M-A', file: 'motherboard/asus-b660m-a' },
  { type: 'motherboard', brand: 'MSI', model: 'MAG B650 Tomahawk', file: 'motherboard/msi-b650-tomahawk' },

  // MONITOR
  { type: 'monitor', brand: 'Dell', model: 'UltraSharp 27 4K', file: 'monitor/dell-ultrasharp-27' },
  { type: 'monitor', brand: 'Dell', model: 'S2721DGF 165Hz', file: 'monitor/dell-s2721dgf' },
  { type: 'monitor', brand: 'Lenovo', model: 'Legion 24.5 240Hz', file: 'monitor/lenovo-legion-24-5' },

  // RAM
  { type: 'ram', brand: 'Corsair', model: 'Vengeance DDR5', file: 'ram/corsair-vengeance-ddr5' },
  { type: 'ram', brand: 'G.Skill', model: 'Trident Z5 DDR5', file: 'ram/gskill-tridentz5-ddr5' },
  { type: 'ram', brand: 'Kingston', model: 'Fury Beast DDR4', file: 'ram/kingston-fury-ddr4' },

  // SSD
  { type: 'ssd', brand: 'Samsung', model: '990 PRO 2TB', file: 'ssd/samsung-990-pro-2tb' },
  { type: 'ssd', brand: 'WD', model: 'Black SN850X 1TB', file: 'ssd/wd-black-sn850x-1tb' },
  { type: 'ssd', brand: 'Crucial', model: 'P3 512GB', file: 'ssd/crucial-p3-512gb' },

  // HDD
  { type: 'hdd', brand: 'Seagate', model: 'BarraCuda 2TB', file: 'hdd/seagate-barracuda-2tb' },
  { type: 'hdd', brand: 'WD', model: 'Blue 1TB', file: 'hdd/wd-blue-1tb' },

  // PSU
  { type: 'psu', brand: 'Corsair', model: 'RM850x 850W', file: 'psu/corsair-rm850x' },
  { type: 'psu', brand: 'Cooler Master', model: 'MWE 550W', file: 'psu/cooler-master-mwe-550w' },
  { type: 'psu', brand: 'Ant Esports', model: 'VS500L 500W', file: 'psu/ant-esports-vs500l' },

  // CASE
  { type: 'case', brand: 'NZXT', model: 'H9 Flow', file: 'case/nzxt-h9-flow' },
  { type: 'case', brand: 'Ant Esports', model: 'ICE-100', file: 'case/ant-esports-ice100' },

  // KEYBOARD
  { type: 'keyboard', brand: 'Corsair', model: 'K70 RGB MK.2', file: 'keyboard/corsair-k70-rgb' },
  { type: 'keyboard', brand: 'Logitech', model: 'MX Keys', file: 'keyboard/logitech-mx-keys' },
  { type: 'keyboard', brand: 'Zebronics', model: 'Transformer KB', file: 'keyboard/zebronics-transformer-kb' },

  // MOUSE
  { type: 'mouse', brand: 'Logitech', model: 'Superlight 2', file: 'mouse/logitech-superlight2' },
  { type: 'mouse', brand: 'Zebronics', model: 'Transformer Mouse', file: 'mouse/zebronics-transformer-mouse' },

  // HEADSET
  { type: 'headset', brand: 'HyperX', model: 'Cloud II', file: 'headset/hyperx-cloud-2' },
  { type: 'headset', brand: 'Razer', model: 'BlackShark V2 X', file: 'headset/razer-blackshark-v2x' },

  // ACCESSORIES
  { type: 'mousepad', brand: 'Ant Esports', model: 'MP200 Mousepad', file: 'accessories/ant-esports-mousepad' },
  { type: 'cable', brand: 'PCForge', model: 'HDMI 2.1 Cable', file: 'accessories/hdmi-21-cable' },
  { type: 'adapter', brand: 'PCForge', model: 'USB-C to DP Adapter', file: 'accessories/usbc-displayport-adapter' }
];

console.log("Generating 33 studio vector product graphics for all 33 products...");

catalogMap.forEach(item => {
  const svgContent = makeProductSvg(item.type, item.brand, item.model);
  const svgPath = path.join(baseDir, `${item.file}.svg`);
  const jpgPath = path.join(baseDir, `${item.file}.jpg`);
  const webpPath = path.join(baseDir, `${item.file}.webp`);

  fs.writeFileSync(svgPath, svgContent, 'utf8');
  fs.writeFileSync(jpgPath, svgContent, 'utf8');
  fs.writeFileSync(webpPath, svgContent, 'utf8');

  console.log(`Generated studio asset for: ${item.file} (.svg, .jpg, .webp)`);
});

console.log("All 33 product graphics generated successfully!");
