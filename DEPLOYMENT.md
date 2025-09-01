# Deployment Guide

This site is automatically deployed to Cloudflare Pages.

## 🚀 Automatic Deployment

### Production Deployment
- **Trigger**: Push to `main` branch
- **URL**: https://tobin.page (or your configured domain)
- **Process**: Automatic via GitHub Actions

### Preview Deployment
- **Trigger**: Pull requests to `main` branch
- **URL**: Automatically generated preview URL
- **Process**: Automatic via GitHub Actions

## 📋 Prerequisites

### Required GitHub Secrets
Configure these in your repository settings under Settings → Secrets and variables → Actions:

1. **`CLOUDFLARE_API_TOKEN`** (Required)
   - Create at: https://dash.cloudflare.com/profile/api-tokens
   - Required permissions:
     - Cloudflare Pages:Edit
     - Account:Cloudflare Pages:Read

2. **`CLOUDFLARE_ACCOUNT_ID`** (Required)
   - Find in Cloudflare dashboard → Right sidebar

3. **`CF_PAGES_PROJECT`** (Required)
   - Your Cloudflare Pages project name (e.g., "tobin-website")

4. **`CF_PAGES_URL`** (Optional)
   - Your production URL for validation (defaults to https://tobin.page)

## 🛠️ Local Development

### Setup
```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

### Build locally
```bash
# Build the site
npm run build

# The built site will be in _site/
```

## 📁 Project Structure

```
/
├── index.html          # Main landing page
├── blog-src/           # Blog source files (Eleventy)
│   ├── posts/          # Blog posts in Markdown
│   └── _includes/      # Blog templates
├── images/             # Static images
├── style/              # CSS files
├── _site/              # Built site (git ignored)
└── .github/workflows/  # CI/CD pipelines
```

## 🔄 CI/CD Workflows

### Main Deployment Workflow (`deploy.yml`)
- Builds and deploys to Cloudflare Pages
- Runs on push to main and PRs
- Includes build verification
- Posts preview URLs to PRs

### Test Workflow (`test.yml`)
- Tests build on multiple Node versions (18, 20, 22)
- Validates HTML structure
- Checks for broken links
- Basic accessibility checks
- Runs on all pushes and PRs

## 🏗️ Build Process

1. **Clean**: Remove previous build
2. **Copy Static Files**: Copy all static assets to `_site/`
3. **Build Blog**: Run Eleventy to generate blog pages
4. **Deploy**: Upload `_site/` to Cloudflare Pages

## 🐛 Troubleshooting

### Build Fails
- Check `package-lock.json` is committed
- Verify all static files exist
- Check GitHub Actions logs

### Deployment Fails
- Verify GitHub secrets are set correctly
- Check Cloudflare API token permissions
- Ensure project name matches in Cloudflare

### Preview URLs Not Working
- Check PR has proper permissions
- Verify `GITHUB_TOKEN` is available
- Check Cloudflare Pages settings

## 📊 Monitoring

- **Build Status**: Check GitHub Actions tab
- **Deployment Status**: View in Cloudflare Pages dashboard
- **Analytics**: Available in Cloudflare dashboard

## 🔒 Security

- All secrets stored in GitHub Secrets
- Automatic security headers via Cloudflare
- No sensitive data in repository
- Regular dependency updates recommended

## 📝 Making Changes

1. Create a feature branch
2. Make your changes
3. Test locally with `npm run build`
4. Create a pull request
5. Review preview deployment
6. Merge to main for production deployment

## 🆘 Support

For issues with:
- **Build/Deploy**: Check GitHub Actions logs
- **Cloudflare**: Check Cloudflare Pages dashboard
- **Domain/DNS**: Verify in Cloudflare DNS settings