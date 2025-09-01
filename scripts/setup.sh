#!/bin/bash

# Setup script for local development
set -e

echo "🚀 Setting up Tobin's Blog & Website"
echo "======================================"

# Check Node.js version
echo "📦 Checking Node.js version..."
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Error: Node.js 18 or higher is required (found v$NODE_VERSION)"
    exit 1
fi
echo "✅ Node.js version OK (v$(node -v | cut -d'v' -f2))"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
if [ -f "package-lock.json" ]; then
    npm ci
else
    npm install
fi
echo "✅ Dependencies installed"

# Build the site
echo ""
echo "🔨 Building site..."
npm run build
echo "✅ Build complete"

# Verify build
echo ""
echo "🔍 Verifying build..."
if [ ! -d "_site" ]; then
    echo "❌ Error: _site directory not found"
    exit 1
fi

if [ ! -f "_site/index.html" ]; then
    echo "❌ Error: _site/index.html not found"
    exit 1
fi

echo "✅ Build verified successfully"

# Summary
echo ""
echo "======================================"
echo "✨ Setup complete!"
echo ""
echo "Available commands:"
echo "  npm run dev    - Start development server"
echo "  npm run build  - Build the site"
echo "  npm run clean  - Clean build directory"
echo ""
echo "The site is built in the _site/ directory"
echo "======================================="