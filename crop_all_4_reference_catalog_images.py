import os
from PIL import Image

brain_dir = r"C:\Users\ponse\.gemini\antigravity\brain\79c3a5cb-29ac-4e49-9649-ee7fd4e0b033"
out_base = r"d:\Microservice\PCForge\frontend\public\products"

def crop_grid_images(img_filename, item_map):
    full_img_path = os.path.join(brain_dir, img_filename)
    if not os.path.exists(full_img_path):
        print(f"Warning: File {img_filename} not found!")
        return

    img = Image.open(full_img_path)
    width, height = img.size
    col_w = width / 5.0
    row_h = height / 2.0

    for item in item_map:
        c = item["col"]
        r = item["row"]

        # Calculate bounding box for product image above text
        x1 = int(c * col_w + col_w * 0.04)
        x2 = int((c + 1) * col_w - col_w * 0.04)

        y1 = int(r * row_h + row_h * 0.04)
        y2 = int((r + 1) * row_h - row_h * 0.46)

        cropped = img.crop((x1, y1, x2, y2))

        target_rel = item["path"]
        jpg_path = os.path.join(out_base, f"{target_rel}.jpg")
        webp_path = os.path.join(out_base, f"{target_rel}.webp")
        png_path = os.path.join(out_base, f"{target_rel}.png")

        os.makedirs(os.path.dirname(jpg_path), exist_ok=True)

        cropped.save(jpg_path, "JPEG", quality=98)
        cropped.save(webp_path, "WEBP", quality=98)
        cropped.save(png_path, "PNG")

        print(f"Extracted [{target_rel}] from {img_filename}")

# Image 1 Map (CPUs, GPUs, Motherboards, Dell 4K Monitor)
map_img1 = [
    {"col": 0, "row": 0, "path": "cpu/ryzen-7-7800x3d"},
    {"col": 1, "row": 0, "path": "cpu/ryzen-5-7600x"},
    {"col": 2, "row": 0, "path": "cpu/core-i5-13400f"},
    {"col": 3, "row": 0, "path": "gpu/rtx-4070-ti-super"},
    {"col": 4, "row": 0, "path": "gpu/rtx-3060"},

    {"col": 0, "row": 1, "path": "gpu/gtx-1650"},
    {"col": 1, "row": 1, "path": "motherboard/gigabyte-h610m-s2h"},
    {"col": 2, "row": 1, "path": "motherboard/asus-b660m-a"},
    {"col": 3, "row": 1, "path": "motherboard/msi-b650-tomahawk"},
    {"col": 4, "row": 1, "path": "monitor/dell-ultrasharp-27"}
]

# Image 2 Map (Dell Gaming & Lenovo Monitors, RAMs, SSDs, HDDs)
map_img2 = [
    {"col": 0, "row": 0, "path": "monitor/dell-s2721dgf"},
    {"col": 1, "row": 0, "path": "monitor/lenovo-legion-24-5"},
    {"col": 2, "row": 0, "path": "ram/corsair-vengeance-ddr5"},
    {"col": 3, "row": 0, "path": "ram/gskill-tridentz5-ddr5"},
    {"col": 4, "row": 0, "path": "ram/kingston-fury-ddr4"},

    {"col": 0, "row": 1, "path": "ssd/samsung-990-pro-2tb"},
    {"col": 1, "row": 1, "path": "ssd/wd-black-sn850x-1tb"},
    {"col": 2, "row": 1, "path": "ssd/crucial-p3-512gb"},
    {"col": 3, "row": 1, "path": "hdd/seagate-barracuda-2tb"},
    {"col": 4, "row": 1, "path": "hdd/wd-blue-1tb"}
]

# Image 3 Map (HDDs, PSUs, PC Cabinets, Keyboards)
map_img3 = [
    {"col": 0, "row": 0, "path": "hdd/seagate-barracuda-2tb"},
    {"col": 1, "row": 0, "path": "hdd/wd-blue-1tb"},
    {"col": 2, "row": 0, "path": "psu/corsair-rm850x"},
    {"col": 3, "row": 0, "path": "psu/cooler-master-mwe-550w"},
    {"col": 4, "row": 0, "path": "psu/ant-esports-vs500l"},

    {"col": 0, "row": 1, "path": "case/nzxt-h9-flow"},
    {"col": 1, "row": 1, "path": "case/ant-esports-ice100"},
    {"col": 2, "row": 1, "path": "keyboard/corsair-k70-rgb"},
    {"col": 3, "row": 1, "path": "keyboard/logitech-mx-keys"},
    {"col": 4, "row": 1, "path": "keyboard/zebronics-transformer-kb"}
]

# Image 4 Map (Mice, Headsets, Accessories)
map_img4 = [
    {"col": 0, "row": 0, "path": "mouse/logitech-superlight2"},
    {"col": 1, "row": 0, "path": "mouse/zebronics-transformer-mouse"},
    {"col": 2, "row": 0, "path": "headset/hyperx-cloud-2"},
    {"col": 3, "row": 0, "path": "headset/razer-blackshark-v2x"},
    {"col": 4, "row": 0, "path": "accessories/ant-esports-mousepad"},

    {"col": 0, "row": 1, "path": "accessories/hdmi-21-cable"},
    {"col": 1, "row": 1, "path": "accessories/usbc-displayport-adapter"}
]

crop_grid_images("media__1788362072397.jpg", map_img1)
crop_grid_images("media__1788362289506.jpg", map_img2)
crop_grid_images("media__1788362476655.jpg", map_img3)
crop_grid_images("media__1788362485296.jpg", map_img4)

print("Successfully cropped and saved ALL 33 products from all 4 reference catalog images!")
