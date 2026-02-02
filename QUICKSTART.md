# Quick Start Guide 🚀

Get your UAF CGPA Calculator running in 3 minutes!

## Step 1: Prerequisites ✅

Make sure you have installed:
- **Node.js 18+**: Download from [nodejs.org](https://nodejs.org/)
- **npm** (comes with Node.js)

Check your installation:
```bash
node --version  # Should be v18.0.0 or higher
npm --version
```

## Step 2: Install 📦

### Option A: Automatic Setup (Linux/Mac)
```bash
./setup.sh
```

### Option B: Manual Setup (Windows/All Platforms)
```bash
npm install
```

## Step 3: Run 🏃

Start the development server:
```bash
npm run dev
```

Visit: **http://localhost:3000**

## Step 4: Use the App 💻

1. Enter your UAF registration number (format: `2021-ag-1234`)
2. Click "Get My CGPA"
3. Wait for results to load
4. Click "Reveal CGPA" to see your cumulative GPA with sound effect!

## Project Structure 📁

```
uaf-cgpa-calculator/
├── app/              # Next.js app directory
│   ├── api/         # Backend API routes
│   └── page.tsx     # Main page
├── components/      # React components
├── lib/scraper/     # UAF LMS scraping logic
├── utils/           # Helper functions
└── types/           # TypeScript types
```

## Common Commands 🛠️

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run linter |

## Features Overview ✨

- ✅ **Real Data Fetching**: Scrapes actual results from UAF LMS
- ✅ **CGPA Calculation**: Automatic GPA and CGPA calculation
- ✅ **Blur Effect**: CGPA hidden until revealed
- ✅ **Sound Effect**: Plays sound on CGPA reveal
- ✅ **Modern UI**: Beautiful, responsive design
- ✅ **Dark Mode**: Support for dark theme
- ✅ **Semester Breakdown**: Detailed course information

## Troubleshooting 🔧

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000
# Or use a different port
PORT=3001 npm run dev
```

### Build Errors
```bash
# Clean and reinstall
rm -rf node_modules .next
npm install
npm run dev
```

### Scraping Issues
- Verify UAF LMS is accessible
- Check registration number format: `YYYY-ag-XXXX`
- Look at console logs for detailed error messages

## Need Help? 💬

- Check the [README.md](./README.md) for detailed documentation
- Review [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment guides
- Open an issue on GitHub

## Credits 🙏

**Made by**: Adil  
**Scraping Logic**: Original UAF Result Scraper repository

---

Happy calculating! 🎓
