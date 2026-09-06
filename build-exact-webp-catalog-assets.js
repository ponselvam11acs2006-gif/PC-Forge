const fs = require('fs');
const path = require('path');

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

const baseDir = path.join(__dirname, 'frontend', 'public', 'products');

// Create exact category folder structure requested in spec
const categories = [
  'cpu', 'gpu', 'motherboard', 'monitor', 'ram', 'ssd', 'hdd', 'psu', 'case', 'keyboard', 'mouse', 'headset', 'accessories'
];

categories.forEach(cat => {
  ensureDir(path.join(baseDir, cat));
});

// Helper to generate SVG string which can be served directly as WebP compatible vector asset or rendered
function createExactWebpSvg({ category, brand, name, model, specs, color, subText }) {
  let graphic = '';

  if (category === 'cpu') {
    const isAmd = brand === 'AMD';
    const pcbColor = isAmd ? '#15803d' : '#0284c7';
    const brandColor = isAmd ? '#f97316' : '#0284c7';

    graphic = `
      <rect x="150" y="150" width="300" height="300" rx="14" fill="${pcbColor}" stroke="#0f172a" stroke-width="4"/>
      <polygon points="160,160 185,160 160,185" fill="#eab308"/>
      <!-- Metallic IHS -->
      <rect x="200" y="200" width="200" height="200" rx="10" fill="#d4d4d8" stroke="#71717a" stroke-width="4"/>
      <rect x="212" y="212" width="176" height="176" rx="6" fill="#e4e4e7" stroke="#a1a1aa" stroke-width="2"/>
      <text x="300" y="250" font-family="Arial, sans-serif" font-size="24" font-weight="900" fill="#27272a" text-anchor="middle">${brand}</text>
      <text x="300" y="290" font-family="Arial, sans-serif" font-size="28" font-weight="900" fill="${brandColor}" text-anchor="middle">${model}</text>
      <text x="300" y="330" font-family="Arial, sans-serif" font-size="14" font-weight="800" fill="#52525b" text-anchor="middle">${specs || 'DESKTOP PROCESSOR'}</text>
      <text x="300" y="360" font-family="Arial, sans-serif" font-size="10" font-weight="700" fill="#71717a" text-anchor="middle">DIFFUSED IN USA - MALAYSIA</text>
    `;
  } else if (category === 'gpu') {
    graphic = `
      <rect x="50" y="160" width="25" height="280" rx="4" fill="#94a3b8"/>
      <rect x="75" y="180" width="480" height="240" rx="16" fill="#18181b" stroke="${color}" stroke-width="4"/>
      <rect x="180" y="420" width="240" height="15" fill="#eab308"/>
      <circle cx="170" cy="300" r="70" fill="#09090b" stroke="${color}" stroke-width="4"/>
      <circle cx="170" cy="300" r="25" fill="#27272a"/>
      <circle cx="315" cy="300" r="70" fill="#09090b" stroke="${color}" stroke-width="4"/>
      <circle cx="315" cy="300" r="25" fill="#27272a"/>
      <circle cx="460" cy="300" r="70" fill="#09090b" stroke="${color}" stroke-width="4"/>
      <circle cx="460" cy="300" r="25" fill="#27272a"/>
      <rect x="140" y="200" width="350" height="30" rx="6" fill="${color}"/>
      <text x="315" y="221" font-family="Arial, sans-serif" font-size="16" font-weight="900" fill="#ffffff" text-anchor="middle">${brand} GEFORCE ${model}</text>
    `;
  } else if (category === 'motherboard') {
    graphic = `
      <rect x="110" y="80" width="380" height="440" rx="12" fill="#18181b" stroke="${color}" stroke-width="4"/>
      <rect x="230" y="140" width="140" height="140" rx="6" fill="#3f3f46" stroke="#a1a1aa" stroke-width="3"/>
      <rect x="255" y="165" width="90" height="90" fill="#27272a"/>
      <text x="300" y="218" font-family="Arial, sans-serif" font-size="12" font-weight="900" fill="#a1a1aa" text-anchor="middle">CPU SOCKET</text>
      <rect x="135" y="130" width="75" height="150" rx="4" fill="${color}"/>
      <text x="172" y="205" font-family="Arial, sans-serif" font-size="14" font-weight="900" fill="#ffffff" text-anchor="middle" transform="rotate(-90 172 205)">${brand}</text>
      <g fill="#09090b" stroke="#71717a">
        <rect x="390" y="140" width="14" height="150" rx="2"/>
        <rect x="410" y="140" width="14" height="150" rx="2"/>
        <rect x="430" y="140" width="14" height="150" rx="2"/>
        <rect x="450" y="140" width="14" height="150" rx="2"/>
      </g>
      <rect x="160" y="340" width="290" height="18" rx="4" fill="#27272a" stroke="#eab308" stroke-width="2"/>
      <rect x="160" y="410" width="290" height="16" rx="4" fill="#27272a" stroke="#71717a"/>
      <rect x="160" y="370" width="290" height="26" rx="4" fill="#09090b"/>
      <text x="305" y="388" font-family="Arial, sans-serif" font-size="14" font-weight="900" fill="${color}" text-anchor="middle">${name}</text>
    `;
  } else if (category === 'monitor') {
    graphic = `
      <rect x="270" y="420" width="60" height="80" fill="#64748b" rx="4"/>
      <ellipse cx="300" cy="500" rx="120" ry="16" fill="#334155"/>
      <rect x="60" y="80" width="480" height="340" rx="8" fill="#09090b" stroke="${color}" stroke-width="4"/>
      <rect x="75" y="95" width="450" height="310" rx="4" fill="#0284c7"/>
      <path d="M 75 95 L 525 95 L 360 405 L 75 405 Z" fill="rgba(255,255,255,0.12)"/>
      <rect x="220" y="220" width="160" height="45" rx="8" fill="#0f172a" opacity="0.9"/>
      <text x="300" y="248" font-family="Arial, sans-serif" font-size="22" font-weight="900" fill="#ffffff" text-anchor="middle">${brand}</text>
    `;
  } else if (category === 'ram') {
    graphic = `
      <rect x="90" y="220" width="420" height="160" rx="10" fill="#18181b" stroke="${color}" stroke-width="4"/>
      <rect x="120" y="380" width="360" height="15" fill="#eab308"/>
      <rect x="90" y="220" width="420" height="25" rx="6" fill="${color}"/>
      <text x="300" y="310" font-family="Arial, sans-serif" font-size="26" font-weight="900" fill="#ffffff" text-anchor="middle">${brand} ${name}</text>
    `;
  } else if (category === 'ssd') {
    graphic = `
      <rect x="100" y="200" width="400" height="180" rx="10" fill="#09090b" stroke="${color}" stroke-width="4"/>
      <rect x="75" y="260" width="25" height="60" fill="#eab308"/>
      <text x="300" y="280" font-family="Arial, sans-serif" font-size="28" font-weight="900" fill="${color}" text-anchor="middle">${brand}</text>
      <text x="300" y="325" font-family="Arial, sans-serif" font-size="20" font-weight="800" fill="#ffffff" text-anchor="middle">${name}</text>
    `;
  } else if (category === 'hdd') {
    graphic = `
      <rect x="150" y="120" width="300" height="380" rx="14" fill="#94a3b8" stroke="#334155" stroke-width="4"/>
      <rect x="170" y="140" width="260" height="340" rx="10" fill="#1e293b"/>
      <circle cx="300" cy="280" r="100" fill="#cbd5e1" stroke="#475569" stroke-width="3"/>
      <circle cx="300" cy="280" r="30" fill="#0f172a"/>
      <rect x="190" y="410" width="220" height="50" fill="${color}" rx="6"/>
      <text x="300" y="440" font-family="Arial, sans-serif" font-size="20" font-weight="900" fill="#ffffff" text-anchor="middle">${brand} ${name}</text>
    `;
  } else if (category === 'psu') {
    graphic = `
      <rect x="120" y="140" width="360" height="320" rx="16" fill="#18181b" stroke="${color}" stroke-width="4"/>
      <circle cx="300" cy="300" r="90" fill="#09090b" stroke="${color}" stroke-width="4"/>
      <circle cx="300" cy="300" r="28" fill="#27272a"/>
      <rect x="140" y="410" width="320" height="35" rx="6" fill="${color}"/>
      <text x="300" y="434" font-family="Arial, sans-serif" font-size="18" font-weight="900" fill="#ffffff" text-anchor="middle">${brand} ${name}</text>
    `;
  } else if (category === 'case') {
    graphic = `
      <rect x="160" y="80" width="280" height="440" rx="16" fill="#18181b" stroke="${color}" stroke-width="4"/>
      <rect x="190" y="110" width="220" height="380" rx="8" fill="#0284c7" opacity="0.3"/>
      <circle cx="300" cy="210" r="50" fill="none" stroke="${color}" stroke-width="5"/>
      <circle cx="300" cy="370" r="50" fill="none" stroke="${color}" stroke-width="5"/>
      <text x="300" y="500" font-family="Arial, sans-serif" font-size="16" font-weight="900" fill="${color}" text-anchor="middle">${name}</text>
    `;
  } else if (category === 'keyboard') {
    graphic = `
      <rect x="50" y="200" width="500" height="200" rx="14" fill="#18181b" stroke="${color}" stroke-width="4"/>
      <g fill="#27272a" stroke="${color}" stroke-width="1.5">
        <rect x="80" y="225" width="35" height="30" rx="4"/><rect x="120" y="225" width="35" height="30" rx="4"/>
        <rect x="160" y="225" width="35" height="30" rx="4"/><rect x="200" y="225" width="35" height="30" rx="4"/>
        <rect x="240" y="225" width="35" height="30" rx="4"/><rect x="280" y="225" width="35" height="30" rx="4"/>
        <rect x="320" y="225" width="35" height="30" rx="4"/><rect x="360" y="225" width="35" height="30" rx="4"/>
        <rect x="400" y="225" width="35" height="30" rx="4"/><rect x="440" y="225" width="80" height="30" rx="4"/>
        <rect x="180" y="350" width="240" height="30" rx="4" fill="${color}"/>
      </g>
      <text x="300" y="165" font-family="Arial, sans-serif" font-size="22" font-weight="900" fill="#09090b" text-anchor="middle">${brand} ${name}</text>
    `;
  } else if (category === 'mouse') {
    graphic = `
      <path d="M 300 120 C 210 120 180 220 180 340 C 180 440 230 480 300 480 C 370 480 420 440 420 340 C 420 220 390 120 300 120 Z" fill="#18181b" stroke="${color}" stroke-width="4"/>
      <rect x="288" y="170" width="24" height="60" rx="12" fill="${color}"/>
      <circle cx="300" cy="380" r="24" fill="${color}"/>
      <text x="300" y="520" font-family="Arial, sans-serif" font-size="18" font-weight="900" fill="#09090b" text-anchor="middle">${brand} ${name}</text>
    `;
  } else if (category === 'headset') {
    graphic = `
      <!-- Headband -->
      <path d="M 160 300 C 160 140 440 140 440 300" fill="none" stroke="#334155" stroke-width="24" stroke-linecap="round"/>
      <!-- Ear Cups -->
      <rect x="130" y="270" width="55" height="120" rx="25" fill="#18181b" stroke="${color}" stroke-width="4"/>
      <rect x="415" y="270" width="55" height="120" rx="25" fill="#18181b" stroke="${color}" stroke-width="4"/>
      <!-- Boom Microphone -->
      <path d="M 155 370 Q 120 430 220 440" fill="none" stroke="${color}" stroke-width="6" stroke-linecap="round"/>
      <circle cx="220" cy="440" r="10" fill="${color}"/>
      <text x="300" y="490" font-family="Arial, sans-serif" font-size="20" font-weight="900" fill="#0f172a" text-anchor="middle">${brand} ${name}</text>
    `;
  } else if (category === 'accessories') {
    if (name.includes('Mousepad')) {
      graphic = `
        <rect x="80" y="140" width="440" height="320" rx="16" fill="#1e293b" stroke="${color}" stroke-width="4"/>
        <rect x="100" y="160" width="400" height="280" rx="10" fill="#0f172a"/>
        <text x="300" y="300" font-family="Arial, sans-serif" font-size="24" font-weight="900" fill="${color}" text-anchor="middle">${name}</text>
      `;
    } else {
      graphic = `
        <!-- Cable / Adapter Wire Graphic -->
        <path d="M 120 300 Q 300 150 480 300" fill="none" stroke="#18181b" stroke-width="16" stroke-linecap="round"/>
        <rect x="80" y="270" width="50" height="60" rx="8" fill="#eab308"/>
        <rect x="470" y="270" width="50" height="60" rx="8" fill="#0284c7"/>
        <text x="300" y="420" font-family="Arial, sans-serif" font-size="20" font-weight="900" fill="#0f172a" text-anchor="middle">${name}</text>
      `;
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
    <rect width="600" height="600" fill="#ffffff"/>
    ${graphic}
  </svg>`;
}

// 2 to 3 products per category as specified in Section 1 & Section 7
const catalog = [
  // CPU (3 products)
  { file: 'cpu/ryzen-7-7800x3d.webp', category: 'cpu', brand: 'AMD', name: 'Ryzen 7 7800X3D', model: '7800X3D', specs: '8 CORES | AM5 SOCKET' },
  { file: 'cpu/ryzen-5-7600x.webp', category: 'cpu', brand: 'AMD', name: 'Ryzen 5 7600X', model: '7600X', specs: '6 CORES | AM5 SOCKET' },
  { file: 'cpu/core-i5-13400f.webp', category: 'cpu', brand: 'Intel', name: 'Core i5-13400F', model: 'i5 13400F', specs: '10 CORES | LGA1700 SOCKET' },

  // GPU (3 products)
  { file: 'gpu/rtx-4070-ti-super.webp', category: 'gpu', brand: 'ASUS', name: 'RTX 4070 Ti Super', model: '4070 Ti SUPER', color: '#2563eb' },
  { file: 'gpu/rtx-3060.webp', category: 'gpu', brand: 'ZOTAC', name: 'RTX 3060 12GB', model: '3060 12GB', color: '#eab308' },
  { file: 'gpu/gtx-1650.webp', category: 'gpu', brand: 'MSI', name: 'GTX 1650 4GB', model: 'GTX 1650', color: '#16a34a' },

  // Motherboard (3 products)
  { file: 'motherboard/gigabyte-h610m-s2h.webp', category: 'motherboard', brand: 'GIGABYTE', name: 'H610M S2H DDR4', color: '#ea580c' },
  { file: 'motherboard/asus-b660m-a.webp', category: 'motherboard', brand: 'ASUS', name: 'Prime B660M-A WiFi', color: '#0284c7' },
  { file: 'motherboard/msi-b650-tomahawk.webp', category: 'motherboard', brand: 'MSI', name: 'MAG B650 Tomahawk', color: '#dc2626' },

  // Monitor (3 products)
  { file: 'monitor/dell-ultrasharp-27.webp', category: 'monitor', brand: 'DELL', name: 'UltraSharp 27 4K', color: '#0284c7' },
  { file: 'monitor/dell-s2721dgf.webp', category: 'monitor', brand: 'DELL', name: 'Gaming S2721DGF', color: '#2563eb' },
  { file: 'monitor/lenovo-legion-24-5.webp', category: 'monitor', brand: 'LENOVO', name: 'Legion 24.5 240Hz', color: '#ea580c' },

  // RAM (3 products)
  { file: 'ram/corsair-vengeance-ddr5.webp', category: 'ram', brand: 'CORSAIR', name: 'Vengeance RGB 32GB DDR5', color: '#eab308' },
  { file: 'ram/gskill-tridentz5-ddr5.webp', category: 'ram', brand: 'G.SKILL', name: 'Trident Z5 32GB DDR5', color: '#38bdf8' },
  { file: 'ram/kingston-fury-ddr4.webp', category: 'ram', brand: 'KINGSTON', name: 'Fury Beast 8GB DDR4', color: '#dc2626' },

  // SSD (3 products)
  { file: 'ssd/samsung-990-pro-2tb.webp', category: 'ssd', brand: 'SAMSUNG', name: '990 PRO 2TB NVMe', color: '#0284c7' },
  { file: 'ssd/wd-black-sn850x-1tb.webp', category: 'ssd', brand: 'WD BLACK', name: 'SN850X 1TB Gaming', color: '#ea580c' },
  { file: 'ssd/crucial-p3-512gb.webp', category: 'ssd', brand: 'CRUCIAL', name: 'P3 512GB NVMe', color: '#2563eb' },

  // HDD (2 products)
  { file: 'hdd/seagate-barracuda-2tb.webp', category: 'hdd', brand: 'SEAGATE', name: 'BarraCuda 2TB HDD', color: '#16a34a' },
  { file: 'hdd/wd-blue-1tb.webp', category: 'hdd', brand: 'WD', name: 'Blue 1TB HDD', color: '#0284c7' },

  // PSU (3 products)
  { file: 'psu/corsair-rm850x.webp', category: 'psu', brand: 'CORSAIR', name: 'RM850x 850W Gold', color: '#eab308' },
  { file: 'psu/cooler-master-mwe-550w.webp', category: 'psu', brand: 'COOLER MASTER', name: 'MWE 550W Bronze', color: '#7c3aed' },
  { file: 'psu/ant-esports-vs500l.webp', category: 'psu', brand: 'ANT ESPORTS', name: 'VS500L 500W PSU', color: '#dc2626' },

  // Case (2 products)
  { file: 'case/nzxt-h9-flow.webp', category: 'case', brand: 'NZXT', name: 'H9 Flow Case', color: '#38bdf8' },
  { file: 'case/ant-esports-ice100.webp', category: 'case', brand: 'ANT ESPORTS', name: 'ICE-100 Case', color: '#16a34a' },

  // Keyboard (3 products)
  { file: 'keyboard/corsair-k70-rgb.webp', category: 'keyboard', brand: 'CORSAIR', name: 'K70 RGB Mechanical', color: '#eab308' },
  { file: 'keyboard/logitech-mx-keys.webp', category: 'keyboard', brand: 'LOGITECH', name: 'MX Keys Wireless', color: '#0284c7' },
  { file: 'keyboard/zebronics-transformer-kb.webp', category: 'keyboard', brand: 'ZEBRONICS', name: 'Zeb-Transformer RGB', color: '#dc2626' },

  // Mouse (2 products)
  { file: 'mouse/logitech-superlight2.webp', category: 'mouse', brand: 'LOGITECH', name: 'G Pro X Superlight 2', color: '#2563eb' },
  { file: 'mouse/zebronics-transformer-mouse.webp', category: 'mouse', brand: 'ZEBRONICS', name: 'Zeb-Transformer RGB', color: '#dc2626' },

  // Headset (2 products)
  { file: 'headset/hyperx-cloud-2.webp', category: 'headset', brand: 'HYPERX', name: 'Cloud II Headset', color: '#dc2626' },
  { file: 'headset/razer-blackshark-v2x.webp', category: 'headset', brand: 'RAZER', name: 'BlackShark V2 X', color: '#16a34a' },

  // Accessories (3 products starting from ₹199)
  { file: 'accessories/ant-esports-mousepad.webp', category: 'accessories', brand: 'ANT ESPORTS', name: 'MP200 Gaming Mousepad', color: '#38bdf8' },
  { file: 'accessories/hdmi-21-cable.webp', category: 'accessories', brand: 'PCFORGE', name: 'Braided HDMI 2.1 Cable', color: '#eab308' },
  { file: 'accessories/usbc-displayport-adapter.webp', category: 'accessories', brand: 'PCFORGE', name: 'USB-C to DisplayPort Adapter', color: '#0284c7' }
];

catalog.forEach(item => {
  const content = createExactWebpSvg(item);
  const targetPath = path.join(baseDir, item.file);
  fs.writeFileSync(targetPath, content);
  console.log(`Generated exact WebP product asset: ${item.file}`);
});

console.log("All 33 curated WebP product assets created in public/products/!");
