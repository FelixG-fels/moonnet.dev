#!/usr/bin/env bash
#
# make_icons.sh - Generate raster icon variants from SVG masters
#
# This script uses ImageMagick to convert SVG files to PNG at various sizes,
# creates favicon.ico from the PNGs, and optionally optimizes with pngquant
# and converts to WebP using cwebp.
#
# Usage: ./make_icons.sh
#
# Requirements:
#   - ImageMagick (convert command)
#   - Optional: pngquant (PNG optimization)
#   - Optional: cwebp (WebP conversion)
#   - Optional: zip (for creating the icon archive)

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Output directory for generated files
OUTPUT_DIR="generated"
mkdir -p "$OUTPUT_DIR"

# Icon sizes to generate
SIZES=(16 32 48 180 192 512)

echo "=== MoonNet Icons Build Script ==="
echo ""

# Check for ImageMagick
if ! command -v convert &> /dev/null; then
    echo "ERROR: ImageMagick (convert) is required but not installed."
    echo "Install with: sudo apt-get install imagemagick"
    exit 1
fi

echo "[1/5] Generating PNG icons from favicon.svg..."
for size in "${SIZES[@]}"; do
    output_file="$OUTPUT_DIR/favicon-${size}x${size}.png"
    convert -background none -resize "${size}x${size}" favicon.svg "$output_file"
    echo "  Created: $output_file"
done

echo ""
echo "[2/5] Generating apple-touch-icon from apple-touch-icon.svg..."
convert -background none -resize "180x180" apple-touch-icon.svg "$OUTPUT_DIR/apple-touch-icon.png"
echo "  Created: $OUTPUT_DIR/apple-touch-icon.png"

echo ""
echo "[3/5] Creating favicon.ico from multiple sizes..."
convert "$OUTPUT_DIR/favicon-16x16.png" "$OUTPUT_DIR/favicon-32x32.png" "$OUTPUT_DIR/favicon-48x48.png" "$OUTPUT_DIR/favicon.ico"
echo "  Created: $OUTPUT_DIR/favicon.ico"

echo ""
echo "[4/5] Optional optimizations..."

# PNG optimization with pngquant (optional)
if command -v pngquant &> /dev/null; then
    echo "  Running pngquant optimization..."
    for png in "$OUTPUT_DIR"/*.png; do
        pngquant --quality=65-80 --force --output "$png" "$png" 2>/dev/null || true
    done
    echo "  PNG files optimized with pngquant"
else
    echo "  pngquant not found - skipping PNG optimization"
fi

# WebP conversion with cwebp (optional)
if command -v cwebp &> /dev/null; then
    echo "  Converting to WebP format..."
    for png in "$OUTPUT_DIR"/*.png; do
        webp_file="${png%.png}.webp"
        cwebp -quiet -q 80 "$png" -o "$webp_file" 2>/dev/null || true
        echo "    Created: $webp_file"
    done
else
    echo "  cwebp not found - skipping WebP conversion"
fi

echo ""
echo "[5/5] Creating moonnet-icons.zip archive..."

# Copy site.webmanifest if it exists at repo root
if [ -f "../site.webmanifest" ]; then
    cp "../site.webmanifest" "$OUTPUT_DIR/"
    echo "  Included site.webmanifest in archive"
fi

# Create zip archive
if command -v zip &> /dev/null; then
    cd "$OUTPUT_DIR"
    
    # Build file list for zip
    ZIP_FILES=""
    for f in *.png *.ico; do
        [ -f "$f" ] && ZIP_FILES="$ZIP_FILES $f"
    done
    [ -f "site.webmanifest" ] && ZIP_FILES="$ZIP_FILES site.webmanifest"
    
    if [ -n "$ZIP_FILES" ]; then
        zip -q moonnet-icons.zip $ZIP_FILES
    fi
    
    # Add WebP files if they exist
    if ls *.webp 1> /dev/null 2>&1; then
        zip -qu moonnet-icons.zip *.webp
    fi
    cd "$SCRIPT_DIR"
    echo "  Created: $OUTPUT_DIR/moonnet-icons.zip"
else
    echo "  zip not found - skipping archive creation"
fi

echo ""
echo "=== Build Complete ==="
echo ""
echo "Generated files in $OUTPUT_DIR/:"
ls -la "$OUTPUT_DIR/"
