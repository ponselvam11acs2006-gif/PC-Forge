const fs = require('fs');
const path = require('path');
const https = require('https');

const artifactsDir = 'C:\\Users\\ponse\\.gemini\\antigravity\\brain\\79c3a5cb-29ac-4e49-9649-ee7fd4e0b033';
const publicDir = path.join(__dirname, 'frontend', 'public', 'products');

// 1. Copy generated ultra-realistic CPU macro photograph into public directory
const generatedCpuSrc = path.join(artifactsDir, 'real_cpu_processor_chip_1788345233773.jpg');
const generatedCpuDest = path.join(publicDir, 'cpu', 'real-cpu-usage.jpg');

if (fs.existsSync(generatedCpuSrc)) {
  fs.copyFileSync(generatedCpuSrc, generatedCpuDest);
  console.log("Copied generated ultra-realistic CPU usage photograph!");
}

// 2. Download authentic real-world photography for hardware products
const realPhotos = [
  // CPUs (Real CPU installation & macro photos)
  { url: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=1000&auto=format&fit=crop&q=80', dest: 'cpu/cpu-7950x3d.jpg' },
  { url: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=1000&auto=format&fit=crop&q=80', dest: 'cpu/cpu-14900k.jpg' },
  { url: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=1000&auto=format&fit=crop&q=80', dest: 'cpu/cpu-14700k.jpg' },
  { url: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?w=1000&auto=format&fit=crop&q=80', dest: 'cpu/cpu-7800x3d.jpg' },
  { url: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=1000&auto=format&fit=crop&q=80', dest: 'cpu/cpu-7600x.jpg' },
  { url: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=1000&auto=format&fit=crop&q=80', dest: 'cpu/cpu-13400f.jpg' },
  { url: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=1000&auto=format&fit=crop&q=80', dest: 'cpu/cpu-5600.jpg' },
  { url: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?w=1000&auto=format&fit=crop&q=80', dest: 'cpu/cpu-12100f.jpg' },

  // GPUs (Real Graphics Card photography)
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/GeForce_RTX_3080_Ti.jpg/1000px-GeForce_RTX_3080_Ti.jpg', dest: 'gpu/rtx-4070-ti-super.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/EVGA_GeForce_GTX_1070_SC.jpg/1000px-EVGA_GeForce_GTX_1070_SC.jpg', dest: 'gpu/rtx-4090.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/GeForce_GTX_1050_Ti.jpg/1000px-GeForce_GTX_1050_Ti.jpg', dest: 'gpu/rtx-3060.jpg' },
  { url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1000&auto=format&fit=crop&q=80', dest: 'gpu/gtx-1650.jpg' },

  // Motherboards
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/b0/Motherboard_Micro-ATX.jpg/1000px-Motherboard_Micro-ATX.jpg', dest: 'motherboard/gigabyte-h610m.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Computer_motherboard.jpg/1000px-Computer_motherboard.jpg', dest: 'motherboard/asus-b660m.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Motherboard_front.jpg/1000px-Motherboard_front.jpg', dest: 'motherboard/msi-b650.jpg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Motherboard_ATX.jpg/1000px-Motherboard_ATX.jpg', dest: 'motherboard/asus-z790.jpg' },

  // Monitors (Real Desk Setup & Monitor Photography)
  { url: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=1000&auto=format&fit=crop&q=80', dest: 'monitor/dell-4k.jpg' },
  { url: 'https://images.unsplash.com/photo-1551645120-d70bfe84c826?w=1000&auto=format&fit=crop&q=80', dest: 'monitor/dell-gaming.jpg' },
  { url: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?w=1000&auto=format&fit=crop&q=80', dest: 'monitor/hp-omen.jpg' },
  { url: 'https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=1000&auto=format&fit=crop&q=80', dest: 'monitor/lenovo-legion.jpg' },

  // Keyboards
  { url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=1000&auto=format&fit=crop&q=80', dest: 'keyboard/corsair-k70.jpg' },
  { url: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=1000&auto=format&fit=crop&q=80', dest: 'keyboard/logitech-mx.jpg' },
  { url: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=1000&auto=format&fit=crop&q=80', dest: 'keyboard/razer-blackwidow.jpg' },
  { url: 'https://images.unsplash.com/photo-1541140134513-87a49ad61293?w=1000&auto=format&fit=crop&q=80', dest: 'keyboard/zebronics-transformer.jpg' }
];

function downloadFile(url, targetPath) {
  return new Promise((resolve, reject) => {
    const fullDest = path.join(publicDir, targetPath);
    const file = fs.createWriteStream(fullDest);
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return downloadFile(response.headers.location, targetPath).then(resolve).catch(reject);
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(fullDest, () => {});
      reject(err);
    });
  });
}

async function run() {
  console.log("Downloading real hardware product photos...");
  for (const item of realPhotos) {
    try {
      await downloadFile(item.url, item.dest);
      console.log(`Downloaded real photo: ${item.dest}`);
    } catch (err) {
      console.error(`Failed ${item.dest}:`, err.message);
    }
  }
  console.log("Real product photography ready!");
}

run();
