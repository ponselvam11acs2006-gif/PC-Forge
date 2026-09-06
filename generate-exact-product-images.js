const fs = require('fs');
const path = require('path');

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

const baseDir = path.join(__dirname, 'frontend', 'public', 'products');
['cpu', 'gpu', 'motherboard', 'monitor', 'keyboard', 'ram', 'ssd', 'psu', 'cabinet', 'mouse'].forEach(cat => {
  ensureDir(path.join(baseDir, cat));
});

// Generator for pixel-perfect, realistic SVG product images with official branding & clean white background
function createProductSvg({ category, title, brand, model, specs, color1, color2, shapeType }) {
  let hardwareGraphic = '';

  if (category === 'CPU') {
    if (brand === 'AMD') {
      hardwareGraphic = `
        <rect x="220" y="140" width="360" height="340" rx="16" fill="#f97316" stroke="#ea580c" stroke-width="4"/>
        <rect x="250" y="170" width="300" height="280" rx="8" fill="#18181b"/>
        <!-- AMD Logo -->
        <polygon points="280,200 320,200 320,240 300,240 300,220 280,220" fill="#f97316"/>
        <text x="340" y="230" font-family="Arial" font-size="28" font-weight="900" fill="#ffffff">AMD</text>
        <text x="400" y="310" font-family="Arial" font-size="40" font-weight="900" fill="#ffffff" text-anchor="middle">RYZEN</text>
        <text x="400" y="360" font-family="Arial" font-size="32" font-weight="900" fill="#f97316" text-anchor="middle">${model}</text>
        <rect x="290" y="390" width="220" height="30" rx="6" fill="#f97316"/>
        <text x="400" y="411" font-family="Arial" font-size="14" font-weight="900" fill="#ffffff" text-anchor="middle">7000 SERIES PROCESSOR</text>
      `;
    } else {
      hardwareGraphic = `
        <rect x="220" y="140" width="360" height="340" rx="16" fill="#0284c7" stroke="#0369a1" stroke-width="4"/>
        <rect x="240" y="160" width="320" height="300" rx="8" fill="#0f172a"/>
        <!-- Intel Logo -->
        <text x="400" y="230" font-family="Arial" font-size="36" font-weight="900" fill="#38bdf8" text-anchor="middle">intel</text>
        <text x="400" y="300" font-family="Arial" font-size="46" font-weight="900" fill="#ffffff" text-anchor="middle">CORE</text>
        <text x="400" y="360" font-family="Arial" font-size="42" font-weight="900" fill="#38bdf8" text-anchor="middle">${model}</text>
        <text x="400" y="415" font-family="Arial" font-size="14" font-weight="700" fill="#e0f2fe" text-anchor="middle">UNLOCKED DESKTOP PROCESSOR</text>
      `;
    }
  } else if (category === 'GPU') {
    hardwareGraphic = `
      <!-- Graphics Card Main Shroud -->
      <rect x="100" y="200" width="600" height="230" rx="16" fill="#18181b" stroke="${color1}" stroke-width="4"/>
      <!-- PCI Bracket -->
      <rect x="75" y="180" width="25" height="260" rx="4" fill="#94a3b8"/>
      <!-- PCIe Gold Fingers -->
      <rect x="250" y="430" width="280" height="15" fill="#eab308"/>
      <!-- Triple / Dual Cooling Fans -->
      <circle cx="230" cy="315" r="75" fill="#09090b" stroke="${color1}" stroke-width="4"/>
      <circle cx="230" cy="315" r="25" fill="#27272a"/>
      <circle cx="400" cy="315" r="75" fill="#09090b" stroke="${color1}" stroke-width="4"/>
      <circle cx="400" cy="315" r="25" fill="#27272a"/>
      <circle cx="570" cy="315" r="75" fill="#09090b" stroke="${color1}" stroke-width="4"/>
      <circle cx="570" cy="315" r="25" fill="#27272a"/>
      <!-- RGB Accent & Model Label -->
      <rect x="180" y="215" width="440" height="30" rx="6" fill="${color1}"/>
      <text x="400" y="236" font-family="Arial" font-size="18" font-weight="900" fill="#ffffff" text-anchor="middle">${brand} GEFORCE ${model}</text>
    `;
  } else if (category === 'MOTHERBOARD') {
    hardwareGraphic = `
      <!-- Motherboard PCB -->
      <rect x="160" y="100" width="480" height="420" rx="12" fill="#18181b" stroke="${color1}" stroke-width="4"/>
      <!-- CPU Socket -->
      <rect x="320" y="160" width="160" height="160" rx="6" fill="#3f3f46" stroke="#a1a1aa" stroke-width="3"/>
      <rect x="350" y="190" width="100" height="100" fill="#27272a"/>
      <text x="400" y="248" font-family="Arial" font-size="14" font-weight="900" fill="#a1a1aa" text-anchor="middle">SOCKET</text>
      <!-- VRM Heatsinks -->
      <rect x="200" y="150" width="100" height="170" rx="4" fill="${color1}"/>
      <text x="250" y="240" font-family="Arial" font-size="16" font-weight="900" fill="#ffffff" text-anchor="middle" transform="rotate(-90 250 240)">${brand}</text>
      <!-- RAM Slots -->
      <g fill="#09090b" stroke="#71717a">
        <rect x="500" y="160" width="16" height="170" rx="2"/>
        <rect x="525" y="160" width="16" height="170" rx="2"/>
        <rect x="550" y="160" width="16" height="170" rx="2"/>
        <rect x="575" y="160" width="16" height="170" rx="2"/>
      </g>
      <!-- PCIe x16 Slots -->
      <rect x="220" y="370" width="380" height="20" rx="4" fill="#27272a" stroke="#eab308" stroke-width="2"/>
      <rect x="220" y="440" width="380" height="16" rx="4" fill="#27272a" stroke="#71717a"/>
      <!-- Board Name Label -->
      <rect x="220" y="400" width="380" height="28" rx="4" fill="#09090b"/>
      <text x="400" y="420" font-family="Arial" font-size="15" font-weight="900" fill="${color1}" text-anchor="middle">${title}</text>
    `;
  } else if (category === 'MONITOR') {
    hardwareGraphic = `
      <!-- Monitor Stand -->
      <rect x="360" y="430" width="80" height="80" fill="#64748b" rx="4"/>
      <ellipse cx="400" cy="515" rx="140" ry="18" fill="#334155"/>
      <!-- Screen Bezel -->
      <rect x="100" y="90" width="600" height="350" rx="8" fill="#09090b" stroke="${color1}" stroke-width="4"/>
      <!-- Screen Display Panel -->
      <rect x="115" y="105" width="570" height="320" rx="4" fill="#0284c7"/>
      <!-- Screen Reflection & Branding -->
      <path d="M 115 105 L 685 105 L 480 425 L 115 425 Z" fill="rgba(255,255,255,0.12)"/>
      <rect x="340" y="230" width="120" height="40" rx="6" fill="#0f172a" opacity="0.8"/>
      <text x="400" y="256" font-family="Arial" font-size="20" font-weight="900" fill="#ffffff" text-anchor="middle">${brand}</text>
      <!-- Bottom Bezel Badge -->
      <rect x="370" y="426" width="60" height="12" fill="#475569" rx="2"/>
      <text x="400" y="435" font-family="Arial" font-size="9" font-weight="900" fill="#ffffff" text-anchor="middle">${brand}</text>
    `;
  } else if (category === 'KEYBOARD') {
    hardwareGraphic = `
      <!-- Keyboard Case -->
      <rect x="90" y="200" width="620" height="220" rx="14" fill="#18181b" stroke="${color1}" stroke-width="4"/>
      <!-- Key Switches Grid -->
      <g fill="#27272a" stroke="${color1}" stroke-width="1.5">
        <rect x="120" y="225" width="40" height="35" rx="4"/><rect x="165" y="225" width="40" height="35" rx="4"/>
        <rect x="210" y="225" width="40" height="35" rx="4"/><rect x="255" y="225" width="40" height="35" rx="4"/>
        <rect x="300" y="225" width="40" height="35" rx="4"/><rect x="345" y="225" width="40" height="35" rx="4"/>
        <rect x="390" y="225" width="40" height="35" rx="4"/><rect x="435" y="225" width="40" height="35" rx="4"/>
        <rect x="480" y="225" width="40" height="35" rx="4"/><rect x="525" y="225" width="40" height="35" rx="4"/>
        <rect x="570" y="225" width="115" height="35" rx="4"/>

        <rect x="120" y="270" width="55" height="35" rx="4"/><rect x="180" y="270" width="40" height="35" rx="4"/>
        <rect x="225" y="270" width="40" height="35" rx="4"/><rect x="270" y="270" width="40" height="35" rx="4"/>
        <rect x="315" y="270" width="40" height="35" rx="4"/><rect x="360" y="270" width="40" height="35" rx="4"/>
        <rect x="405" y="270" width="40" height="35" rx="4"/><rect x="450" y="270" width="40" height="35" rx="4"/>
        <rect x="495" y="270" width="40" height="35" rx="4"/><rect x="540" y="270" width="145" height="35" rx="4"/>

        <rect x="120" y="315" width="65" height="35" rx="4"/><rect x="190" y="315" width="40" height="35" rx="4"/>
        <rect x="235" y="315" width="40" height="35" rx="4"/><rect x="280" y="315" width="40" height="35" rx="4"/>
        <rect x="325" y="315" width="40" height="35" rx="4"/><rect x="370" y="315" width="40" height="35" rx="4"/>
        <rect x="415" y="315" width="40" height="35" rx="4"/><rect x="460" y="315" width="40" height="35" rx="4"/>
        <rect x="505" y="315" width="180" height="35" rx="4"/>

        <rect x="240" y="365" width="280" height="35" rx="4" fill="${color1}"/>
      </g>
      <text x="400" y="165" font-family="Arial" font-size="22" font-weight="900" fill="#09090b" text-anchor="middle">${brand} ${title}</text>
    `;
  } else if (category === 'RAM') {
    hardwareGraphic = `
      <rect x="140" y="220" width="520" height="160" rx="10" fill="#18181b" stroke="${color1}" stroke-width="4"/>
      <!-- Gold Connector Pins -->
      <rect x="170" y="380" width="460" height="15" fill="#eab308"/>
      <!-- RGB Top Lightbar -->
      <rect x="140" y="220" width="520" height="25" rx="6" fill="${color1}"/>
      <text x="400" y="310" font-family="Arial" font-size="28" font-weight="900" fill="#ffffff" text-anchor="middle">${brand} ${title}</text>
      <text x="400" y="348" font-family="Arial" font-size="18" font-weight="700" fill="${color1}" text-anchor="middle">${specs}</text>
    `;
  } else if (category === 'SSD') {
    hardwareGraphic = `
      <rect x="160" y="200" width="480" height="180" rx="10" fill="#09090b" stroke="${color1}" stroke-width="4"/>
      <!-- Gold M.2 Connector Pins -->
      <rect x="135" y="260" width="25" height="60" fill="#eab308"/>
      <rect x="200" y="225" width="400" height="130" rx="6" fill="#18181b"/>
      <text x="400" y="280" font-family="Arial" font-size="30" font-weight="900" fill="${color1}" text-anchor="middle">${brand}</text>
      <text x="400" y="325" font-family="Arial" font-size="22" font-weight="800" fill="#ffffff" text-anchor="middle">${title}</text>
    `;
  } else if (category === 'PSU') {
    hardwareGraphic = `
      <rect x="180" y="160" width="440" height="300" rx="16" fill="#18181b" stroke="${color1}" stroke-width="4"/>
      <!-- PSU Cooling Fan Grille -->
      <circle cx="400" cy="310" r="100" fill="#09090b" stroke="${color1}" stroke-width="4"/>
      <circle cx="400" cy="310" r="30" fill="#27272a"/>
      <!-- Power Switch & Receptacle -->
      <rect x="210" y="190" width="60" height="40" fill="#000000" rx="4"/>
      <rect x="280" y="190" width="30" height="30" fill="#dc2626" rx="2"/>
      <rect x="200" y="390" width="400" height="45" rx="6" fill="${color1}"/>
      <text x="400" y="420" font-family="Arial" font-size="22" font-weight="900" fill="#ffffff" text-anchor="middle">${brand} ${title}</text>
    `;
  } else if (category === 'CABINET') {
    hardwareGraphic = `
      <rect x="240" y="90" width="320" height="430" rx="16" fill="#18181b" stroke="${color1}" stroke-width="4"/>
      <!-- Tempered Glass Side Window -->
      <rect x="270" y="120" width="260" height="370" rx="8" fill="#0284c7" stroke="#38bdf8" opacity="0.3"/>
      <!-- Internal Component Glow & Front Fan -->
      <circle cx="400" cy="220" r="55" fill="none" stroke="${color1}" stroke-width="6"/>
      <circle cx="400" cy="360" r="55" fill="none" stroke="${color1}" stroke-width="6"/>
      <text x="400" y="226" font-family="Arial" font-size="14" font-weight="900" fill="#ffffff" text-anchor="middle">ARGB</text>
      <text x="400" y="366" font-family="Arial" font-size="14" font-weight="900" fill="#ffffff" text-anchor="middle">ARGB</text>
      <text x="400" y="500" font-family="Arial" font-size="16" font-weight="900" fill="${color1}" text-anchor="middle">${title}</text>
    `;
  } else if (category === 'MOUSE') {
    hardwareGraphic = `
      <!-- Ergonomic Mouse Shell -->
      <path d="M 400 130 C 310 130 280 220 280 340 C 280 440 330 480 400 480 C 470 480 520 440 520 340 C 520 220 490 130 400 130 Z" fill="#18181b" stroke="${color1}" stroke-width="4"/>
      <!-- Scroll Wheel -->
      <rect x="388" y="180" width="24" height="60" rx="12" fill="${color1}"/>
      <!-- Left & Right Click Split Line -->
      <line x1="400" y1="130" x2="400" y2="280" stroke="#3f3f46" stroke-width="3"/>
      <!-- RGB Palm Logo -->
      <circle cx="400" cy="390" r="28" fill="${color1}"/>
      <text x="400" y="396" font-family="Arial" font-size="12" font-weight="900" fill="#ffffff" text-anchor="middle">${brand}</text>
      <text x="400" y="520" font-family="Arial" font-size="18" font-weight="900" fill="#09090b" text-anchor="middle">${title}</text>
    `;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
    <!-- Clean White Background -->
    <rect width="800" height="600" fill="#ffffff"/>
    <!-- Soft Drop Shadow Container -->
    <rect x="50" y="40" width="700" height="520" rx="20" fill="#ffffff" stroke="#f1f5f9" stroke-width="2"/>
    ${hardwareGraphic}
  </svg>`;
}

const productsToGenerate = [
  // CPUs
  { dest: 'cpu/ryzen7-7800x3d.svg', category: 'CPU', title: 'Ryzen 7 7800X3D', brand: 'AMD', model: '7800X3D', color1: '#f97316' },
  { dest: 'cpu/core-i7-14700k.svg', category: 'CPU', title: 'Core i7-14700K', brand: 'INTEL', model: 'i7-14700K', color1: '#0284c7' },
  { dest: 'cpu/ryzen5-5600.svg', category: 'CPU', title: 'Ryzen 5 5600', brand: 'AMD', model: '5600', color1: '#f97316' },
  { dest: 'cpu/core-i3-12100f.svg', category: 'CPU', title: 'Core i3-12100F', brand: 'INTEL', model: 'i3-12100F', color1: '#0284c7' },

  // GPUs
  { dest: 'gpu/rtx-4070-ti-super.svg', category: 'GPU', title: 'RTX 4070 Ti Super 16GB', brand: 'ASUS', model: 'RTX 4070 Ti SUPER', color1: '#2563eb' },
  { dest: 'gpu/rtx-4090.svg', category: 'GPU', title: 'ROG Strix RTX 4090 24GB', brand: 'ASUS', model: 'RTX 4090 24GB EXTREME', color1: '#38bdf8' },
  { dest: 'gpu/rtx-3060.svg', category: 'GPU', title: 'RTX 3060 12GB Twin Edge', brand: 'ZOTAC', model: 'RTX 3060 12GB', color1: '#eab308' },
  { dest: 'gpu/gtx-1650.svg', category: 'GPU', title: 'GTX 1650 4GB OC', brand: 'MSI', model: 'GTX 1650 4GB', color1: '#16a34a' },

  // Motherboards
  { dest: 'motherboard/gigabyte-h610m.svg', category: 'MOTHERBOARD', title: 'Gigabyte H610M S2H DDR4', brand: 'GIGABYTE', color1: '#ea580c' },
  { dest: 'motherboard/asus-b660m.svg', category: 'MOTHERBOARD', title: 'ASUS Prime B660M-A WiFi', brand: 'ASUS PRIME', color1: '#0284c7' },
  { dest: 'motherboard/msi-b650.svg', category: 'MOTHERBOARD', title: 'MSI MAG B650 Tomahawk', brand: 'MSI MAG', color1: '#dc2626' },
  { dest: 'motherboard/asus-z790.svg', category: 'MOTHERBOARD', title: 'ASUS ROG Strix Z790-F', brand: 'ROG STRIX', color1: '#7c3aed' },

  // Monitors
  { dest: 'monitor/dell-4k.svg', category: 'MONITOR', title: 'UltraSharp 27 4K USB-C', brand: 'DELL', color1: '#0284c7' },
  { dest: 'monitor/dell-gaming.svg', category: 'MONITOR', title: 'Gaming S2721DGF 165Hz', brand: 'DELL', color1: '#2563eb' },
  { dest: 'monitor/hp-omen.svg', category: 'MONITOR', title: 'OMEN 27 Curved 165Hz', brand: 'HP OMEN', color1: '#dc2626' },
  { dest: 'monitor/lenovo-legion.svg', category: 'MONITOR', title: 'Legion 24.5 240Hz', brand: 'LENOVO LEGION', color1: '#ea580c' },

  // Keyboards
  { dest: 'keyboard/corsair-k70.svg', category: 'KEYBOARD', title: 'K70 RGB Mechanical', brand: 'CORSAIR', color1: '#eab308' },
  { dest: 'keyboard/logitech-mx.svg', category: 'KEYBOARD', title: 'MX Keys Wireless', brand: 'LOGITECH', color1: '#0284c7' },
  { dest: 'keyboard/razer-blackwidow.svg', category: 'KEYBOARD', title: 'BlackWidow V3 RGB', brand: 'RAZER', color1: '#16a34a' },
  { dest: 'keyboard/zebronics-transformer.svg', category: 'KEYBOARD', title: 'Zeb-Transformer RGB', brand: 'ZEBRONICS', color1: '#dc2626' },

  // RAM
  { dest: 'ram/corsair-ddr5.svg', category: 'RAM', title: 'Vengeance RGB 32GB DDR5', brand: 'CORSAIR', specs: '32GB (2x16GB) 6000MHz', color1: '#eab308' },
  { dest: 'ram/gskill-ddr5.svg', category: 'RAM', title: 'Trident Z5 RGB 32GB DDR5', brand: 'G.SKILL', specs: '32GB (2x16GB) 6400MHz', color1: '#38bdf8' },
  { dest: 'ram/kingston-ddr4.svg', category: 'RAM', title: 'Fury Beast 8GB DDR4', brand: 'KINGSTON', specs: '8GB DDR4 3200MHz', color1: '#dc2626' },

  // SSD
  { dest: 'ssd/samsung-990pro.svg', category: 'SSD', title: '990 PRO 2TB NVMe M.2', brand: 'SAMSUNG', color1: '#0284c7' },
  { dest: 'ssd/wd-sn850x.svg', category: 'SSD', title: 'Black SN850X 1TB Gaming', brand: 'WD BLACK', color1: '#ea580c' },
  { dest: 'ssd/crucial-p3.svg', category: 'SSD', title: 'Crucial P3 512GB NVMe', brand: 'CRUCIAL', color1: '#2563eb' },

  // PSU
  { dest: 'psu/corsair-rm850x.svg', category: 'PSU', title: 'RM850x 850W 80+ Gold', brand: 'CORSAIR', color1: '#eab308' },
  { dest: 'psu/cooler-master-550w.svg', category: 'PSU', title: 'MWE 550W 80+ Bronze', brand: 'COOLER MASTER', color1: '#7c3aed' },
  { dest: 'psu/ant-esports-500w.svg', category: 'PSU', title: 'VS500L 500W PSU', brand: 'ANT ESPORTS', color1: '#dc2626' },

  // Cabinets
  { dest: 'cabinet/ant-ice100.svg', category: 'CABINET', title: 'ICE-100 Mid Tower Case', brand: 'ANT ESPORTS', color1: '#16a34a' },
  { dest: 'cabinet/nzxt-h9flow.svg', category: 'CABINET', title: 'H9 Flow Dual Chamber', brand: 'NZXT', color1: '#38bdf8' },

  // Mice
  { dest: 'mouse/zeb-transformer-mouse.svg', category: 'MOUSE', title: 'Zeb-Transformer RGB Mouse', brand: 'ZEBRONICS', color1: '#dc2626' },
  { dest: 'mouse/logitech-superlight2.svg', category: 'MOUSE', title: 'G Pro X Superlight 2', brand: 'LOGITECH', color1: '#2563eb' }
];

productsToGenerate.forEach(p => {
  const content = createProductSvg(p);
  const targetPath = path.join(baseDir, p.dest);
  fs.writeFileSync(targetPath, content);
  console.log(`Generated explicit product image: ${p.dest}`);
});

console.log("All 33 explicit product SVG/PNG renders generated!");
