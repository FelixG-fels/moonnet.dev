# MoonNet Icons

This directory contains the SVG master files and a build script for generating raster icon variants for the MoonNet DevOps site.

## SVG Master Files

| File | Description |
|------|-------------|
| `logo.svg` | Full logo with moon crescent and "Moonnet DevOps" text |
| `favicon.svg` | Square moon crescent icon for browser tabs |
| `apple-touch-icon.svg` | Moon crescent on navy (#082a4b) background for iOS |

## Build Script

The `make_icons.sh` script generates raster variants from the SVG masters.

### Requirements

- **ImageMagick** (required) - for SVG to PNG/ICO conversion
- **pngquant** (optional) - for PNG optimization
- **cwebp** (optional) - for WebP conversion
- **zip** (optional) - for creating the icon archive

### Installation (Ubuntu/Debian)

```bash
# Required
sudo apt-get install imagemagick

# Optional tools
sudo apt-get install pngquant webp zip
```

### Usage

```bash
cd icons
./make_icons.sh
```

### Generated Files

After running the script, the `generated/` directory will contain:

| File | Size | Description |
|------|------|-------------|
| `favicon-16x16.png` | 16×16 | Browser tab favicon |
| `favicon-32x32.png` | 32×32 | Browser tab favicon (HiDPI) |
| `favicon-48x48.png` | 48×48 | Windows site icon |
| `favicon-180x180.png` | 180×180 | iOS Safari favicon |
| `favicon-192x192.png` | 192×192 | Android Chrome icon |
| `favicon-512x512.png` | 512×512 | PWA splash icon |
| `apple-touch-icon.png` | 180×180 | iOS home screen icon |
| `favicon.ico` | Multi-size | Combined ICO (16, 32, 48) |
| `*.webp` | Various | WebP variants (if cwebp installed) |
| `moonnet-icons.zip` | - | Archive with all assets |

## Color Palette

- **Navy**: `#0A1F44` (main brand color)
- **Navy (apple-touch)**: `#082a4b` (iOS icon background)
- **Gold**: `#D4AF37` (accent color)

## Usage in HTML

See `example-index.html` at the repository root for a complete example of favicon and header implementation.

### Quick Reference

```html
<!-- Favicon links -->
<link rel="icon" type="image/svg+xml" href="icons/favicon.svg">
<link rel="icon" type="image/png" sizes="32x32" href="icons/generated/favicon-32x32.png">
<link rel="apple-touch-icon" sizes="180x180" href="icons/generated/apple-touch-icon.png">
<link rel="manifest" href="site.webmanifest">
<meta name="theme-color" content="#0A1F44">

<!-- Header logo (80px height) -->
<img src="icons/logo.svg" alt="Moonnet DevOps" height="80">
```
