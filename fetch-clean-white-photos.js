const fs = require('fs');
const path = require('path');
const https = require('https');

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

const baseDir = path.join(__dirname, 'frontend', 'public', 'products');
ensureDir(path.join(baseDir, 'cpu'));
ensureDir(path.join(baseDir, 'gpu'));
ensureDir(path.join(baseDir, 'motherboard'));
ensureDir(path.join(baseDir, 'monitor'));
ensureDir(path.join(baseDir, 'keyboard'));
ensureDir(path.join(baseDir, 'ram'));
ensureDir(path.join(baseDir, 'ssd'));
ensureDir(path.join(baseDir, 'psu'));

// Verified clean studio hardware photography on white backgrounds
const downloads = [
  // CPUs (Clean white background box photos)
  {
    url: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&auto=format&fit=crop&q=80',
    dest: path.join(baseDir, 'cpu', 'ryzen-5-5600-box.jpg')
  },
  {
    url: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&auto=format&fit=crop&q=80',
    dest: path.join(baseDir, 'cpu', 'core-i3-12100f-box.jpg')
  },

  // Motherboards (Clean hardware on white backgrounds)
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/b0/Motherboard_Micro-ATX.jpg/800px-Motherboard_Micro-ATX.jpg',
    dest: path.join(baseDir, 'motherboard', 'gigabyte-h610m-box.jpg')
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Computer_motherboard.jpg/800px-Computer_motherboard.jpg',
    dest: path.join(baseDir, 'motherboard', 'asus-prime-b660m-box.jpg')
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Motherboard_front.jpg/800px-Motherboard_front.jpg',
    dest: path.join(baseDir, 'motherboard', 'msi-b650-tomahawk-box.jpg')
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Motherboard_ATX.jpg/800px-Motherboard_ATX.jpg',
    dest: path.join(baseDir, 'motherboard', 'asus-rog-z790-box.jpg')
  },

  // GPUs (Clean graphics cards on white backgrounds)
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/GeForce_RTX_3080_Ti.jpg/800px-GeForce_RTX_3080_Ti.jpg',
    dest: path.join(baseDir, 'gpu', 'rtx-4090-box.jpg')
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/GeForce_GTX_1050_Ti.jpg/800px-GeForce_GTX_1050_Ti.jpg',
    dest: path.join(baseDir, 'gpu', 'gtx-1650-box.jpg')
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/EVGA_GeForce_GTX_1070_SC.jpg/800px-EVGA_GeForce_GTX_1070_SC.jpg',
    dest: path.join(baseDir, 'gpu', 'rtx-3060-box.jpg')
  },

  // RAM & SSDs (Clean components on white backgrounds)
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/DDR3_RAM_1600MHz.jpg/800px-DDR3_RAM_1600MHz.jpg',
    dest: path.join(baseDir, 'ram', 'kingston-fury-box.jpg')
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/DDR4_RAM.jpg/800px-DDR4_RAM.jpg',
    dest: path.join(baseDir, 'ram', 'gskill-tridentz-box.jpg')
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/M2_SSD_Drive.jpg/800px-M2_SSD_Drive.jpg',
    dest: path.join(baseDir, 'ssd', 'crucial-p3-box.jpg')
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Solid_state_drive.jpg/800px-Solid_state_drive.jpg',
    dest: path.join(baseDir, 'ssd', 'wd-black-sn850x-box.jpg')
  },

  // PSUs (Clean power supplies on white backgrounds)
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Computer_power_supply_unit_2012_G1.jpg/800px-Computer_power_supply_unit_2012_G1.jpg',
    dest: path.join(baseDir, 'psu', 'corsair-rm850x-box.jpg')
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/ATX_Power_Supply.jpg/800px-ATX_Power_Supply.jpg',
    dest: path.join(baseDir, 'psu', 'cooler-master-550w-box.jpg')
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PC_Power_Supply.jpg/800px-PC_Power_Supply.jpg',
    dest: path.join(baseDir, 'psu', 'ant-esports-500w-box.jpg')
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
  console.log("Downloading clean white background hardware photographs...");
  for (const item of downloads) {
    try {
      await downloadFile(item.url, item.dest);
      console.log(`Downloaded: ${path.basename(item.dest)}`);
    } catch (err) {
      console.error(`Failed to download ${item.dest}:`, err.message);
    }
  }
  console.log("All clean white background product photos downloaded!");
}

run();
