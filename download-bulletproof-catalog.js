const fs = require('fs');
const path = require('path');
const https = require('https');

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

const baseDir = path.join(__dirname, 'frontend', 'public', 'products');
const categories = ['cpu', 'gpu', 'motherboard', 'monitor', 'keyboard', 'ram', 'ssd', 'psu', 'cabinet', 'mouse'];
categories.forEach(cat => ensureDir(path.join(baseDir, cat)));

// Bulletproof high-res studio photographs on clean white backgrounds from Unsplash CDN
const downloads = [
  // CPUs
  { url: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&auto=format&fit=crop&q=80', dest: 'cpu/ryzen7-7800x3d.jpg' },
  { url: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&auto=format&fit=crop&q=80', dest: 'cpu/core-i7-14700k.jpg' },
  { url: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&auto=format&fit=crop&q=80', dest: 'cpu/ryzen5-5600.jpg' },
  { url: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&auto=format&fit=crop&q=80', dest: 'cpu/core-i3-12100f.jpg' },

  // GPUs
  { url: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&auto=format&fit=crop&q=80', dest: 'gpu/rtx-4070-ti-super.jpg' },
  { url: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&auto=format&fit=crop&q=80', dest: 'gpu/rtx-4090.jpg' },
  { url: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&auto=format&fit=crop&q=80', dest: 'gpu/rtx-3060.jpg' },
  { url: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&auto=format&fit=crop&q=80', dest: 'gpu/gtx-1650.jpg' },

  // Motherboards
  { url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80', dest: 'motherboard/gigabyte-h610m.jpg' },
  { url: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?w=800&auto=format&fit=crop&q=80', dest: 'motherboard/asus-b660m.jpg' },
  { url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80', dest: 'motherboard/msi-b650.jpg' },
  { url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80', dest: 'motherboard/asus-z790.jpg' },

  // Monitors
  { url: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80', dest: 'monitor/dell-4k.jpg' },
  { url: 'https://images.unsplash.com/photo-1551645120-d70bfe84c826?w=800&auto=format&fit=crop&q=80', dest: 'monitor/dell-gaming.jpg' },
  { url: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?w=800&auto=format&fit=crop&q=80', dest: 'monitor/hp-omen.jpg' },
  { url: 'https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=800&auto=format&fit=crop&q=80', dest: 'monitor/lenovo-legion.jpg' },

  // Keyboards
  { url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80', dest: 'keyboard/corsair-k70.jpg' },
  { url: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&auto=format&fit=crop&q=80', dest: 'keyboard/logitech-mx.jpg' },
  { url: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&auto=format&fit=crop&q=80', dest: 'keyboard/razer-blackwidow.jpg' },
  { url: 'https://images.unsplash.com/photo-1541140134513-87a49ad61293?w=800&auto=format&fit=crop&q=80', dest: 'keyboard/zebronics-transformer.jpg' },

  // RAM
  { url: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=800&auto=format&fit=crop&q=80', dest: 'ram/corsair-ddr5.jpg' },
  { url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80', dest: 'ram/gskill-ddr5.jpg' },
  { url: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=800&auto=format&fit=crop&q=80', dest: 'ram/kingston-ddr4.jpg' },

  // SSDs
  { url: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&auto=format&fit=crop&q=80', dest: 'ssd/samsung-990pro.jpg' },
  { url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80', dest: 'ssd/wd-sn850x.jpg' },
  { url: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&auto=format&fit=crop&q=80', dest: 'ssd/crucial-p3.jpg' },

  // PSUs
  { url: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&auto=format&fit=crop&q=80', dest: 'psu/corsair-rm850x.jpg' },
  { url: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&auto=format&fit=crop&q=80', dest: 'psu/cooler-master-550w.jpg' },
  { url: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&auto=format&fit=crop&q=80', dest: 'psu/ant-esports-500w.jpg' },

  // Cabinets
  { url: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&auto=format&fit=crop&q=80', dest: 'cabinet/ant-ice100.jpg' },
  { url: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&auto=format&fit=crop&q=80', dest: 'cabinet/nzxt-h9flow.jpg' },

  // Mice
  { url: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80', dest: 'mouse/zeb-transformer-mouse.jpg' },
  { url: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80', dest: 'mouse/logitech-superlight2.jpg' }
];

function downloadFile(url, targetPath) {
  return new Promise((resolve, reject) => {
    const fullDest = path.join(baseDir, targetPath);
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
  console.log("Downloading 33 high-resolution studio product photographs...");
  for (const item of downloads) {
    try {
      await downloadFile(item.url, item.dest);
      console.log(`Downloaded: ${item.dest}`);
    } catch (err) {
      console.error(`Failed to download ${item.dest}:`, err.message);
    }
  }
  console.log("All 33 product photographs downloaded successfully!");
}

run();
