# MoonNet Icon Pack

This directory contains the SVG master files and build script for generating MoonNet icon assets.

## Contents

### SVG Masters
- **logo.svg** — Full logo with moon crescent and "MoonNet" wordmark (280×80)
- **favicon.svg** — Simplified moon crescent icon for browser tabs (64×64)
- **apple-touch-icon.svg** — Moon crescent with navy background (#082a4b) for iOS (180×180)

### Build Script
- **make_icons.sh** — Generates PNG/ICO/WebP assets from SVG masters

## Requirements

- **ImageMagick** (`convert`) — Required for PNG/ICO generation
- **pngquant** (optional) — PNG optimization
- **cwebp** (optional) — WebP conversion

### Installing Dependencies

**macOS (Homebrew):**
```bash
brew install imagemagick pngquant webp
```

**Ubuntu/Debian:**
```bash
sudo apt install imagemagick pngquant webp
```

**Windows (Chocolatey):**
```powershell
choco install imagemagick pngquant webp
```

## Usage

Run the build script from the icons directory:

```bash
cd icons
./make_icons.sh
```

Or from the repository root:

```bash
./icons/make_icons.sh
```

## Generated Files

After running `make_icons.sh`, the following files are created in `icons/generated/`:

| File | Size | Purpose |
|------|------|---------|
| `favicon-16x16.png` | 16×16 | Browser tab icon (small) |
| `favicon-32x32.png` | 32×32 | Browser tab icon (standard) |
| `favicon-48x48.png` | 48×48 | Browser tab icon (retina) |
| `favicon-192x192.png` | 192×192 | PWA icon (Android) |
| `favicon-512x512.png` | 512×512 | PWA splash icon |
| `apple-touch-icon-180x180.png` | 180×180 | iOS home screen icon (navy bg) |
| `logo-80h.png` | auto×80 | Header logo (80px height) |
| `favicon.ico` | multi | Combined 16/32/48 ICO file |

If optional tools are available:
- `*.webp` — WebP versions of all PNG files
- Optimized PNGs via pngquant

A zip archive `moonnet-icons.zip` is created in the repository root containing all generated assets plus `site.webmanifest`.

## HTML Integration

See `example-index.html` in the repository root for recommended head tags:

```html
<!-- Favicon -->
<link rel="icon" type="image/svg+xml" href="icons/favicon.svg">
<link rel="icon" type="image/png" sizes="32x32" href="icons/generated/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="icons/generated/favicon-16x16.png">
<link rel="shortcut icon" href="icons/generated/favicon.ico">

<!-- Apple Touch Icon -->
<link rel="apple-touch-icon" sizes="180x180" href="icons/generated/apple-touch-icon-180x180.png">

<!-- PWA Manifest -->
<link rel="manifest" href="site.webmanifest">
<meta name="theme-color" content="#082a4b">
```

## Notes

- The apple-touch-icon uses a navy background (#082a4b) for optimal appearance on iOS home screens.
- The logo SVG includes the full wordmark and is suitable for headers at 80px height.
- SVG favicons are preferred for modern browsers; PNG fallbacks ensure compatibility.

## License

These icons are proprietary to MoonNet DevOps. All rights reserved.
