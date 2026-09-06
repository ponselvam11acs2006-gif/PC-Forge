const fs = require('fs');
const path = require('path');
const https = require('https');

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

const baseDir = path.join(__dirname, 'frontend', 'public', 'products');

// Clean out existing old files to prevent cached stale images
function cleanDirectory(dir) {
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const curPath = path.join(dir, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        cleanDirectory(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    }
  }
}

['cpu', 'gpu', 'motherboard', 'monitor', 'keyboard', 'ram', 'ssd', 'psu', 'cabinet', 'mouse'].forEach(cat => {
  const catDir = path.join(baseDir, cat);
  cleanDirectory(catDir);
  ensureDir(catDir);
});

// Helper to generate a crisp, realistic SVG product image for any CPU, GPU, Motherboard, etc.
function generateRealisticProductPhoto({ category, name, brand, model, color, type }) {
  if (category === 'CPU') {
    if (brand === 'AMD') {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
        <rect width="600" height="600" fill="#ffffff"/>
        <!-- AMD Processor Box Surface -->
        <rect x="120" y="80" width="360" height="440" rx="20" fill="#111827" stroke="#f97316" stroke-width="6"/>
        <!-- Orange Side Stripe -->
        <path d="M 440 80 L 480 80 L 480 520 L 440 520 Z" fill="#f97316"/>
        <!-- AMD Square Icon -->
        <rect x="160" y="130" width="45" height="45" fill="#f97316" rx="4"/>
        <text x="220" y="165" font-family="Segoe UI, Helvetica, Arial" font-size="34" font-weight="900" fill="#ffffff">AMD</text>
        <!-- CPU Model Branding -->
        <text x="300" y="270" font-family="Segoe UI, Helvetica, Arial" font-size="48" font-weight="900" fill="#ffffff" text-anchor="middle">RYZEN</text>
        <text x="300" y="340" font-family="Segoe UI, Helvetica, Arial" font-size="44" font-weight="900" fill="#f97316" text-anchor="middle">${model}</text>
        <!-- Metallic Processor Chip Graphic -->
        <rect x="230" y="380" width="140" height="100" rx="8" fill="#d4d4d8" stroke="#a1a1aa" stroke-width="4"/>
        <rect x="260" y="405" width="80" height="50" rx="4" fill="#a1a1aa"/>
        <text x="300" y="435" font-family="Segoe UI, Helvetica, Arial" font-size="14" font-weight="900" fill="#18181b" text-anchor="middle">AMD RYZEN</text>
      </svg>`;
    } else {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
        <rect width="600" height="600" fill="#ffffff"/>
        <!-- Intel Processor Box Surface -->
        <rect x="120" y="80" width="360" height="440" rx="20" fill="#0284c7" stroke="#0369a1" stroke-width="6"/>
        <rect x="145" y="105" width="310" height="390" rx="12" fill="#0c4a6e"/>
        <!-- Intel Logo -->
        <text x="300" y="180" font-family="Segoe UI, Helvetica, Arial" font-size="44" font-weight="900" fill="#38bdf8" text-anchor="middle">intel</text>
        <text x="300" y="260" font-family="Segoe UI, Helvetica, Arial" font-size="52" font-weight="900" fill="#ffffff" text-anchor="middle">CORE</text>
        <text x="300" y="330" font-family="Segoe UI, Helvetica, Arial" font-size="46" font-weight="900" fill="#38bdf8" text-anchor="middle">${model}</text>
        <!-- Metallic Intel Processor Chip Graphic -->
        <rect x="230" y="375" width="140" height="95" rx="8" fill="#e0f2fe" stroke="#7dd3fc" stroke-width="4"/>
        <rect x="255" y="398" width="90" height="50" rx="4" fill="#38bdf8"/>
        <text x="300" y="428" font-family="Segoe UI, Helvetica, Arial" font-size="14" font-weight="900" fill="#0c4a6e" text-anchor="middle">INTEL CORE</text>
      </svg>`;
    }
  } else if (category === 'GPU') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
      <rect width="600" height="600" fill="#ffffff"/>
      <rect x="60" y="180" width="480" height="240" rx="16" fill="#18181b" stroke="${color}" stroke-width="5"/>
      <rect x="40" y="160" width="20" height="280" fill="#94a3b8" rx="4"/>
      <!-- Cooling Fans -->
      <circle cx="180" cy="300" r="75" fill="#09090b" stroke="${color}" stroke-width="4"/>
      <circle cx="180" cy="300" r="25" fill="#27272a"/>
      <circle cx="300" cy="300" r="75" fill="#09090b" stroke="${color}" stroke-width="4"/>
      <circle cx="300" cy="300" r="25" fill="#27272a"/>
      <circle cx="420" cy="300" r="75" fill="#09090b" stroke="${color}" stroke-width="4"/>
      <circle cx="420" cy="300" r="25" fill="#27272a"/>
      <rect x="120" y="200" width="360" height="30" rx="6" fill="${color}"/>
      <text x="300" y="222" font-family="Segoe UI, Helvetica, Arial" font-size="16" font-weight="900" fill="#ffffff" text-anchor="middle">${brand} GEFORCE ${model}</text>
    </svg>`;
  } else if (category === 'MOTHERBOARD') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
      <rect width="600" height="600" fill="#ffffff"/>
      <rect x="100" y="80" width="400" height="440" rx="12" fill="#18181b" stroke="${color}" stroke-width="4"/>
      <!-- CPU Socket -->
      <rect x="230" y="140" width="140" height="140" rx="6" fill="#3f3f46" stroke="#a1a1aa" stroke-width="3"/>
      <rect x="255" y="165" width="90" height="90" fill="#27272a"/>
      <!-- VRM Heatsink -->
      <rect x="130" y="130" width="80" height="150" rx="4" fill="${color}"/>
      <text x="170" y="210" font-family="Segoe UI, Helvetica, Arial" font-size="14" font-weight="900" fill="#ffffff" text-anchor="middle" transform="rotate(-90 170 210)">${brand}</text>
      <!-- RAM Slots -->
      <g fill="#09090b" stroke="#71717a">
        <rect x="390" y="140" width="14" height="150" rx="2"/>
        <rect x="410" y="140" width="14" height="150" rx="2"/>
        <rect x="430" y="140" width="14" height="150" rx="2"/>
        <rect x="450" y="140" width="14" height="150" rx="2"/>
      </g>
      <!-- PCIe Slots -->
      <rect x="160" y="340" width="310" height="18" rx="4" fill="#27272a" stroke="#eab308" stroke-width="2"/>
      <rect x="160" y="410" width="310" height="16" rx="4" fill="#27272a" stroke="#71717a"/>
      <rect x="160" y="370" width="310" height="26" rx="4" fill="#09090b"/>
      <text x="315" y="388" font-family="Segoe UI, Helvetica, Arial" font-size="14" font-weight="900" fill="${color}" text-anchor="middle">${name}</text>
    </svg>`;
  } else if (category === 'MONITOR') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
      <rect width="600" height="600" fill="#ffffff"/>
      <rect x="270" y="420" width="60" height="80" fill="#64748b" rx="4"/>
      <ellipse cx="300" cy="500" rx="120" ry="16" fill="#334155"/>
      <rect x="60" y="80" width="480" height="340" rx="8" fill="#09090b" stroke="${color}" stroke-width="4"/>
      <rect x="75" y="95" width="450" height="310" rx="4" fill="#0284c7"/>
      <rect x="240" y="220" width="120" height="40" rx="6" fill="#0f172a" opacity="0.85"/>
      <text x="300" y="246" font-family="Segoe UI, Helvetica, Arial" font-size="20" font-weight="900" fill="#ffffff" text-anchor="middle">${brand}</text>
    </svg>`;
  } else if (category === 'KEYBOARD') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
      <rect width="600" height="600" fill="#ffffff"/>
      <rect x="50" y="200" width="500" height="200" rx="14" fill="#18181b" stroke="${color}" stroke-width="4"/>
      <g fill="#27272a" stroke="${color}" stroke-width="1.5">
        <rect x="80" y="225" width="35" height="30" rx="4"/><rect x="120" y="225" width="35" height="30" rx="4"/>
        <rect x="160" y="225" width="35" height="30" rx="4"/><rect x="200" y="225" width="35" height="30" rx="4"/>
        <rect x="240" y="225" width="35" height="30" rx="4"/><rect x="280" y="225" width="35" height="30" rx="4"/>
        <rect x="320" y="225" width="35" height="30" rx="4"/><rect x="360" y="225" width="35" height="30" rx="4"/>
        <rect x="400" y="225" width="35" height="30" rx="4"/><rect x="440" y="225" width="80" height="30" rx="4"/>
        <rect x="180" y="350" width="240" height="30" rx="4" fill="${color}"/>
      </g>
      <text x="300" y="165" font-family="Segoe UI, Helvetica, Arial" font-size="22" font-weight="900" fill="#09090b" text-anchor="middle">${brand} ${name}</text>
    </svg>`;
  } else if (category === 'RAM') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
      <rect width="600" height="600" fill="#ffffff"/>
      <rect x="90" y="220" width="420" height="160" rx="10" fill="#18181b" stroke="${color}" stroke-width="4"/>
      <rect x="120" y="380" width="360" height="15" fill="#eab308"/>
      <rect x="90" y="220" width="420" height="25" rx="6" fill="${color}"/>
      <text x="300" y="310" font-family="Segoe UI, Helvetica, Arial" font-size="26" font-weight="900" fill="#ffffff" text-anchor="middle">${brand} ${name}</text>
    </svg>`;
  } else if (category === 'SSD') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
      <rect width="600" height="600" fill="#ffffff"/>
      <rect x="100" y="200" width="400" height="180" rx="10" fill="#09090b" stroke="${color}" stroke-width="4"/>
      <rect x="75" y="260" width="25" height="60" fill="#eab308"/>
      <text x="300" y="280" font-family="Segoe UI, Helvetica, Arial" font-size="28" font-weight="900" fill="${color}" text-anchor="middle">${brand}</text>
      <text x="300" y="325" font-family="Segoe UI, Helvetica, Arial" font-size="20" font-weight="800" fill="#ffffff" text-anchor="middle">${name}</text>
    </svg>`;
  } else if (category === 'PSU') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
      <rect width="600" height="600" fill="#ffffff"/>
      <rect x="120" y="140" width="360" height="320" rx="16" fill="#18181b" stroke="${color}" stroke-width="4"/>
      <circle cx="300" cy="300" r="90" fill="#09090b" stroke="${color}" stroke-width="4"/>
      <circle cx="300" cy="300" r="28" fill="#27272a"/>
      <rect x="140" y="410" width="320" height="35" rx="6" fill="${color}"/>
      <text x="300" y="434" font-family="Segoe UI, Helvetica, Arial" font-size="18" font-weight="900" fill="#ffffff" text-anchor="middle">${brand} ${name}</text>
    </svg>`;
  } else if (category === 'CABINET') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
      <rect width="600" height="600" fill="#ffffff"/>
      <rect x="160" y="80" width="280" height="440" rx="16" fill="#18181b" stroke="${color}" stroke-width="4"/>
      <rect x="190" y="110" width="220" height="380" rx="8" fill="#0284c7" opacity="0.3"/>
      <circle cx="300" cy="210" r="50" fill="none" stroke="${color}" stroke-width="5"/>
      <circle cx="300" cy="370" r="50" fill="none" stroke="${color}" stroke-width="5"/>
      <text x="300" y="500" font-family="Segoe UI, Helvetica, Arial" font-size="16" font-weight="900" fill="${color}" text-anchor="middle">${name}</text>
    </svg>`;
  } else if (category === 'MOUSE') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
      <rect width="600" height="600" fill="#ffffff"/>
      <path d="M 300 120 C 210 120 180 220 180 340 C 180 440 230 480 300 480 C 370 480 420 440 420 340 C 420 220 390 120 300 120 Z" fill="#18181b" stroke="${color}" stroke-width="4"/>
      <rect x="288" y="170" width="24" height="60" rx="12" fill="${color}"/>
      <circle cx="300" cy="380" r="24" fill="${color}"/>
      <text x="300" y="520" font-family="Segoe UI, Helvetica, Arial" font-size="18" font-weight="900" fill="#09090b" text-anchor="middle">${brand} ${name}</text>
    </svg>`;
  }
}

const productsToCreate = [
  // 4 CPUs (100% Explicit CPU Box Renders on Clean White Background)
  { file: 'cpu/ryzen-7-7800x3d.svg', category: 'CPU', name: 'Ryzen 7 7800X3D', brand: 'AMD', model: '7 7800X3D' },
  { file: 'cpu/core-i7-14700k.svg', category: 'CPU', name: 'Core i7-14700K', brand: 'Intel', model: 'i7 14700K' },
  { file: 'cpu/ryzen-5-5600.svg', category: 'CPU', name: 'Ryzen 5 5600', brand: 'AMD', model: '5 5600' },
  { file: 'cpu/core-i3-12100f.svg', category: 'CPU', name: 'Core i3-12100F', brand: 'Intel', model: 'i3 12100F' },

  // 4 GPUs
  { file: 'gpu/rtx-4070-ti-super.svg', category: 'GPU', name: 'RTX 4070 Ti Super', brand: 'ASUS', model: '4070 Ti SUPER', color: '#2563eb' },
  { file: 'gpu/rtx-4090.svg', category: 'GPU', name: 'ROG Strix RTX 4090', brand: 'ASUS', model: '4090 24GB', color: '#38bdf8' },
  { file: 'gpu/rtx-3060.svg', category: 'GPU', name: 'RTX 3060 12GB', brand: 'ZOTAC', model: '3060 12GB', color: '#eab308' },
  { file: 'gpu/gtx-1650.svg', category: 'GPU', name: 'GTX 1650 4GB', brand: 'MSI', model: 'GTX 1650', color: '#16a34a' },

  // 4 Motherboards
  { file: 'motherboard/gigabyte-h610m.svg', category: 'MOTHERBOARD', name: 'Gigabyte H610M S2H', brand: 'GIGABYTE', color: '#ea580c' },
  { file: 'motherboard/asus-b660m.svg', category: 'MOTHERBOARD', name: 'ASUS Prime B660M-A', brand: 'ASUS', color: '#0284c7' },
  { file: 'motherboard/msi-b650.svg', category: 'MOTHERBOARD', name: 'MSI MAG B650 Tomahawk', brand: 'MSI', color: '#dc2626' },
  { file: 'motherboard/asus-z790.svg', category: 'MOTHERBOARD', name: 'ASUS ROG Strix Z790-F', brand: 'ASUS ROG', color: '#7c3aed' },

  // 4 Monitors
  { file: 'monitor/dell-4k.svg', category: 'MONITOR', name: 'UltraSharp 27 4K', brand: 'DELL', color: '#0284c7' },
  { file: 'monitor/dell-gaming.svg', category: 'MONITOR', name: 'Gaming S2721DGF', brand: 'DELL', color: '#2563eb' },
  { file: 'monitor/hp-omen.svg', category: 'MONITOR', name: 'OMEN 27 Curved', brand: 'HP OMEN', color: '#dc2626' },
  { file: 'monitor/lenovo-legion.svg', category: 'MONITOR', name: 'Legion 24.5 240Hz', brand: 'LENOVO', color: '#ea580c' },

  // 4 Keyboards
  { file: 'keyboard/corsair-k70.svg', category: 'KEYBOARD', name: 'K70 RGB Mechanical', brand: 'CORSAIR', color: '#eab308' },
  { file: 'keyboard/logitech-mx.svg', category: 'KEYBOARD', name: 'MX Keys Wireless', brand: 'LOGITECH', color: '#0284c7' },
  { file: 'keyboard/razer-blackwidow.svg', category: 'KEYBOARD', name: 'BlackWidow V3 RGB', brand: 'RAZER', color: '#16a34a' },
  { file: 'keyboard/zebronics-transformer.svg', category: 'KEYBOARD', name: 'Zeb-Transformer RGB', brand: 'ZEBRONICS', color: '#dc2626' },

  // 3 RAM
  { file: 'ram/corsair-ddr5.svg', category: 'RAM', name: 'Vengeance RGB 32GB DDR5', brand: 'CORSAIR', color: '#eab308' },
  { file: 'ram/gskill-ddr5.svg', category: 'RAM', name: 'Trident Z5 RGB 32GB DDR5', brand: 'G.SKILL', color: '#38bdf8' },
  { file: 'ram/kingston-ddr4.svg', category: 'RAM', name: 'Fury Beast 8GB DDR4', brand: 'KINGSTON', color: '#dc2626' },

  // 3 SSDs
  { file: 'ssd/samsung-990pro.svg', category: 'SSD', name: '990 PRO 2TB NVMe', brand: 'SAMSUNG', color: '#0284c7' },
  { file: 'ssd/wd-sn850x.svg', category: 'SSD', name: 'Black SN850X 1TB', brand: 'WD BLACK', color: '#ea580c' },
  { file: 'ssd/crucial-p3.svg', category: 'SSD', name: 'P3 512GB NVMe', brand: 'CRUCIAL', color: '#2563eb' },

  // 3 PSUs
  { file: 'psu/corsair-rm850x.svg', category: 'PSU', name: 'RM850x 850W Gold', brand: 'CORSAIR', color: '#eab308' },
  { file: 'psu/cooler-master-550w.svg', category: 'PSU', name: 'MWE 550W Bronze', brand: 'COOLER MASTER', color: '#7c3aed' },
  { file: 'psu/ant-esports-500w.svg', category: 'PSU', name: 'VS500L 500W', brand: 'ANT ESPORTS', color: '#dc2626' },

  // 2 Cabinets
  { file: 'cabinet/ant-ice100.svg', category: 'CABINET', name: 'ICE-100 PC Case', brand: 'ANT ESPORTS', color: '#16a34a' },
  { file: 'cabinet/nzxt-h9flow.svg', category: 'CABINET', name: 'H9 Flow Case', brand: 'NZXT', color: '#38bdf8' },

  // 2 Mice
  { file: 'mouse/zeb-transformer-mouse.svg', category: 'MOUSE', name: 'Zeb-Transformer RGB', brand: 'ZEBRONICS', color: '#dc2626' },
  { file: 'mouse/logitech-superlight2.svg', category: 'MOUSE', name: 'G Pro X Superlight 2', brand: 'LOGITECH', color: '#2563eb' }
];

productsToCreate.forEach(p => {
  const content = generateRealisticProductPhoto(p);
  const target = path.join(baseDir, p.file);
  fs.writeFileSync(target, content);
  console.log(`Generated explicit hardware photo: ${p.file}`);
});

console.log("All clean product hardware photos generated!");
