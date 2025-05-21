import os
from PIL import Image
import shutil

# Define input and output directories
input_dir = "src/assets/images"
output_dir = "src/assets/images"
archive_dir = "archiveimages"

os.makedirs(archive_dir, exist_ok=True)

# Make output directory if it doesn't exist
os.makedirs(output_dir, exist_ok=True)

# Loop through all files in the input directory
for filename in os.listdir(input_dir):
    if filename.lower().endswith(".png") or filename.lower().endswith(".webp"):
        png_path = os.path.join(input_dir, filename)
        jpg_filename = os.path.splitext(filename)[0] + ".jpg"
        jpg_path = os.path.join(output_dir, jpg_filename)

        # Open and convert the image
        with Image.open(png_path) as im:
            background = Image.new("RGB", im.size, (255, 255, 255))
            if im.mode == "RGBA":
                background.paste(im, mask=im.split()[3])  # use alpha channel as mask
            else:
                background.paste(im)

            rgb_im = background
            rgb_im.save(jpg_path, "JPEG")

        archived_path = os.path.join(archive_dir, filename)
        shutil.move(png_path, archived_path)

        print(f"Converted: {filename} -> {jpg_filename}")
