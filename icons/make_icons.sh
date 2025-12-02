#!/usr/bin/env bash
# make_icons.sh — Generate MoonNet icon assets from SVG masters
# Requires: ImageMagick (convert)
# Optional: pngquant, cwebp (for optimization)

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(dirname "$SCRIPT_DIR")"
OUTPUT_DIR="$SCRIPT_DIR/generated"

# Icon sizes to generate
SIZES=(16 32 48 192 512)
APPLE_TOUCH_SIZE=180

# Colors
NAVY_BG="#082a4b"

# Create output directory
mkdir -p "$OUTPUT_DIR"

echo "🌙 MoonNet Icon Generator"
echo "========================="

# Check for ImageMagick
if ! command -v convert &> /dev/null; then
    echo "❌ Error: ImageMagick (convert) is required but not installed."
    echo "   Install with: brew install imagemagick (macOS) or apt install imagemagick (Linux)"
    exit 1
fi

echo "✅ ImageMagick found"

# Check for optional tools
HAS_PNGQUANT=false
HAS_CWEBP=false

if command -v pngquant &> /dev/null; then
    HAS_PNGQUANT=true
    echo "✅ pngquant found (PNG optimization enabled)"
else
    echo "ℹ️  pngquant not found (optional PNG optimization disabled)"
fi

if command -v cwebp &> /dev/null; then
    HAS_CWEBP=true
    echo "✅ cwebp found (WebP conversion enabled)"
else
    echo "ℹ️  cwebp not found (optional WebP conversion disabled)"
fi

echo ""
echo "📦 Generating PNG icons..."

# Generate favicon PNGs from favicon.svg
for size in "${SIZES[@]}"; do
    output_file="$OUTPUT_DIR/favicon-${size}x${size}.png"
    echo "   Creating favicon-${size}x${size}.png..."
    convert -background none -density 300 "$SCRIPT_DIR/favicon.svg" \
        -resize "${size}x${size}" \
        -gravity center \
        -extent "${size}x${size}" \
        "$output_file"
done

# Generate apple-touch-icon with navy background from apple-touch-icon.svg
echo "   Creating apple-touch-icon-${APPLE_TOUCH_SIZE}x${APPLE_TOUCH_SIZE}.png (navy background)..."
convert -background "$NAVY_BG" -density 300 "$SCRIPT_DIR/apple-touch-icon.svg" \
    -resize "${APPLE_TOUCH_SIZE}x${APPLE_TOUCH_SIZE}" \
    -gravity center \
    -extent "${APPLE_TOUCH_SIZE}x${APPLE_TOUCH_SIZE}" \
    "$OUTPUT_DIR/apple-touch-icon-${APPLE_TOUCH_SIZE}x${APPLE_TOUCH_SIZE}.png"

# Generate logo PNG at header size (80px height)
echo "   Creating logo-80h.png (header size)..."
convert -background none -density 300 "$SCRIPT_DIR/logo.svg" \
    -resize "x80" \
    "$OUTPUT_DIR/logo-80h.png"

echo ""
echo "🔧 Creating favicon.ico..."
# Create favicon.ico from 16, 32, 48 PNGs
convert "$OUTPUT_DIR/favicon-16x16.png" \
        "$OUTPUT_DIR/favicon-32x32.png" \
        "$OUTPUT_DIR/favicon-48x48.png" \
        "$OUTPUT_DIR/favicon.ico"

# Optional: Optimize PNGs with pngquant
if [ "$HAS_PNGQUANT" = true ]; then
    echo ""
    echo "🗜️  Optimizing PNGs with pngquant..."
    for png in "$OUTPUT_DIR"/*.png; do
        pngquant --force --quality=65-90 --output "$png" "$png" 2>/dev/null || true
    done
fi

# Optional: Create WebP versions
if [ "$HAS_CWEBP" = true ]; then
    echo ""
    echo "🖼️  Creating WebP versions..."
    for png in "$OUTPUT_DIR"/*.png; do
        webp_file="${png%.png}.webp"
        cwebp -q 85 "$png" -o "$webp_file" 2>/dev/null || true
        echo "   Created $(basename "$webp_file")"
    done
fi

echo ""
echo "📦 Creating moonnet-icons.zip..."

# Copy site.webmanifest to output directory for inclusion in zip
if [ -f "$REPO_ROOT/site.webmanifest" ]; then
    cp "$REPO_ROOT/site.webmanifest" "$OUTPUT_DIR/site.webmanifest"
fi

# Create zip archive
cd "$OUTPUT_DIR"
zip -r "$REPO_ROOT/moonnet-icons.zip" . -x "*.zip" > /dev/null
cd "$SCRIPT_DIR"

echo ""
echo "✅ Done! Generated files:"
echo ""
ls -la "$OUTPUT_DIR"
echo ""
echo "📦 Archive: $REPO_ROOT/moonnet-icons.zip"
echo ""
echo "📋 Next steps:"
echo "   1. Copy generated files to your web root"
echo "   2. Update HTML head tags (see example-index.html)"
echo "   3. Deploy site.webmanifest for PWA support"
