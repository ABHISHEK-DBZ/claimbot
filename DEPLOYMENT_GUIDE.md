# ClaimBot Deployment Guide

## 🚀 Free Deployment Options

### 1. GitHub Pages (Free & Easy)
```bash
# Step 1: Create GitHub repository
git init
git add .
git commit -m "Initial ClaimBot deployment"
git branch -M main
git remote add origin https://github.com/yourusername/claimbot.git
git push -u origin main

# Step 2: Enable GitHub Pages
# Go to Settings > Pages > Source: Deploy from branch > main
# Your site will be live at: https://yourusername.github.io/claimbot
```

### 2. Netlify (Free Tier)
```bash
# Option A: Drag & Drop
# 1. Go to netlify.com
# 2. Drag your project folder to deploy area
# 3. Live in seconds!

# Option B: Git Integration
# 1. Connect GitHub repo
# 2. Auto-deploy on every push
```

### 3. Vercel (Free Tier)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### 4. Firebase Hosting (Free)
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Initialize and deploy
firebase login
firebase init hosting
firebase deploy
```

## 🌟 Quick Deploy Commands

### GitHub Pages Auto-Setup:
```bash
# Run this script to auto-deploy to GitHub Pages
git init
git add .
git commit -m "ClaimBot - AI Insurance Assistant"
echo "# ClaimBot - AI Insurance Assistant" > README.md
git add README.md
git commit -m "Add README"
```

### One-Click Netlify:
1. Go to: https://app.netlify.com/drop
2. Drag your project folder
3. Done! Live URL ready

## 📱 APK Distribution

### 1. Direct Download
- Host APK file on your deployed site
- Users can download and install

### 2. PWA Distribution
- Your site is PWA-ready
- Users can "Add to Home Screen"
- Works like native app

## 🔧 Backend Integration

### Python PDF Processing API
```python
# Deploy your ingest.py as an API
# Use: Flask, FastAPI, or Azure Functions
```

### Environment Variables
```
API_KEY=your-openai-key
DATABASE_URL=your-db-url
```

## 🌐 Custom Domain (Optional)
- Buy domain from GoDaddy/Namecheap
- Point to your deployment
- HTTPS automatically enabled

Choose your preferred method and I'll help you deploy! 🚀
