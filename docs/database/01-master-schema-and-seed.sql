-- PCForge Database Scripts
-- Database per Service Architecture

CREATE DATABASE IF NOT EXISTS pcforge_auth_db;
CREATE DATABASE IF NOT EXISTS pcforge_user_db;
CREATE DATABASE IF NOT EXISTS pcforge_product_db;
CREATE DATABASE IF NOT EXISTS pcforge_category_db;
CREATE DATABASE IF NOT EXISTS pcforge_inventory_db;
CREATE DATABASE IF NOT EXISTS pcforge_cart_db;
CREATE DATABASE IF NOT EXISTS pcforge_order_db;
CREATE DATABASE IF NOT EXISTS pcforge_payment_db;
CREATE DATABASE IF NOT EXISTS pcforge_review_db;
CREATE DATABASE IF NOT EXISTS pcforge_wishlist_db;
CREATE DATABASE IF NOT EXISTS pcforge_pc_builder_db;
CREATE DATABASE IF NOT EXISTS pcforge_notification_db;

-- 1. AUTH DB
USE pcforge_auth_db;
CREATE TABLE IF NOT EXISTS users_auth (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'CUSTOMER',
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. USER DB
USE pcforge_user_db;
CREATE TABLE IF NOT EXISTS user_profiles (
    id BIGINT PRIMARY KEY,
    full_name VARCHAR(100),
    phone VARCHAR(20),
    address VARCHAR(255),
    city VARCHAR(50),
    country VARCHAR(50),
    zip_code VARCHAR(20),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 3. PRODUCT DB
USE pcforge_product_db;
CREATE TABLE IF NOT EXISTS products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    brand VARCHAR(50) NOT NULL,
    category_id BIGINT NOT NULL,
    category_name VARCHAR(50) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    discount_price DECIMAL(10,2),
    image_url VARCHAR(500),
    specifications JSON,
    rating DECIMAL(3,2) DEFAULT 5.0,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. INVENTORY DB
USE pcforge_inventory_db;
CREATE TABLE IF NOT EXISTS inventory (
    product_id BIGINT PRIMARY KEY,
    available_quantity INT NOT NULL DEFAULT 0,
    reserved_quantity INT NOT NULL DEFAULT 0,
    minimum_stock INT DEFAULT 5,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS stock_transactions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_id BIGINT NOT NULL,
    quantity_changed INT NOT NULL,
    transaction_type VARCHAR(20) NOT NULL, -- RESERVE, RELEASE, CONFIRM, RESTORE, ADD
    reference_id VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. ORDER DB
USE pcforge_order_db;
CREATE TABLE IF NOT EXISTS orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    payment_id BIGINT,
    shipping_address TEXT NOT NULL,
    status VARCHAR(30) NOT NULL, -- PENDING, CONFIRMED, PROCESSING, PACKED, SHIPPED, DELIVERED, CANCELLED, FAILED
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS order_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    product_name VARCHAR(150) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    quantity INT NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

-- 6. PAYMENT DB
USE pcforge_payment_db;
CREATE TABLE IF NOT EXISTS payments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_method VARCHAR(30) NOT NULL, -- UPI_QR, CREDIT_CARD, DEBIT_CARD, CASH_ON_DELIVERY
    transaction_id VARCHAR(100) UNIQUE,
    status VARCHAR(20) NOT NULL, -- CREATED, PENDING, PROCESSING, SUCCESS, FAILED, REFUNDED
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- SAMPLE SEED DATA IN PRODUCT & INVENTORY DB
USE pcforge_product_db;
INSERT INTO products (id, name, brand, category_id, category_name, description, price, discount_price, image_url, specifications, rating) VALUES
(101, 'AMD Ryzen 7 7800X3D', 'AMD', 1, 'CPU', 'Ultimate gaming processor with 3D V-Cache technology.', 36999.00, 34999.00, '/products/ryzen7-7800x3d.jpg', '{"socket":"AM5", "cores":8, "threads":16, "power":120}', 4.9),
(102, 'Intel Core i7-14700K', 'Intel', 1, 'CPU', '20-core desktop processor for extreme gaming and content creation.', 38999.00, 36999.00, '/products/i7-14700k.jpg', '{"socket":"LGA1700", "cores":20, "threads":28, "power":125}', 4.8),
(103, 'NVIDIA GeForce RTX 4070 Ti Super', 'ASUS', 2, 'GPU', '16GB GDDR6X DLSS 3 gaming graphics card.', 79999.00, 75999.00, '/products/rtx-4070ti-super.jpg', '{"vram":"16GB", "power":285, "length_mm":305}', 4.9),
(104, 'NVIDIA GeForce RTX 4060 Ti', 'MSI', 2, 'GPU', '8GB GDDR6 DLSS 3 ultra-fast 1080p/1440p GPU.', 39999.00, 37999.00, '/products/rtx-4060ti.jpg', '{"vram":"8GB", "power":160, "length_mm":242}', 4.6),
(105, 'MSI MAG B650 Tomahawk WiFi', 'MSI', 3, 'MOTHERBOARD', 'ATX AM5 motherboard with DDR5 support and PCIe 4.0.', 21999.00, 20499.00, '/products/msi-b650-tomahawk.jpg', '{"socket":"AM5", "ram_type":"DDR5", "form_factor":"ATX"}', 4.7),
(106, 'ASUS ROG Strix Z790-F Gaming', 'ASUS', 3, 'MOTHERBOARD', 'LGA1700 ATX motherboard with DDR5 & WiFi 6E.', 32999.00, 30999.00, '/products/rog-strix-z790.jpg', '{"socket":"LGA1700", "ram_type":"DDR5", "form_factor":"ATX"}', 4.8),
(107, 'Corsair Vengeance RGB 32GB (2x16GB)', 'Corsair', 4, 'RAM', 'DDR5 6000MHz CL30 AMD EXPO & Intel XMP High Speed RAM.', 11999.00, 10999.00, '/products/corsair-ram-32gb.jpg', '{"ram_type":"DDR5", "capacity":"32GB", "speed":"6000MHz"}', 4.9),
(108, 'Samsung 990 PRO 2TB NVMe M.2 SSD', 'Samsung', 5, 'SSD', '7450 MB/s read speed PCIe Gen4 ultra NVMe SSD.', 17999.00, 15999.00, '/products/samsung-990-pro-2tb.jpg', '{"interface":"PCIe 4.0 NVMe", "capacity":"2TB"}', 5.0),
(109, 'Corsair RM850x 850W 80+ Gold PSU', 'Corsair', 6, 'PSU', 'Fully modular low-noise power supply with ATX 3.0 support.', 13499.00, 12499.00, '/products/corsair-psu-850w.jpg', '{"wattage":850, "efficiency":"80+ Gold"}', 4.9),
(110, 'NZXT H9 Flow Dual-Chamber Cabinet', 'NZXT', 7, 'CABINET', 'ATX Mid-Tower case with high airflow tempered glass.', 14999.00, 13999.00, '/products/nzxt-h9-flow.jpg', '{"form_factor":"ATX", "gpu_clearance_mm":435}', 4.8),
(111, 'Logitech G Pro X Superlight 2 Wireless Mouse', 'Logitech', 11, 'MOUSE', '60g ultra-lightweight gaming mouse with HERO 2 sensor.', 13999.00, 12999.00, '/products/logitech-superlight2.jpg', '{"dpi":32000, "weight":"60g"}', 4.9);

USE pcforge_inventory_db;
INSERT INTO inventory (product_id, available_quantity, reserved_quantity, minimum_stock) VALUES
(101, 15, 0, 3),
(102, 12, 0, 3),
(103, 8, 0, 2),
(104, 20, 0, 5),
(105, 14, 0, 4),
(106, 10, 0, 2),
(107, 25, 0, 5),
(108, 30, 0, 5),
(109, 18, 0, 4),
(110, 10, 0, 2),
(111, 10, 0, 2); -- Gaming Mouse initial stock = 10 for explicit business rule testing
