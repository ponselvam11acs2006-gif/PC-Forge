const fs = require('fs');
const path = require('path');
const https = require('https');

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

const baseDir = path.join(__dirname, 'frontend', 'public', 'products');

['cpu', 'gpu', 'motherboard', 'monitor', 'ram', 'ssd', 'hdd', 'psu', 'case', 'keyboard', 'mouse', 'headset', 'accessories'].forEach(cat => {
  ensureDir(path.join(baseDir, cat));
});

const downloads = [
  // --- CPU ---
  { url: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=600&auto=format&fit=crop&q=80', dest: 'cpu/ryzen-7-7800x3d.jpg' },
  { url: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&auto=format&fit=crop&q=80', dest: 'cpu/ryzen-5-7600x.jpg' },
  { url: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=600&auto=format&fit=crop&q=80', dest: 'cpu/core-i5-13400f.jpg' },

  // --- GPU ---
  { url: 'https://images.unsplash.com/photo-1587202372616-b43bfa06c2a3?w=600&auto=format&fit=crop&q=80', dest: 'gpu/rtx-4070-ti-super.jpg' },
  { url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80', dest: 'gpu/rtx-3060.jpg' },
  { url: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600&auto=format&fit=crop&q=80', dest: 'gpu/gtx-1650.jpg' },

  // --- MOTHERBOARD ---
  { url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80', dest: 'motherboard/gigabyte-h610m-s2h.jpg' },
  { url: 'https://images.unsplash.com/photo-1563770660941-20978e770fa3?w=600&auto=format&fit=crop&q=80', dest: 'motherboard/asus-b660m-a.jpg' },
  { url: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=600&auto=format&fit=crop&q=80', dest: 'motherboard/msi-b650-tomahawk.jpg' },

  // --- MONITOR ---
  { url: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop&q=80', dest: 'monitor/dell-ultrasharp-27.jpg' },
  { url: 'https://images.unsplash.com/photo-1551645120-d70bfe84c826?w=600&auto=format&fit=crop&q=80', dest: 'monitor/dell-s2721dgf.jpg' },
  { url: 'https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=600&auto=format&fit=crop&q=80', dest: 'monitor/lenovo-legion-24-5.jpg' },

  // --- RAM ---
  { url: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=600&auto=format&fit=crop&q=80', dest: 'ram/corsair-vengeance-ddr5.jpg' },
  { url: 'https://images.unsplash.com/photo-1541029071515-84cc54f84dc5?w=600&auto=format&fit=crop&q=80', dest: 'ram/gskill-tridentz5-ddr5.jpg' },
  { url: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=600&auto=format&fit=crop&q=80', dest: 'ram/kingston-fury-ddr4.jpg' },

  // --- SSD ---
  { url: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600&auto=format&fit=crop&q=80', dest: 'ssd/samsung-990-pro-2tb.jpg' },
  { url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80', dest: 'ssd/wd-black-sn850x-1tb.jpg' },
  { url: 'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=600&auto=format&fit=crop&q=80', dest: 'ssd/crucial-p3-512gb.jpg' },

  // --- HDD ---
  { url: 'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=600&auto=format&fit=crop&q=80', dest: 'hdd/seagate-barracuda-2tb.jpg' },
  { url: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600&auto=format&fit=crop&q=80', dest: 'hdd/wd-blue-1tb.jpg' },

  // --- PSU ---
  { url: 'https://images.unsplash.com/photo-1587202372616-b43bfa06c2a3?w=600&auto=format&fit=crop&q=80', dest: 'psu/corsair-rm850x.jpg' },
  { url: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600&auto=format&fit=crop&q=80', dest: 'psu/cooler-master-mwe-550w.jpg' },
  { url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80', dest: 'psu/ant-esports-vs500l.jpg' },

  // --- CASE ---
  { url: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&auto=format&fit=crop&q=80', dest: 'case/nzxt-h9-flow.jpg' },
  { url: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=600&auto=format&fit=crop&q=80', dest: 'case/ant-esports-ice100.jpg' },

  // --- KEYBOARD ---
  { url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80', dest: 'keyboard/corsair-k70-rgb.jpg' },
  { url: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600&auto=format&fit=crop&q=80', dest: 'keyboard/logitech-mx-keys.jpg' },
  { url: 'https://images.unsplash.com/photo-1541140134513-87a49ad61293?w=600&auto=format&fit=crop&q=80', dest: 'keyboard/zebronics-transformer-kb.jpg' },

  // --- MOUSE ---
  { url: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&auto=format&fit=crop&q=80', dest: 'mouse/logitech-superlight2.jpg' },
  { url: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&auto=format&fit=crop&q=80', dest: 'mouse/zebronics-transformer-mouse.jpg' },

  // --- HEADSET ---
  { url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80', dest: 'headset/hyperx-cloud-2.jpg' },
  { url: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=80', dest: 'headset/razer-blackshark-v2x.jpg' },

  // --- ACCESSORIES ---
  { url: 'https://images.unsplash.com/photo-1616440347437-b1c73416efc2?w=600&auto=format&fit=crop&q=80', dest: 'accessories/ant-esports-mousepad.jpg' },
  { url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80', dest: 'accessories/hdmi-21-cable.jpg' },
  { url: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&auto=format&fit=crop&q=80', dest: 'accessories/usbc-displayport-adapter.jpg' }
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
  console.log("Downloading binary JPEG photographs from Unsplash CDN...");
  for (const item of downloads) {
    try {
      await downloadFile(item.url, item.dest);
      console.log(`Downloaded photo: ${item.dest}`);
    } catch (err) {
      console.error(`Failed ${item.dest}:`, err.message);
    }
  }
  console.log("All JPEG photos downloaded!");
}

run();
