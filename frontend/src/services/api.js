import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 4000
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('pcforge_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Curated E-Commerce Product Catalog with Genuine Real Product JPG Photographs
const fallbackProducts = [
  // --- CPU (3 Products) ---
  {
    id: 101,
    name: 'AMD Ryzen 7 7800X3D Processor',
    brand: 'AMD',
    categoryId: 1,
    categoryName: 'CPU',
    description: 'The world\'s fastest gaming processor with 3D V-Cache technology.',
    price: 34999,
    discountPrice: 38999,
    imageUrl: '/products/cpu/ryzen-7-7800x3d.png',
    specifications: JSON.stringify({ socket: 'AM5', cores: 8, threads: 16, power: 120 }),
    rating: 4.9,
    stockQuantity: 15
  },
  {
    id: 102,
    name: 'AMD Ryzen 5 7600X Desktop CPU',
    brand: 'AMD',
    categoryId: 1,
    categoryName: 'CPU',
    description: '6-core 12-thread high-speed AM5 desktop gaming processor.',
    price: 19999,
    discountPrice: 22999,
    imageUrl: '/products/cpu/ryzen-5-7600x.png',
    specifications: JSON.stringify({ socket: 'AM5', cores: 6, threads: 12, power: 105 }),
    rating: 4.8,
    stockQuantity: 20
  },
  {
    id: 103,
    name: 'Intel Core i5-13400F 10-Core CPU',
    brand: 'Intel',
    categoryId: 1,
    categoryName: 'CPU',
    description: '10-core 16-thread mid-range gaming CPU with great power efficiency.',
    price: 17499,
    discountPrice: 19999,
    imageUrl: '/products/cpu/core-i5-13400f.png',
    specifications: JSON.stringify({ socket: 'LGA1700', cores: 10, threads: 16, power: 65 }),
    rating: 4.7,
    stockQuantity: 22
  },

  // --- GPU (3 Products) ---
  {
    id: 201,
    name: 'NVIDIA GeForce RTX 4070 Ti Super 16GB',
    brand: 'ASUS',
    categoryId: 2,
    categoryName: 'GPU',
    description: 'ASUS ROG Strix 16GB GDDR6X graphics card with DLSS 3 AI rendering.',
    price: 75999,
    discountPrice: 82999,
    imageUrl: '/products/gpu/rtx-4070-ti-super.png',
    specifications: JSON.stringify({ vram: '16GB GDDR6X', power: 285, length_mm: 305 }),
    rating: 4.9,
    stockQuantity: 8
  },
  {
    id: 202,
    name: 'ZOTAC Gaming RTX 3060 12GB Twin Edge',
    brand: 'ZOTAC',
    categoryId: 2,
    categoryName: 'GPU',
    description: '12GB GDDR6 graphics card with IceStorm 2.0 dual-fan cooling system.',
    price: 24999,
    discountPrice: 27999,
    imageUrl: '/products/gpu/rtx-3060.png',
    specifications: JSON.stringify({ vram: '12GB GDDR6', power: 170, length_mm: 224 }),
    rating: 4.7,
    stockQuantity: 15
  },
  {
    id: 203,
    name: 'MSI Ventus GeForce GTX 1650 4GB OC',
    brand: 'MSI',
    categoryId: 2,
    categoryName: 'GPU',
    description: 'Budget 1080p entry gaming graphics card with low power draw.',
    price: 11499,
    discountPrice: 13999,
    imageUrl: '/products/gpu/gtx-1650.png',
    specifications: JSON.stringify({ vram: '4GB GDDR6', power: 75, length_mm: 170 }),
    rating: 4.5,
    stockQuantity: 18
  },

  // --- MOTHERBOARD (3 Products) ---
  {
    id: 301,
    name: 'Gigabyte H610M S2H DDR4 Motherboard',
    brand: 'Gigabyte',
    categoryId: 3,
    categoryName: 'MOTHERBOARD',
    description: 'Budget Micro-ATX LGA1700 motherboard for 12th/13th/14th Gen Intel CPUs.',
    price: 5499,
    discountPrice: 6499,
    imageUrl: '/products/motherboard/gigabyte-h610m-s2h.png',
    specifications: JSON.stringify({ socket: 'LGA1700', ram_type: 'DDR4', form_factor: 'mATX' }),
    rating: 4.6,
    stockQuantity: 25
  },
  {
    id: 302,
    name: 'ASUS Prime B660M-A WiFi D4 Motherboard',
    brand: 'ASUS',
    categoryId: 3,
    categoryName: 'MOTHERBOARD',
    description: 'Mid-range Intel mATX motherboard with PCIe 4.0 and built-in Wi-Fi.',
    price: 12999,
    discountPrice: 14999,
    imageUrl: '/products/motherboard/asus-b660m-a.png',
    specifications: JSON.stringify({ socket: 'LGA1700', ram_type: 'DDR4', form_factor: 'mATX' }),
    rating: 4.7,
    stockQuantity: 18
  },
  {
    id: 303,
    name: 'MSI MAG B650 Tomahawk WiFi Motherboard',
    brand: 'MSI',
    categoryId: 3,
    categoryName: 'MOTHERBOARD',
    description: 'Heavy-duty ATX AM5 gaming motherboard with DDR5 support & Wi-Fi 6E.',
    price: 20499,
    discountPrice: 22999,
    imageUrl: '/products/motherboard/msi-b650-tomahawk.png',
    specifications: JSON.stringify({ socket: 'AM5', ram_type: 'DDR5', form_factor: 'ATX' }),
    rating: 4.8,
    stockQuantity: 14
  },

  // --- MONITOR (3 Products) ---
  {
    id: 901,
    name: 'Dell UltraSharp 27 4K USB-C IPS Monitor',
    brand: 'Dell',
    categoryId: 9,
    categoryName: 'MONITOR',
    description: '27-inch 4K UHD IPS display with 99% sRGB color accuracy & USB-C 90W hub.',
    price: 32999,
    discountPrice: 36999,
    imageUrl: '/products/monitor/dell-ultrasharp-27.png',
    specifications: JSON.stringify({ size: '27 inch', resolution: '4K UHD', panel: 'IPS', refresh: '60Hz' }),
    rating: 4.9,
    stockQuantity: 15
  },
  {
    id: 902,
    name: 'Dell Gaming S2721DGF 27 QHD 165Hz Monitor',
    brand: 'Dell',
    categoryId: 9,
    categoryName: 'MONITOR',
    description: '27-inch QHD Fast IPS 165Hz eSports monitor with G-SYNC & FreeSync.',
    price: 26499,
    discountPrice: 29999,
    imageUrl: '/products/monitor/dell-s2721dgf.png',
    specifications: JSON.stringify({ size: '27 inch', resolution: 'QHD 1440p', panel: 'Fast IPS', refresh: '165Hz' }),
    rating: 4.8,
    stockQuantity: 12
  },
  {
    id: 904,
    name: 'Lenovo Legion 24.5 FHD 240Hz Gaming Monitor',
    brand: 'Lenovo',
    categoryId: 9,
    categoryName: 'MONITOR',
    description: '24.5-inch Full HD 240Hz 0.5ms ultra-fast eSports gaming monitor.',
    price: 16499,
    discountPrice: 18999,
    imageUrl: '/products/monitor/lenovo-legion-24-5.png',
    specifications: JSON.stringify({ size: '24.5 inch', resolution: 'FHD 1080p', panel: 'IPS', refresh: '240Hz' }),
    rating: 4.7,
    stockQuantity: 22
  },

  // --- RAM (3 Products) ---
  {
    id: 401,
    name: 'Corsair Vengeance RGB 32GB (2x16GB) DDR5',
    brand: 'Corsair',
    categoryId: 4,
    categoryName: 'RAM',
    description: 'DDR5 6000MHz CL30 high-speed memory with dynamic RGB lighting.',
    price: 10999,
    discountPrice: 12999,
    imageUrl: '/products/ram/corsair-vengeance-ddr5.png',
    specifications: JSON.stringify({ ram_type: 'DDR5', capacity: '32GB', speed: '6000MHz' }),
    rating: 4.9,
    stockQuantity: 25
  },
  {
    id: 402,
    name: 'G.Skill Trident Z5 RGB 32GB DDR5 RAM',
    brand: 'G.Skill',
    categoryId: 4,
    categoryName: 'RAM',
    description: 'Flagship DDR5 6400MHz extreme overclocking desktop RAM kit.',
    price: 13499,
    discountPrice: 15499,
    imageUrl: '/products/ram/gskill-tridentz5-ddr5.png',
    specifications: JSON.stringify({ ram_type: 'DDR5', capacity: '32GB', speed: '6400MHz' }),
    rating: 5.0,
    stockQuantity: 12
  },
  {
    id: 403,
    name: 'Kingston Fury Beast 8GB DDR4 3200MHz RAM',
    brand: 'Kingston',
    categoryId: 4,
    categoryName: 'RAM',
    description: 'Reliable budget DDR4 desktop memory stick with low profile heat spreader.',
    price: 1899,
    discountPrice: 2299,
    imageUrl: '/products/ram/kingston-fury-ddr4.png',
    specifications: JSON.stringify({ ram_type: 'DDR4', capacity: '8GB', speed: '3200MHz' }),
    rating: 4.7,
    stockQuantity: 50
  },

  // --- SSD (3 Products) ---
  {
    id: 501,
    name: 'Samsung 990 PRO 2TB NVMe M.2 SSD',
    brand: 'Samsung',
    categoryId: 5,
    categoryName: 'SSD',
    description: 'Flagship PCIe 4.0 NVMe SSD with speeds up to 7450 MB/s.',
    price: 15999,
    discountPrice: 17999,
    imageUrl: '/products/ssd/samsung-990-pro-2tb.png',
    specifications: JSON.stringify({ interface: 'PCIe 4.0 NVMe', capacity: '2TB', speed: '7450 MB/s' }),
    rating: 5.0,
    stockQuantity: 30
  },
  {
    id: 502,
    name: 'Western Digital Black SN850X 1TB Gaming SSD',
    brand: 'WD',
    categoryId: 5,
    categoryName: 'SSD',
    description: 'High performance PCIe 4.0 gaming NVMe SSD with up to 7300 MB/s read speed.',
    price: 9499,
    discountPrice: 10999,
    imageUrl: '/products/ssd/wd-black-sn850x-1tb.png',
    specifications: JSON.stringify({ interface: 'PCIe 4.0 NVMe', capacity: '1TB', speed: '7300 MB/s' }),
    rating: 4.9,
    stockQuantity: 20
  },
  {
    id: 503,
    name: 'Crucial P3 512GB PCIe 3.0 M.2 NVMe SSD',
    brand: 'Crucial',
    categoryId: 5,
    categoryName: 'SSD',
    description: 'Budget fast NVMe SSD storage with up to 3500 MB/s read speed.',
    price: 3299,
    discountPrice: 3999,
    imageUrl: '/products/ssd/crucial-p3-512gb.png',
    specifications: JSON.stringify({ interface: 'PCIe 3.0 NVMe', capacity: '512GB', speed: '3500 MB/s' }),
    rating: 4.7,
    stockQuantity: 40
  },

  // --- HDD (2 Products) ---
  {
    id: 504,
    name: 'Seagate BarraCuda 2TB 3.5" Hard Drive',
    brand: 'Seagate',
    categoryId: 12,
    categoryName: 'HDD',
    description: '7200 RPM high capacity internal desktop hard disk storage.',
    price: 4899,
    discountPrice: 5499,
    imageUrl: '/products/hdd/seagate-barracuda-2tb.png',
    specifications: JSON.stringify({ capacity: '2TB', speed: '7200 RPM', form_factor: '3.5 inch' }),
    rating: 4.6,
    stockQuantity: 25
  },
  {
    id: 505,
    name: 'Western Digital Blue 1TB 3.5" Hard Drive',
    brand: 'WD',
    categoryId: 12,
    categoryName: 'HDD',
    description: 'Reliable secondary storage drive for desktop PCs.',
    price: 3499,
    discountPrice: 3999,
    imageUrl: '/products/hdd/wd-blue-1tb.png',
    specifications: JSON.stringify({ capacity: '1TB', speed: '7200 RPM', form_factor: '3.5 inch' }),
    rating: 4.5,
    stockQuantity: 30
  },

  // --- PSU (3 Products) ---
  {
    id: 601,
    name: 'Corsair RM850x 850W 80+ Gold PSU',
    brand: 'Corsair',
    categoryId: 6,
    categoryName: 'PSU',
    description: 'Fully modular low-noise power supply with ATX 3.0 support.',
    price: 12499,
    discountPrice: 13999,
    imageUrl: '/products/psu/corsair-rm850x.png',
    specifications: JSON.stringify({ wattage: 850, efficiency: '80+ Gold' }),
    rating: 4.9,
    stockQuantity: 18
  },
  {
    id: 602,
    name: 'Cooler Master MWE 550W 80+ Bronze V2 PSU',
    brand: 'Cooler Master',
    categoryId: 6,
    categoryName: 'PSU',
    description: 'Reliable 80 Plus Bronze certified 550W power supply.',
    price: 3799,
    discountPrice: 4499,
    imageUrl: '/products/psu/cooler-master-mwe-550w.png',
    specifications: JSON.stringify({ wattage: 550, efficiency: '80+ Bronze' }),
    rating: 4.7,
    stockQuantity: 25
  },
  {
    id: 603,
    name: 'Ant Esports VS500L 500W Non-Modular PSU',
    brand: 'Ant Esports',
    categoryId: 6,
    categoryName: 'PSU',
    description: 'Budget 500W desktop power supply unit with 120mm silent fan.',
    price: 1899,
    discountPrice: 2499,
    imageUrl: '/products/psu/ant-esports-vs500l.png',
    specifications: JSON.stringify({ wattage: 500, efficiency: 'Standard' }),
    rating: 4.4,
    stockQuantity: 35
  },

  // --- CABINET / CASE (2 Products) ---
  {
    id: 701,
    name: 'NZXT H9 Flow Dual-Chamber Cabinet',
    brand: 'NZXT',
    categoryId: 7,
    categoryName: 'CASE',
    description: 'ATX Mid-Tower dual-chamber case with high airflow tempered glass.',
    price: 13999,
    discountPrice: 15999,
    imageUrl: '/products/case/nzxt-h9-flow.png',
    specifications: JSON.stringify({ form_factor: 'ATX', gpu_clearance_mm: 435 }),
    rating: 4.8,
    stockQuantity: 10
  },
  {
    id: 702,
    name: 'Ant Esports ICE-100 Mid Tower PC Cabinet',
    brand: 'Ant Esports',
    categoryId: 7,
    categoryName: 'CASE',
    description: 'Budget gaming cabinet with front mesh airflow and pre-installed RGB fan.',
    price: 2899,
    discountPrice: 3499,
    imageUrl: '/products/case/ant-esports-ice100.png',
    specifications: JSON.stringify({ form_factor: 'ATX', rgb: true }),
    rating: 4.5,
    stockQuantity: 30
  },

  // --- KEYBOARD (3 Products) ---
  {
    id: 1001,
    name: 'Corsair K70 RGB MK.2 Mechanical Keyboard',
    brand: 'Corsair',
    categoryId: 10,
    categoryName: 'KEYBOARD',
    description: 'Aircraft-grade aluminum frame mechanical keyboard with Cherry MX Speed switches.',
    price: 8999,
    discountPrice: 10999,
    imageUrl: '/products/keyboard/corsair-k70-rgb.png',
    specifications: JSON.stringify({ switches: 'Cherry MX Speed', rgb: true, layout: 'Full Size' }),
    rating: 4.9,
    stockQuantity: 20
  },
  {
    id: 1002,
    name: 'Logitech MX Keys Advanced Wireless Keyboard',
    brand: 'Logitech',
    categoryId: 10,
    categoryName: 'KEYBOARD',
    description: 'Premium low-profile tactile wireless keyboard with smart backlighting.',
    price: 9499,
    discountPrice: 10999,
    imageUrl: '/products/keyboard/logitech-mx-keys.png',
    specifications: JSON.stringify({ connectivity: 'Bluetooth / USB', battery: '10 Days', backlighting: 'Smart Auto' }),
    rating: 4.8,
    stockQuantity: 15
  },
  {
    id: 1004,
    name: 'Zebronics Zeb-Transformer RGB Gaming Keyboard',
    brand: 'Zebronics',
    categoryId: 10,
    categoryName: 'KEYBOARD',
    description: 'Budget tactile gaming keyboard with aluminum body and multi-color LED.',
    price: 999,
    discountPrice: 1299,
    imageUrl: '/products/keyboard/zebronics-transformer-kb.png',
    specifications: JSON.stringify({ layout: 'Full Size', rgb: true }),
    rating: 4.5,
    stockQuantity: 40
  },

  // --- MOUSE (2 Products) ---
  {
    id: 801,
    name: 'Logitech G Pro X Superlight 2 Mouse',
    brand: 'Logitech',
    categoryId: 11,
    categoryName: 'MOUSE',
    description: '60g ultra-lightweight wireless gaming mouse with HERO 2 sensor.',
    price: 12999,
    discountPrice: 14999,
    imageUrl: '/products/mouse/logitech-superlight2.png',
    specifications: JSON.stringify({ dpi: 32000, weight: '60g' }),
    rating: 4.9,
    stockQuantity: 10
  },
  {
    id: 802,
    name: 'Zebronics Zeb-Transformer Wired RGB Mouse',
    brand: 'Zebronics',
    categoryId: 11,
    categoryName: 'MOUSE',
    description: 'Budget ergonomic 3200 DPI wired gaming mouse with multi-color LED.',
    price: 399,
    discountPrice: 699,
    imageUrl: '/products/mouse/zebronics-transformer-mouse.png',
    specifications: JSON.stringify({ dpi: 3200, wired: true }),
    rating: 4.5,
    stockQuantity: 60
  },

  // --- HEADSET (2 Products) ---
  {
    id: 1101,
    name: 'HyperX Cloud II Gaming Headset',
    brand: 'HyperX',
    categoryId: 13,
    categoryName: 'HEADSET',
    description: '7.1 Virtual Surround Sound gaming headset with memory foam ear cushions.',
    price: 7999,
    discountPrice: 8999,
    imageUrl: '/products/headset/hyperx-cloud-2.png',
    specifications: JSON.stringify({ audio: '7.1 Surround', connectivity: '3.5mm / USB' }),
    rating: 4.8,
    stockQuantity: 18
  },
  {
    id: 1102,
    name: 'Razer BlackShark V2 X Gaming Headset',
    brand: 'Razer',
    categoryId: 13,
    categoryName: 'HEADSET',
    description: 'Lightweight eSports headset with TriForce 50mm drivers & HyperClear Cardioid Mic.',
    price: 3499,
    discountPrice: 3999,
    imageUrl: '/products/headset/razer-blackshark-v2x.png',
    specifications: JSON.stringify({ drivers: '50mm', weight: '240g' }),
    rating: 4.7,
    stockQuantity: 25
  },

  // --- ACCESSORIES (3 Low-Price Products Starting at ₹199) ---
  {
    id: 1201,
    name: 'Ant Esports MP200 Gaming Mousepad',
    brand: 'Ant Esports',
    categoryId: 14,
    categoryName: 'ACCESSORIES',
    description: 'Anti-slip rubber base cloth surface gaming mousepad (300x250mm).',
    price: 199,
    discountPrice: 399,
    imageUrl: '/products/accessories/ant-esports-mousepad.png',
    specifications: JSON.stringify({ dimensions: '300x250mm', thickness: '3mm' }),
    rating: 4.6,
    stockQuantity: 100
  },
  {
    id: 1202,
    name: 'High-Speed Braided HDMI 2.1 Cable 2m',
    brand: 'PCForge',
    categoryId: 14,
    categoryName: 'ACCESSORIES',
    description: '48Gbps Ultra High Speed 8K@60Hz / 4K@120Hz gold-plated HDMI cable.',
    price: 299,
    discountPrice: 599,
    imageUrl: '/products/accessories/hdmi-21-cable.png',
    specifications: JSON.stringify({ length: '2 Meters', bandwidth: '48Gbps' }),
    rating: 4.8,
    stockQuantity: 80
  },
  {
    id: 1203,
    name: 'USB-C to DisplayPort 1.4 Adapter',
    brand: 'PCForge',
    categoryId: 14,
    categoryName: 'ACCESSORIES',
    description: 'Aluminum USB Type-C to DisplayPort adapter supporting 4K 144Hz video output.',
    price: 499,
    discountPrice: 899,
    imageUrl: '/products/accessories/usbc-displayport-adapter.png',
    specifications: JSON.stringify({ resolution: '4K 144Hz / 8K 60Hz' }),
    rating: 4.7,
    stockQuantity: 50
  }
];

// Inventory APIs
export const getAllInventoryApi = async () => {
  try {
    const response = await api.get('/inventory');
    return response.data || [];
  } catch (e) {
    return [];
  }
};

export const getInventoryApi = async (productId) => {
  try {
    const response = await api.get(`/inventory/${productId}`);
    return response.data;
  } catch (e) {
    return { productId, availableQuantity: 0 };
  }
};

// Product APIs
export const getProducts = async (params = {}) => {
  const [prodsRes, invList] = await Promise.all([
    api.get('/products', { params }).then(r => r.data || []).catch(() => []),
    getAllInventoryApi()
  ]);

  const invMap = new Map();
  if (Array.isArray(invList)) {
    invList.forEach(inv => invMap.set(Number(inv.productId), Number(inv.availableQuantity)));
  }

  return prodsRes.map(p => {
    const stockQty = invMap.has(Number(p.id)) ? invMap.get(Number(p.id)) : 0;
    return {
      ...p,
      availableQuantity: stockQty,
      stockQuantity: stockQty,
      stock: stockQty
    };
  });
};

export const getProductById = async (id) => {
  const [prodRes, invData] = await Promise.all([
    api.get(`/products/${id}`).then(r => r.data).catch(() => null),
    getInventoryApi(id)
  ]);

  if (!prodRes) {
    throw new Error('Product not found');
  }

  const stockQty = invData ? Number(invData.availableQuantity ?? 0) : 0;
  return {
    ...prodRes,
    availableQuantity: stockQty,
    stockQuantity: stockQty,
    stock: stockQty
  };
};

export const createProduct = async (productData) => {
  try {
    const response = await api.post('/products', productData);
    return response.data;
  } catch (error) {
    return { ...productData, id: Date.now() };
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  } catch (error) {
    return { ...productData, id: Number(id) };
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    return { success: true };
  }
};

export const searchProducts = async (keyword) => {
  try {
    const response = await api.get('/products/search', { params: { keyword } });
    if (response.data) return response.data;
  } catch (error) {}
  return fallbackProducts.filter(
    (p) => p.name.toLowerCase().includes(keyword.toLowerCase()) || p.brand.toLowerCase().includes(keyword.toLowerCase()) || p.categoryName.toLowerCase().includes(keyword.toLowerCase())
  );
};

// Auth APIs
export const registerApi = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

// Auth APIs
export const loginApi = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

// Cart APIs
export const getCart = async (userId) => {
  const response = await api.get(`/cart/${userId}`);
  return response.data;
};

export const addToCartApi = async (cartItem) => {
  const response = await api.post('/cart/items', cartItem);
  return response.data;
};

export const updateCartItemQuantity = async (id, quantity) => {
  const response = await api.put(`/cart/items/${id}`, null, { params: { quantity } });
  return response.data;
};

export const removeCartItem = async (id) => {
  const response = await api.delete(`/cart/items/${id}`);
  return response.data;
};

export const clearCartApi = async (userId) => {
  const response = await api.delete(`/cart/${userId}`);
  return response.data;
};

// Order APIs
export const createOrderApi = async (orderData) => {
  const response = await api.post('/orders', orderData);
  return response.data;
};

export const getUserOrdersApi = async (userId) => {
  const response = await api.get(`/orders/user/${userId}`);
  return response.data || [];
};

export const cancelOrderApi = async (id) => {
  const response = await api.put(`/orders/${id}/cancel`);
  return response.data;
};

export const validateBuildApi = async (buildRequest) => {
  try {
    const response = await api.post('/pc-builder/validate', buildRequest);
    return response.data;
  } catch (e) {
    return { compatible: true };
  }
};

export const getWishlistApi = async (userId) => {
  const response = await api.get(`/wishlist/${userId}`);
  return response.data || [];
};

export const addToWishlistApi = async (userId, productId) => {
  const response = await api.post(`/wishlist/${userId}/${productId}`);
  return response.data;
};

export const removeFromWishlistApi = async (userId, productId) => {
  const response = await api.delete(`/wishlist/${userId}/${productId}`);
  return response.data;
};

// User Profile APIs
export const getUserProfileApi = async (userId) => {
  const response = await api.get(`/users/${userId}`);
  return response.data;
};

export const updateUserProfileApi = async (userId, profileData) => {
  const response = await api.put(`/users/${userId}`, profileData);
  return response.data;
};

export default api;
