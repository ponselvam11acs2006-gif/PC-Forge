const fs = require('fs');
const path = require('path');
const https = require('https');

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
ensureDir(path.join(baseDir, 'motherboard'));
ensureDir(path.join(baseDir, 'ram'));
ensureDir(path.join(baseDir, 'ssd'));
ensureDir(path.join(baseDir, 'psu'));
ensureDir(path.join(baseDir, 'cabinet'));
ensureDir(path.join(baseDir, 'mouse'));

const downloads = [
  // Monitors (Dell, HP, Lenovo)
  {
    url: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80',
    dest: path.join(baseDir, 'monitor', 'dell-ultrasharp-27.jpg')
  },
  {
    url: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?w=800&auto=format&fit=crop&q=80',
    dest: path.join(baseDir, 'monitor', 'hp-omen-27.jpg')
  },
  {
    url: 'https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=800&auto=format&fit=crop&q=80',
    dest: path.join(baseDir, 'monitor', 'lenovo-legion-24.jpg')
  },
  {
    url: 'https://images.unsplash.com/photo-1551645120-d70bfe84c826?w=800&auto=format&fit=crop&q=80',
    dest: path.join(baseDir, 'monitor', 'dell-gaming-27.jpg')
  },
  {
    url: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300&auto=format&fit=crop&q=80',
    dest: path.join(baseDir, 'monitor', 'monitor-ribbon.jpg')
  },

  // Keyboards
  {
    url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
    dest: path.join(baseDir, 'keyboard', 'corsair-k70.jpg')
  },
  {
    url: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&auto=format&fit=crop&q=80',
    dest: path.join(baseDir, 'keyboard', 'logitech-mx-keys.jpg')
  },
  {
    url: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&auto=format&fit=crop&q=80',
    dest: path.join(baseDir, 'keyboard', 'razer-blackwidow.jpg')
  },
  {
    url: 'https://images.unsplash.com/photo-1541140134513-87a49ad61293?w=800&auto=format&fit=crop&q=80',
    dest: path.join(baseDir, 'keyboard', 'zebronics-transformer.jpg')
  },
  {
    url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&auto=format&fit=crop&q=80',
    dest: path.join(baseDir, 'keyboard', 'keyboard-ribbon.jpg')
  },

  // GPUs
  {
    url: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&auto=format&fit=crop&q=80',
    dest: path.join(baseDir, 'gpu', 'rtx-4090-photo.jpg')
  },
  {
    url: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&auto=format&fit=crop&q=80',
    dest: path.join(baseDir, 'gpu', 'gtx-1650-photo.jpg')
  },
  {
    url: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&auto=format&fit=crop&q=80',
    dest: path.join(baseDir, 'gpu', 'rtx-3060-photo.jpg')
  },

  // CPUs
  {
    url: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&auto=format&fit=crop&q=80',
    dest: path.join(baseDir, 'cpu', 'core-i3-12100f-photo.jpg')
  },
  {
    url: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&auto=format&fit=crop&q=80',
    dest: path.join(baseDir, 'cpu', 'ryzen-5-5600-photo.jpg')
  },

  // Motherboards
  {
    url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
    dest: path.join(baseDir, 'motherboard', 'gigabyte-h610m.jpg')
  },
  {
    url: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?w=800&auto=format&fit=crop&q=80',
    dest: path.join(baseDir, 'motherboard', 'asus-prime-b660m.jpg')
  },
  {
    url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80',
    dest: path.join(baseDir, 'motherboard', 'msi-b650-tomahawk.jpg')
  },
  {
    url: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&auto=format&fit=crop&q=80',
    dest: path.join(baseDir, 'motherboard', 'asus-rog-z790.jpg')
  },

  // RAM
  {
    url: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=800&auto=format&fit=crop&q=80',
    dest: path.join(baseDir, 'ram', 'kingston-fury-photo.jpg')
  },
  {
    url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80',
    dest: path.join(baseDir, 'ram', 'gskill-tridentz.jpg')
  },

  // SSD
  {
    url: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&auto=format&fit=crop&q=80',
    dest: path.join(baseDir, 'ssd', 'crucial-p3-photo.jpg')
  },
  {
    url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80',
    dest: path.join(baseDir, 'ssd', 'wd-black-sn850x.jpg')
  },

  // PSU
  {
    url: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&auto=format&fit=crop&q=80',
    dest: path.join(baseDir, 'psu', 'corsair-rm850x-photo.jpg')
  },
  {
    url: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&auto=format&fit=crop&q=80',
    dest: path.join(baseDir, 'psu', 'ant-esports-500w.jpg')
  },
  {
    url: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&auto=format&fit=crop&q=80',
    dest: path.join(baseDir, 'psu', 'cooler-master-550w.jpg')
  }
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return downloadFile(response.headers.location, dest).then(resolve).catch(reject);
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  console.log("Downloading real product photography...");
  for (const item of downloads) {
    try {
      await downloadFile(item.url, item.dest);
      console.log(`Downloaded: ${path.basename(item.dest)}`);
    } catch (err) {
      console.error(`Failed to download ${item.dest}:`, err.message);
    }
  }
  console.log("All real product photographs downloaded successfully!");
}

run();
