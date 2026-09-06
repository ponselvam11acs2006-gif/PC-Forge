const fs = require('fs');
const path = require('path');
const https = require('https');

const baseDir = path.join(__dirname, 'frontend', 'public', 'products');

const fixes = [
  { url: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600&auto=format&fit=crop&q=80', dest: 'gpu/rtx-4070-ti-super.jpg' },
  { url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80', dest: 'keyboard/zebronics-transformer-kb.jpg' },
  { url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80', dest: 'motherboard/asus-b660m-a.jpg' },
  { url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80', dest: 'psu/corsair-rm850x.jpg' }
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
  for (const item of fixes) {
    await downloadFile(item.url, item.dest);
    console.log(`Fixed photo: ${item.dest}`);
  }
}

run();
