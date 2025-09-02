#!/usr/bin/env python3
"""
AI-powered logo upscaling script using super-image
"""

import os
from pathlib import Path
from PIL import Image
from super_image import EdsrModel, ImageLoader
import torch

def upscale_image(input_path, output_path, scale=2):
    """
    Upscale an image using EDSR model
    
    Args:
        input_path: Path to input image
        output_path: Path to save upscaled image
        scale: Upscaling factor (2 or 4)
    """
    # Load the appropriate model based on scale
    if scale == 2:
        model = EdsrModel.from_pretrained('eugenesiow/edsr-base', scale=2)
    elif scale == 4:
        model = EdsrModel.from_pretrained('eugenesiow/edsr-base', scale=4)
    else:
        raise ValueError("Scale must be 2 or 4")
    
    # Load and process the image
    image = Image.open(input_path)
    
    # Convert RGBA to RGB if necessary (keeping transparency for later)
    has_alpha = image.mode == 'RGBA'
    if has_alpha:
        # Save alpha channel
        alpha = image.split()[-1]
        # Convert to RGB for processing
        rgb_image = Image.new("RGB", image.size, (255, 255, 255))
        rgb_image.paste(image, mask=alpha)
        image = rgb_image
    
    # Prepare image for model
    inputs = ImageLoader.load_image(image)
    
    # Run the model
    with torch.no_grad():
        preds = model(inputs)
    
    # Convert output back to PIL Image
    output_image = ImageLoader.get_image(preds[0])
    
    # Restore alpha channel if original had transparency
    if has_alpha:
        # Upscale alpha channel using standard PIL resize
        new_size = output_image.size
        alpha_upscaled = alpha.resize(new_size, Image.LANCZOS)
        # Combine RGB with alpha
        output_image.putalpha(alpha_upscaled)
    
    # Save the upscaled image
    output_image.save(output_path, 'PNG')
    print(f"Upscaled: {input_path} -> {output_path}")
    
    # Return size information
    original_size = image.size if not has_alpha else Image.open(input_path).size
    new_size = output_image.size
    return original_size, new_size

def process_folder(input_folder, output_folder, scale=2):
    """
    Process all PNG images in a folder
    
    Args:
        input_folder: Path to folder with input images
        output_folder: Path to folder for upscaled images
        scale: Upscaling factor (2 or 4)
    """
    input_path = Path(input_folder)
    output_path = Path(output_folder)
    output_path.mkdir(parents=True, exist_ok=True)
    
    # Get all PNG files
    png_files = list(input_path.glob("*.png"))
    
    if not png_files:
        print(f"No PNG files found in {input_folder}")
        return
    
    print(f"Found {len(png_files)} PNG files to process")
    print(f"Upscaling with {scale}x factor")
    print("-" * 50)
    
    results = []
    for png_file in png_files:
        try:
            output_file = output_path / f"{png_file.stem}_upscaled_{scale}x.png"
            original_size, new_size = upscale_image(png_file, output_file, scale)
            results.append({
                'file': png_file.name,
                'original': original_size,
                'upscaled': new_size
            })
        except Exception as e:
            print(f"Error processing {png_file.name}: {e}")
    
    # Print summary
    print("\n" + "=" * 50)
    print("UPSCALING SUMMARY")
    print("=" * 50)
    for result in results:
        print(f"{result['file']}")
        print(f"  Original: {result['original'][0]}x{result['original'][1]}")
        print(f"  Upscaled: {result['upscaled'][0]}x{result['upscaled'][1]}")
        print()

if __name__ == "__main__":
    # Process trial folder with 2x upscaling
    trial_folder = "/Users/kylekirwan/github/mds-logos/public/logos/trial"
    output_folder = "/Users/kylekirwan/github/mds-logos/public/logos/trial_upscaled_2x"
    
    print("Starting logo upscaling process...")
    print(f"Input folder: {trial_folder}")
    print(f"Output folder: {output_folder}")
    print()
    
    process_folder(trial_folder, output_folder, scale=2)
    
    print("\nUpscaling complete!")
    print(f"Upscaled images saved to: {output_folder}")