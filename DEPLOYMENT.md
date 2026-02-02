# Deployment Guide

## Deploy to Vercel (Recommended)

1. **Push to GitHub**:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo>
git push -u origin main
```

2. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js
   - Click "Deploy"

3. **Configuration**:
   - No special environment variables needed
   - The app will work out of the box

## Deploy to Netlify

1. **Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `.next`

2. **Deploy**:
```bash
npm install -g netlify-cli
netlify deploy --prod
```

## Deploy to Railway

1. **Create Railway Account**: [railway.app](https://railway.app)

2. **Deploy**:
   - Connect your GitHub repository
   - Railway will auto-detect and deploy
   - No additional configuration needed

## Local Production Build

Test production build locally:

```bash
npm run build
npm start
```

## Environment Variables

This application doesn't require any environment variables for basic functionality. The scraper connects directly to UAF servers.

## Performance Optimization

- The app uses Next.js API routes for server-side scraping
- Automatic code splitting
- Image optimization
- CSS minification

## Troubleshooting

### Build Errors

If you encounter build errors:
```bash
rm -rf node_modules .next
npm install
npm run build
```

### Scraping Issues

If the scraper fails:
- Check UAF LMS is accessible
- Verify registration number format
- Check server logs for detailed errors

## Monitoring

After deployment, monitor:
- Response times for API routes
- Error rates
- User traffic

## Security Notes

- No sensitive data is stored
- All scraping is done server-side
- User registration numbers are not logged
- HTTPS is enforced on deployment

## Support

For deployment issues, check:
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
