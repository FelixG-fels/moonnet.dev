# Moonnet DevOps - Copilot Instructions

This repository contains the static landing page for [Moonnet DevOps](https://moonnet.dev), a bilingual AI automation company based in the UAE.

## Project Overview

- **Type**: Static website (HTML, CSS, JavaScript)
- **Deployment**: GitHub Pages via GitHub Actions
- **Languages**: Bilingual support (English and Arabic with RTL)
- **Domain**: moonnet.dev

## Technology Stack

- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Fonts**: Google Fonts (Montserrat, Open Sans)
- **Deployment**: GitHub Pages with custom domain
- **CI/CD**: GitHub Actions (`jekyll-gh-pages.yml`)
- **Security**: CodeQL scanning

## Code Style Guidelines

### HTML
- Use semantic HTML5 elements
- Include both `.en` and `.ar` class elements for bilingual content
- Use `hidden` class to toggle language visibility
- Include proper meta tags for SEO and social media

### CSS
- Use CSS custom properties (variables) for theming:
  - `--navy: #0A1F44` (primary dark color)
  - `--gold: #D4AF37` (accent color)
  - `--white: #FFFFFF`
  - `--light-gray: #F5F7FA`
  - `--dark-gray: #2C3E50`
- Mobile-first responsive design
- Support RTL layout for Arabic using `html[dir="rtl"]` selectors

### JavaScript
- Use vanilla JavaScript (no frameworks)
- Follow ES6+ syntax
- Include proper error handling
- Track events for analytics

## File Structure

```
moonnet.dev/
├── .github/
│   ├── workflows/
│   │   ├── codeql.yml          # Security scanning
│   │   └── jekyll-gh-pages.yml # Static site deployment
│   └── copilot-instructions.md
├── index.html                   # Main landing page
├── main.css                     # Consolidated styles
├── app.js                       # JavaScript application
├── CNAME                        # Custom domain config
└── [images]                     # Logo and favicon assets
```

## Key Features to Preserve

1. **Bilingual Support**: All content must have both English (`.en`) and Arabic (`.ar`) versions
2. **RTL Support**: Arabic content uses right-to-left layout
3. **Responsive Design**: Mobile-first approach with breakpoints at 480px, 640px, 768px, 900px, 1200px
4. **Accessibility**: Proper focus states, reduced motion support, semantic HTML
5. **Performance**: Lazy loading images, throttled scroll events, IntersectionObserver for animations

## Contact Information

- WhatsApp: +971529193409
- Email: felsmoonet@moonnet.dev

## When Making Changes

1. Ensure all text content has both `.en` and `.ar` versions
2. Test RTL layout when modifying CSS
3. Maintain the navy/gold/white color scheme
4. Keep the responsive design intact
5. Run CodeQL checks for security
