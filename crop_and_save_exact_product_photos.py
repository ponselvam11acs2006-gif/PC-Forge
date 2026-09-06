import os
from PIL import Image

ref_image_path = r"C:\Users\ponse\.gemini\antigravity\brain\79c3a5cb-29ac-4e49-9649-ee7fd4e0b033\media__1788362072397.jpg"
out_base = r"d:\Microservice\PCForge\frontend\public\products"

img = Image.open(ref_image_path)
width, height = img.size

# Coordinates of the 10 product cards in the 2x5 grid
# Format: (rel_x_start, rel_y_start, rel_x_end, rel_y_end) relative to grid cells
# Image size is (1024, 682)

# 5 Columns, 2 Rows
col_w = width / 5.0
row_h = height / 2.0

# 10 Products specification mapping
products = [
    # Row 0 (Top row)
    {"col": 0, "row": 0, "path": "cpu/ryzen-7-7800x3d", "name": "AMD Ryzen 7 7800X3D Processor"},
    {"col": 1, "row": 0, "path": "cpu/ryzen-5-7600x", "name": "AMD Ryzen 5 7600X Desktop CPU"},
    {"col": 2, "row": 0, "path": "cpu/core-i5-13400f", "name": "Intel Core i5-13400F 10-Core CPU"},
    {"col": 3, "row": 0, "path": "gpu/rtx-4070-ti-super", "name": "NVIDIA GeForce RTX 4070 Ti Super 16GB"},
    {"col": 4, "row": 0, "path": "gpu/rtx-3060", "name": "ZOTAC Gaming RTX 3060 12GB Twin Edge"},

    # Row 1 (Bottom row)
    {"col": 0, "row": 1, "path": "gpu/gtx-1650", "name": "MSI Ventus GeForce GTX 1650 4GB OC"},
    {"col": 1, "row": 1, "path": "motherboard/gigabyte-h610m-s2h", "name": "Gigabyte H610M S2H DDR4 Motherboard"},
    {"col": 2, "row": 1, "path": "motherboard/asus-b660m-a", "name": "ASUS Prime B660M-A WiFi D4 Motherboard"},
    {"col": 3, "row": 1, "path": "motherboard/msi-b650-tomahawk", "name": "MSI MAG B650 Tomahawk WiFi Motherboard"},
    {"col": 4, "row": 1, "path": "monitor/dell-ultrasharp-27", "name": "Dell UltraSharp 27 4K USB-C IPS Monitor"}
]

for p in products:
    c = p["col"]
    r = p["row"]

    # Calculate precise bounding box of the product image area inside each card cell
    x1 = int(c * col_w + col_w * 0.05)
    x2 = int((c + 1) * col_w - col_w * 0.05)

    if r == 0:
        y1 = int(r * row_h + row_h * 0.05)
        y2 = int((r + 1) * row_h - row_h * 0.46)
    else:
        y1 = int(r * row_h + row_h * 0.05)
        y2 = int((r + 1) * row_h - row_h * 0.46)

    cropped = img.crop((x1, y1, x2, y2))

    # Save to path with .jpg, .webp, .png, .svg
    target_rel = p["path"]
    full_path_jpg = os.path.join(out_base, f"{target_rel}.jpg")
    full_path_webp = os.path.join(out_base, f"{target_rel}.webp")
    full_path_png = os.path.join(out_base, f"{target_rel}.png")

    os.makedirs(os.path.dirname(full_path_jpg), exist_ok=True)

    cropped.save(full_path_jpg, "JPEG", quality=95)
    cropped.save(full_path_webp, "WEBP", quality=95)
    cropped.save(full_path_png, "PNG")

    print(f"Cropped & saved exact product photo for {p['name']} -> {target_rel}")

print("Successfully cropped all 10 product photographs from the reference image!")
