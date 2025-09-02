#!/usr/bin/env python3
"""
Process one logo at a time with AI upscaling
"""

import os
import sys
from pathlib import Path
from PIL import Image
from super_image import EdsrModel, ImageLoader
import torch

def upscale_single_image(input_path, output_path=None, scale=2):
    """
    Upscale a single image
    
    Args:
        input_path: Path to input image
        output_path: Optional output path (auto-generated if None)
        scale: Upscaling factor (2 or 4)
    """
    input_path = Path(input_path)
    
    if not input_path.exists():
        print(f"Error: File not found: {input_path}")
        return None
    
    # Auto-generate output path if not provided
    if output_path is None:
        output_dir = input_path.parent / "upscaled"
        output_dir.mkdir(exist_ok=True)
        output_path = output_dir / f"{input_path.stem}_upscaled_{scale}x{input_path.suffix}"
    else:
        output_path = Path(output_path)
        output_path.parent.mkdir(parents=True, exist_ok=True)
    
    print(f"Loading {scale}x upscaling model...")
    try:
        model = EdsrModel.from_pretrained('eugenesiow/edsr-base', scale=scale)
    except Exception as e:
        print(f"Error loading model: {e}")
        return None
    
    print(f"Processing: {input_path.name}")
    print(f"Input path: {input_path}")
    
    # Load image
    try:
        image = Image.open(input_path)
        original_size = image.size
        print(f"Original size: {original_size[0]}x{original_size[1]}")
        print(f"Image mode: {image.mode}")
    except Exception as e:
        print(f"Error loading image: {e}")
        return None
    
    # Handle transparency
    has_alpha = image.mode == 'RGBA'
    alpha_channel = None
    
    if has_alpha:
        print("Preserving transparency...")
        alpha_channel = image.split()[-1]
        # Create RGB image with white background
        rgb_image = Image.new("RGB", image.size, (255, 255, 255))
        rgb_image.paste(image, mask=alpha_channel)
        image = rgb_image
    elif image.mode != 'RGB':
        print(f"Converting from {image.mode} to RGB...")
        image = image.convert('RGB')
    
    # Prepare for model
    print("Running AI upscaling (this may take a moment)...")
    try:
        # Load image for model
        inputs = ImageLoader.load_image(image)
        
        # Run model
        with torch.no_grad():
            preds = model(inputs)
        
        # Convert tensor to PIL Image
        import numpy as np
        
        # Get the output tensor and convert to numpy
        output_tensor = preds.squeeze(0)  # Remove batch dimension
        output_np = output_tensor.permute(1, 2, 0).cpu().numpy()  # CHW to HWC
        
        # Convert from normalized values to 0-255
        output_np = np.clip(output_np * 255, 0, 255).astype(np.uint8)
        
        # Create PIL Image
        output_image = Image.fromarray(output_np)
        new_size = output_image.size
        print(f"Upscaled size: {new_size[0]}x{new_size[1]}")
        
    except Exception as e:
        print(f"Error during upscaling: {e}")
        import traceback
        traceback.print_exc()
        return None
    
    # Restore transparency
    if has_alpha and alpha_channel is not None:
        print("Restoring transparency...")
        try:
            alpha_upscaled = alpha_channel.resize(new_size, Image.LANCZOS)
            output_image.putalpha(alpha_upscaled)
        except Exception as e:
            print(f"Warning: Could not restore transparency: {e}")
    
    # Save result
    try:
        output_image.save(output_path, 'PNG', optimize=True)
        print(f"✓ Saved to: {output_path}")
        
        # Print size comparison
        original_pixels = original_size[0] * original_size[1]
        new_pixels = new_size[0] * new_size[1]
        increase = (new_pixels / original_pixels - 1) * 100
        print(f"Size increase: {increase:.1f}%")
        
        return output_path
        
    except Exception as e:
        print(f"Error saving image: {e}")
        return None

def main():
    """Main function for command-line usage"""
    if len(sys.argv) < 2:
        print("Usage: python upscale_single.py <image_path> [scale] [output_path]")
        print("  image_path: Path to the image to upscale")
        print("  scale: Upscaling factor (2 or 4, default: 2)")
        print("  output_path: Optional output path")
        print("\nExample:")
        print("  python upscale_single.py logo.png")
        print("  python upscale_single.py logo.png 4")
        print("  python upscale_single.py logo.png 2 output/logo_big.png")
        sys.exit(1)
    
    input_path = sys.argv[1]
    scale = int(sys.argv[2]) if len(sys.argv) > 2 else 2
    output_path = sys.argv[3] if len(sys.argv) > 3 else None
    
    if scale not in [2, 4]:
        print("Error: Scale must be 2 or 4")
        sys.exit(1)
    
    print(f"\n{'='*50}")
    print(f"AI Logo Upscaler - {scale}x Enhancement")
    print('='*50)
    
    result = upscale_single_image(input_path, output_path, scale)
    
    if result:
        print(f"\n✓ Success! Upscaled image saved.")
    else:
        print(f"\n✗ Failed to upscale image.")
        sys.exit(1)

if __name__ == "__main__":
    main()