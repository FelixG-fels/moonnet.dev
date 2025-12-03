# moonnet.dev

Moonnet DevOps is a bilingual AI automation company based in the UAE, specializing in AI-powered chatbots, booking systems, and CRM integrations for businesses in the region.

This repository contains the static landing page for [moonnet.dev](https://moonnet.dev), deployed via GitHub Pages.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
- [Custom Domain Setup](#custom-domain-setup)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This project is the official website for Moonnet DevOps, maintained by [FelixG-fels](https://github.com/FelixG-fels). The site showcases our bilingual AI automation services designed specifically for UAE businesses.

## Features

- **Bilingual Support**: Full English and Arabic language support
- **Responsive Design**: Mobile-first design that works on all devices
- **GitHub Pages Hosting**: Free, reliable hosting via GitHub Pages
- **Custom Domain**: Configured for moonnet.dev domain

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- A web browser for local preview

### Local Development

1. **Clone the repository:**
   ```sh
   git clone https://github.com/FelixG-fels/moonnet.dev.git
   cd moonnet.dev
   ```

2. **Open locally:**
   Simply open `index.html` in your browser to preview the site.

3. **Deploy:**
   Push changes to the `main` branch and GitHub Actions will automatically deploy to GitHub Pages.

## Custom Domain Setup

This site is configured to use `moonnet.dev` as the custom domain. If you purchased the domain from Namecheap (or any other registrar), follow these steps to connect it:

### Step 1: Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. The site should deploy automatically via the existing workflow

### Step 2: Configure Custom Domain in GitHub

1. In **Settings** → **Pages**, scroll to **Custom domain**
2. Enter `moonnet.dev` and click **Save**
3. Check the box for **Enforce HTTPS** (recommended)

### Step 3: Configure DNS at Namecheap

1. Log in to your [Namecheap account](https://www.namecheap.com/)
2. Go to **Domain List** → Select `moonnet.dev` → **Manage**
3. Navigate to the **Advanced DNS** tab
4. Remove any existing A or CNAME records for the root domain
5. Add the following **A Records** (for apex domain `moonnet.dev`):

   | Type | Host | Value | TTL |
   |------|------|-------|-----|
   | A Record | @ | 185.199.108.153 | Automatic |
   | A Record | @ | 185.199.109.153 | Automatic |
   | A Record | @ | 185.199.110.153 | Automatic |
   | A Record | @ | 185.199.111.153 | Automatic |

6. Add a **CNAME Record** for the `www` subdomain:

   | Type | Host | Value | TTL |
   |------|------|-------|-----|
   | CNAME Record | www | FelixG-fels.github.io. | Automatic |

   > **Note**: The CNAME value should be your GitHub username followed by `.github.io` (without the repository name). GitHub handles routing to the correct repository based on the CNAME file.

### Step 4: Verify Configuration

1. DNS changes can take up to 24-48 hours to propagate (usually much faster)
2. You can check propagation at [whatsmydns.net](https://www.whatsmydns.net/)
3. Once propagated, visit `https://moonnet.dev` to see your site
4. GitHub will automatically provision an SSL certificate for HTTPS

### Troubleshooting

#### DNS_PROBE_FINISHED_NXDOMAIN Error

If you see this error when visiting moonnet.dev, it means DNS records are not configured at your domain registrar. Follow these steps:

1. **Verify DNS records are set**: Log into your domain registrar (e.g., Namecheap) and ensure all A records and CNAME records are configured as shown in Step 3 above.

2. **Check DNS propagation**: Use [whatsmydns.net](https://www.whatsmydns.net/#A/moonnet.dev) to verify your A records are propagating globally.

3. **Test from command line**:
   ```bash
   # Check if A records are configured
   dig moonnet.dev +short
   # Should return: 185.199.108.153, 185.199.109.153, etc.
   
   # Check CNAME for www subdomain
   dig www.moonnet.dev +short
   # Should return: felixg-fels.github.io
   ```

4. **Verify in GitHub**: Go to repository **Settings** → **Pages** and check if there are any DNS verification warnings.

5. **Try the default GitHub URL**: While waiting for DNS, your site should be accessible at: https://felixg-fels.github.io/moonnet.dev

#### Other Common Issues

- **Site not loading**: Wait for DNS propagation (can take up to 48 hours)
- **HTTPS not working**: Ensure "Enforce HTTPS" is enabled in GitHub Pages settings after DNS is verified
- **404 errors**: Check that the `CNAME` file exists in your repository root (this repository already includes it with the content `moonnet.dev`). If missing, GitHub automatically creates it when you enter your custom domain in the Pages settings

### DNS Records Summary

GitHub Pages requires these IP addresses for apex domains:
- `185.199.108.153`
- `185.199.109.153`
- `185.199.110.153`
- `185.199.111.153`

For more details, see [GitHub's official documentation on custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for improvements and bug fixes.

1. Fork this project.
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

*Project maintained by [@FelixG-fels](https://github.com/FelixG-fels)*
