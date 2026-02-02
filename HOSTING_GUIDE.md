# 🚀 Free Hosting Guide for UAF CGPA Calculator

## Best Free Hosting Options (2025)

### Option 1: Vercel (⭐ RECOMMENDED)
**Why Vercel?**
- ✅ FREE forever for personal projects
- ✅ Automatic HTTPS/SSL
- ✅ Lightning fast CDN
- ✅ Zero configuration needed
- ✅ Auto-deploys on every Git push
- ✅ Custom domain support (free)

**Steps to Deploy:**

1. **Create a GitHub Account** (if you don't have one)
   - Go to https://github.com
   - Sign up for free

2. **Upload Your Project to GitHub**
   ```bash
   # In your project folder, run:
   git init
   git add .
   git commit -m "Initial commit"
   
   # Create a new repository on GitHub (click the + icon)
   # Then run (replace YOUR_USERNAME with your GitHub username):
   git remote add origin https://github.com/YOUR_USERNAME/uaf-cgpa-calculator.git
   git branch -M main
   git push -u origin main
   ```

3. **Deploy to Vercel**
   - Go to https://vercel.com
   - Click "Sign up with GitHub"
   - Import your repository
   - Click "Deploy"
   - Done! 🎉

**Your site will be live at:** `your-project-name.vercel.app`

---

### Option 2: Netlify
**Similar to Vercel, also excellent:**

1. Go to https://netlify.com
2. Sign up with GitHub
3. Click "Add new site" → "Import an existing project"
4. Select your GitHub repository
5. Click "Deploy"

**Your site will be live at:** `your-project-name.netlify.app`

---

### Option 3: Render
**Another great free option:**

1. Go to https://render.com
2. Sign up with GitHub
3. Click "New" → "Web Service"
4. Connect your repository
5. Fill in:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
6. Click "Create Web Service"

---

## 📋 Pre-Deployment Checklist

Before deploying, make sure:

### 1. Environment Variables
If your app needs API keys, create a `.env.local` file:
```
NEXT_PUBLIC_API_URL=your-api-url-here
```

Then add these in Vercel/Netlify settings:
- Go to your project settings
- Find "Environment Variables"
- Add each variable

### 2. Update package.json
Make sure these scripts exist:
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
```

### 3. Check next.config.js
Should look like:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig
```

---

## 🌐 Custom Domain (Optional but Professional)

### Free Domain Options:
1. **Freenom** - Free .tk, .ml, .ga domains
2. **InfinityFree** - Free .rf.gd domains
3. **Dot.tk** - Free .tk domains

### Or Buy Cheap:
- Namecheap (~$1-10/year)
- GoDaddy
- Google Domains

### Connect Custom Domain to Vercel:

1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Enter your domain name
4. Follow the DNS instructions:
   - Add A record: `76.76.21.21`
   - Or add CNAME: `cname.vercel-dns.com`
5. Wait 24-48 hours for DNS propagation

---

## ⚡ Quick Deploy Command

If you're already on GitHub:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy with one command
vercel
```

Follow the prompts, and you're live!

---

## 🔧 Troubleshooting

### Build Fails?
**Error: "Module not found"**
```bash
# Make sure all dependencies are installed
npm install

# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Error: "Environment variables not found"**
- Add them in your hosting platform settings
- For Vercel: Settings → Environment Variables
- For Netlify: Site settings → Build & deploy → Environment

### Site is Slow?
- Enable "Image Optimization" in Vercel
- Use Vercel's Analytics to find bottlenecks
- Minimize large images

### Need Help?
- Vercel Docs: https://vercel.com/docs
- Netlify Docs: https://docs.netlify.com
- Discord/Forums: Ask the community!

---

## 📊 Comparison Table

| Feature | Vercel | Netlify | Render |
|---------|--------|---------|--------|
| Free Tier | ✅ Generous | ✅ Generous | ✅ Limited |
| Build Minutes | Unlimited | 300/month | 500/month |
| Bandwidth | 100GB | 100GB | 100GB |
| Custom Domain | ✅ Free | ✅ Free | ✅ Free |
| Auto Deploy | ✅ Yes | ✅ Yes | ✅ Yes |
| HTTPS | ✅ Auto | ✅ Auto | ✅ Auto |
| Speed | ⚡ Fastest | ⚡ Fast | ⚡ Good |
| Best For | Next.js | Static Sites | Full Stack |

---

## 🎯 Recommended Path

1. **Start with Vercel** (easiest for Next.js)
2. Push code to GitHub
3. Connect Vercel to your repo
4. Click deploy
5. Share your link! 🎉

**That's it!** Your site will be live in under 5 minutes.

---

## 💡 Pro Tips

1. **Use a .gitignore file** to avoid uploading unnecessary files:
   ```
   node_modules/
   .next/
   .env.local
   .DS_Store
   ```

2. **Enable Analytics** in Vercel to track visitors

3. **Add a README.md** to your GitHub repo for documentation

4. **Use GitHub Actions** for automated testing before deploy

5. **Set up Preview Deployments** - Every PR gets its own URL!

---

## 🆘 Still Stuck?

**Watch Video Tutorials:**
- "Deploy Next.js to Vercel" on YouTube
- "Free Web Hosting 2025" guides

**Or contact me:**
- Made with ❤️ by Adil
- Feel free to reach out for help!

---

**Good luck! Your CGPA calculator will be online soon! 🚀**
