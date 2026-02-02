#!/bin/bash

echo "🎓 UAF CGPA Calculator - Setup Script"
echo "======================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

# Check Node version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18 or higher is required."
    echo "Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "✅ Dependencies installed successfully!"
echo ""

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local file..."
    cp .env.example .env.local
    echo "✅ .env.local created"
else
    echo "ℹ️  .env.local already exists"
fi

echo ""
echo "✨ Setup complete! You can now run the application:"
echo ""
echo "   npm run dev     - Start development server"
echo "   npm run build   - Build for production"
echo "   npm start       - Start production server"
echo ""
echo "🌐 The app will be available at http://localhost:3000"
echo ""
echo "Made by Adil | Scraping logic credits: Original UAF Result Scraper"
echo ""
