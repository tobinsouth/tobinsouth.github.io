# tobin.page

Just a little website I made to put stuff places.

Always under construction.

## 🚀 Quick Start

```bash
# Setup and build
npm install
npm run build

# Development server
npm run dev
```

## 📦 Deployment

This site automatically deploys to Cloudflare Pages on push to the main branch. 

- **Production**: Push to `main` → deploys to tobin.page
- **Preview**: Open a PR → get a preview URL

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment documentation.

## 🛠️ Tech Stack

- **Static Site**: HTML, CSS (Tailwind), JavaScript
- **Blog Engine**: Eleventy (11ty)
- **Hosting**: Cloudflare Pages
- **CI/CD**: GitHub Actions

## 📁 Structure

```
/
├── index.html          # Main landing page
├── blog-src/           # Blog source (Eleventy)
├── images/             # Static images
├── style/              # CSS files
└── _site/              # Build output (git ignored)
```

## 🔧 Scripts

- `npm run build` - Build the entire site
- `npm run dev` - Start development server
- `npm run clean` - Clean build directory
- `./scripts/setup.sh` - Initial setup script

## 📋 GitHub Secrets Required

For deployment to work, configure these secrets in your GitHub repository:

1. `CLOUDFLARE_API_TOKEN` - API token with Pages edit permission
2. `CLOUDFLARE_ACCOUNT_ID` - Your Cloudflare account ID
3. `CF_PAGES_PROJECT` - Your Pages project name

## 🤝 Contributing

Feel free to open issues or PRs if you find any bugs or have suggestions!