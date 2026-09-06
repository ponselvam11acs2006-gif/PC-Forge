const fs = require('fs');
const path = require('path');

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

const cpuDir = path.join(__dirname, 'frontend', 'public', 'products', 'cpu');
ensureDir(cpuDir);

// Generate physical metallic CPU chip package SVG (matching the Google share image reference)
function createPhysicalCpuChipSvg({ brand, model, family, gen, cores }) {
  const isAmd = brand === 'AMD';
  const pcbColor = isAmd ? '#15803d' : '#0284c7'; // AMD green substrate or Intel blue substrate
  const brandAccent = isAmd ? '#f97316' : '#0284c7';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
    <!-- Clean White Background -->
    <rect width="600" height="600" fill="#ffffff"/>
    
    <!-- Outer Substrate PCB (Green/Blue Square Chip Carrier) -->
    <rect x="110" y="110" width="380" height="380" rx="16" fill="${pcbColor}" stroke="#0f172a" stroke-width="4"/>
    
    <!-- Substrate Corner Alignment Triangles (Gold) -->
    <polygon points="120,120 145,120 120,145" fill="#eab308"/>
    
    <!-- Substrate Trace Circuit Grid lines -->
    <g stroke="rgba(255,255,255,0.15)" stroke-width="1.5">
      <line x1="110" y1="200" x2="190" y2="200"/>
      <line x1="110" y1="300" x2="190" y2="300"/>
      <line x1="110" y1="400" x2="190" y2="400"/>
      <line x1="410" y1="200" x2="490" y2="200"/>
      <line x1="410" y1="300" x2="490" y2="300"/>
      <line x1="410" y1="400" x2="490" y2="400"/>
      <line x1="200" y1="110" x2="200" y2="190"/>
      <line x1="300" y1="110" x2="300" y2="190"/>
      <line x1="400" y1="110" x2="400" y2="190"/>
      <line x1="200" y1="410" x2="200" y2="490"/>
      <line x1="300" y1="410" x2="300" y2="490"/>
      <line x1="400" y1="410" x2="400" y2="490"/>
    </g>

    <!-- Metallic Heat Spreader (IHS Steel Lid) -->
    <rect x="180" y="180" width="240" height="240" rx="12" fill="#d4d4d8" stroke="#71717a" stroke-width="5"/>
    <rect x="195" y="195" width="210" height="210" rx="8" fill="#e4e4e7" stroke="#a1a1aa" stroke-width="2"/>
    
    <!-- Metallic Bevel Lighting Accent -->
    <path d="M 180 180 L 420 180 L 395 195 L 195 195 Z" fill="#f4f4f5"/>
    <path d="M 180 180 L 180 420 L 195 395 L 195 195 Z" fill="#fafafa"/>

    <!-- Engraved Brand Logo & Model Label -->
    <text x="300" y="240" font-family="Segoe UI, Arial, sans-serif" font-size="28" font-weight="900" fill="#27272a" text-anchor="middle">${brand}</text>
    <text x="300" y="280" font-family="Segoe UI, Arial, sans-serif" font-size="34" font-weight="900" fill="${brandAccent}" text-anchor="middle">${family}</text>
    <text x="300" y="325" font-family="Segoe UI, Arial, sans-serif" font-size="26" font-weight="800" fill="#18181b" text-anchor="middle">${model}</text>
    <text x="300" y="360" font-family="Segoe UI, Arial, sans-serif" font-size="14" font-weight="700" fill="#52525b" text-anchor="middle">${cores} CORES | ${gen}</text>
    <text x="300" y="385" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="600" fill="#71717a" text-anchor="middle">MALAYSIA DIFFUSED IN USA</text>

    <!-- Substrate Capacitor Micro-Pads -->
    <g fill="#eab308">
      <rect x="135" y="150" width="8" height="14"/>
      <rect x="150" y="150" width="8" height="14"/>
      <rect x="165" y="150" width="8" height="14"/>
      <rect x="425" y="150" width="8" height="14"/>
      <rect x="440" y="150" width="8" height="14"/>
      <rect x="455" y="150" width="8" height="14"/>
      <rect x="135" y="436" width="8" height="14"/>
      <rect x="150" y="436" width="8" height="14"/>
      <rect x="165" y="436" width="8" height="14"/>
      <rect x="425" y="436" width="8" height="14"/>
      <rect x="440" y="436" width="8" height="14"/>
      <rect x="455" y="436" width="8" height="14"/>
    </g>
  </svg>`;
}

const cpus = [
  { file: 'cpu-7950x3d.svg', brand: 'AMD', family: 'RYZEN 9', model: '7950X3D', gen: 'AM5 SOCKET', cores: '16' },
  { file: 'cpu-7800x3d.svg', brand: 'AMD', family: 'RYZEN 7', model: '7800X3D', gen: 'AM5 SOCKET', cores: '8' },
  { file: 'cpu-7600x.svg', brand: 'AMD', family: 'RYZEN 5', model: '7600X', gen: 'AM5 SOCKET', cores: '6' },
  { file: 'cpu-5600.svg', brand: 'AMD', family: 'RYZEN 5', model: '5600', gen: 'AM4 SOCKET', cores: '6' },

  { file: 'cpu-14900k.svg', brand: 'INTEL', family: 'CORE i9', model: '14900K', gen: 'LGA1700 SOCKET', cores: '24' },
  { file: 'cpu-14700k.svg', brand: 'INTEL', family: 'CORE i7', model: '14700K', gen: 'LGA1700 SOCKET', cores: '20' },
  { file: 'cpu-13400f.svg', brand: 'INTEL', family: 'CORE i5', model: '13400F', gen: 'LGA1700 SOCKET', cores: '10' },
  { file: 'cpu-12100f.svg', brand: 'INTEL', family: 'CORE i3', model: '12100F', gen: 'LGA1700 SOCKET', cores: '4' }
];

cpus.forEach(cpu => {
  const svgContent = createPhysicalCpuChipSvg(cpu);
  const target = path.join(cpuDir, cpu.file);
  fs.writeFileSync(target, svgContent);
  console.log(`Generated physical CPU chip photo: ${cpu.file}`);
});

console.log("All 8 physical CPU chip images generated!");
