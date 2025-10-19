# 🚀 CipherStudio Deployment Guide

This guide will help you deploy CipherStudio to Vercel (frontend) and Render (backend) as specified in the assignment.

## 📋 Prerequisites

1. **GitHub Account** - Push your code to GitHub
2. **Vercel Account** - For frontend deployment
3. **Render Account** - For backend deployment
4. **MongoDB Atlas Account** - For database (free tier available)

## 🌐 Frontend Deployment (Vercel)

### Step 1: Prepare Frontend for Deployment

1. **Push code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: CipherStudio React IDE"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/cipherstudio.git
   git push -u origin main
   ```

### Step 2: Deploy to Vercel

1. **Go to [Vercel.com](https://vercel.com)**
2. **Sign in with GitHub**
3. **Click "New Project"**
4. **Import your repository:**
   - Select `cipherstudio` repository
   - Framework Preset: Next.js
   - Root Directory: `./` (leave empty)
5. **Environment Variables:**
   - `NEXT_PUBLIC_API_URL`: `https://cipherstudio-backend.onrender.com`
6. **Click "Deploy"**

### Step 3: Configure Vercel

1. **Go to Project Settings**
2. **Environment Variables:**
   ```
   NEXT_PUBLIC_API_URL=https://cipherstudio-backend.onrender.com
   ```
3. **Redeploy** after adding environment variables

## 🔧 Backend Deployment (Render)

### Step 1: Prepare Backend

1. **Create separate backend repository:**
   ```bash
   # In the backend folder
   cd backend
   git init
   git add .
   git commit -m "Initial commit: CipherStudio Backend"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/cipherstudio-backend.git
   git push -u origin main
   ```

### Step 2: Deploy to Render

1. **Go to [Render.com](https://render.com)**
2. **Sign up/Login with GitHub**
3. **Click "New +" → "Web Service"**
4. **Connect Repository:**
   - Select `cipherstudio-backend` repository
   - Name: `cipherstudio-backend`
5. **Configure Service:**
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free

### Step 3: Environment Variables

Add these environment variables in Render dashboard:

```
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cipherstudio
JWT_SECRET=your-super-secret-jwt-key-here
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-s3-bucket-name
```

## 🗄️ Database Setup (MongoDB Atlas)

### Step 1: Create MongoDB Atlas Account

1. **Go to [MongoDB Atlas](https://www.mongodb.com/atlas)**
2. **Sign up for free account**
3. **Create new cluster**
4. **Get connection string**

### Step 2: Configure Database

1. **Create database:** `cipherstudio`
2. **Create collections:**
   - `users`
   - `projects`
3. **Get connection string:**
   ```
   mongodb+srv://username:password@cluster.mongodb.net/cipherstudio
   ```

## 🔗 Connect Frontend to Backend

### Step 1: Update Frontend API URL

1. **In Vercel dashboard:**
   - Go to your project
   - Settings → Environment Variables
   - Add: `NEXT_PUBLIC_API_URL=https://cipherstudio-backend.onrender.com`

### Step 2: Redeploy Frontend

1. **Trigger redeploy** in Vercel dashboard
2. **Or push new commit** to trigger auto-deploy

## 🧪 Testing Deployment

### Frontend Testing

1. **Visit your Vercel URL:**
   ```
   https://cipherstudio.vercel.app
   ```

2. **Test features:**
   - Create new project
   - Add files
   - Edit code
   - Live preview
   - Save/load projects

### Backend Testing

1. **Test API endpoints:**
   ```bash
   curl https://cipherstudio-backend.onrender.com/api/health
   ```

2. **Expected response:**
   ```json
   {
     "status": "OK",
     "message": "CipherStudio API is running",
     "timestamp": "2024-01-01T00:00:00.000Z"
   }
   ```

## 🔧 Troubleshooting

### Common Issues

1. **CORS Errors:**
   - Check backend CORS configuration
   - Ensure frontend URL is allowed

2. **Environment Variables:**
   - Verify all env vars are set correctly
   - Check for typos in variable names

3. **Database Connection:**
   - Verify MongoDB Atlas connection string
   - Check IP whitelist settings

4. **Build Failures:**
   - Check Node.js version compatibility
   - Review build logs in deployment platform

### Debug Commands

```bash
# Check backend logs
curl https://cipherstudio-backend.onrender.com/api/health

# Test frontend
curl https://cipherstudio.vercel.app
```

## 📊 Deployment Checklist

- [ ] Frontend deployed to Vercel
- [ ] Backend deployed to Render
- [ ] MongoDB Atlas configured
- [ ] Environment variables set
- [ ] CORS configured
- [ ] API endpoints working
- [ ] Frontend-backend communication working
- [ ] All features tested

## 🎯 Final URLs

After successful deployment:

- **Frontend:** `https://cipherstudio.vercel.app`
- **Backend:** `https://cipherstudio-backend.onrender.com`
- **API Health:** `https://cipherstudio-backend.onrender.com/api/health`

## 📝 Notes

- **Free Tiers:** Both Vercel and Render offer free tiers
- **Auto-deploy:** Both platforms support auto-deployment from GitHub
- **Custom Domains:** Available on paid plans
- **Monitoring:** Both platforms provide built-in monitoring

## 🆘 Support

If you encounter issues:

1. Check deployment logs
2. Verify environment variables
3. Test API endpoints individually
4. Check MongoDB Atlas connection
5. Review CORS configuration

Your CipherStudio React IDE will be live and accessible worldwide! 🌍
