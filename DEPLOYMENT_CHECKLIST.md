# ✅ CipherStudio Deployment Checklist

## 📋 Pre-Deployment Setup

- [ ] **GitHub Account** - Sign up at github.com
- [ ] **Vercel Account** - Sign up at vercel.com
- [ ] **Render Account** - Sign up at render.com
- [ ] **MongoDB Atlas Account** - Sign up at mongodb.com/atlas

## 🌐 Frontend Deployment (Vercel)

### Step 1: Prepare Repository
- [ ] Initialize Git repository
- [ ] Add all files to Git
- [ ] Commit changes
- [ ] Push to GitHub

### Step 2: Deploy to Vercel
- [ ] Connect GitHub account to Vercel
- [ ] Import `cipherstudio` repository
- [ ] Set framework to Next.js
- [ ] Add environment variable: `NEXT_PUBLIC_API_URL`
- [ ] Deploy project

### Step 3: Verify Frontend
- [ ] Visit deployed URL
- [ ] Test project creation
- [ ] Test file management
- [ ] Test code editor
- [ ] Test live preview

## 🔧 Backend Deployment (Render)

### Step 1: Prepare Backend Repository
- [ ] Create separate repository for backend
- [ ] Push backend code to GitHub
- [ ] Verify all dependencies are in package.json

### Step 2: Deploy to Render
- [ ] Connect GitHub account to Render
- [ ] Create new Web Service
- [ ] Select backend repository
- [ ] Set runtime to Node
- [ ] Set build command: `npm install`
- [ ] Set start command: `npm start`

### Step 3: Configure Environment Variables
- [ ] `NODE_ENV=production`
- [ ] `PORT=10000`
- [ ] `MONGODB_URI=your-mongodb-uri`
- [ ] `JWT_SECRET=your-jwt-secret`
- [ ] `AWS_ACCESS_KEY_ID=your-aws-key`
- [ ] `AWS_SECRET_ACCESS_KEY=your-aws-secret`
- [ ] `AWS_REGION=us-east-1`
- [ ] `AWS_S3_BUCKET=your-bucket-name`

### Step 4: Verify Backend
- [ ] Test health endpoint
- [ ] Test API endpoints
- [ ] Verify database connection
- [ ] Check CORS configuration

## 🗄️ Database Setup (MongoDB Atlas)

### Step 1: Create Database
- [ ] Create new cluster
- [ ] Set up database: `cipherstudio`
- [ ] Create collections: `users`, `projects`
- [ ] Get connection string

### Step 2: Configure Access
- [ ] Add IP whitelist (0.0.0.0/0 for development)
- [ ] Create database user
- [ ] Test connection

## 🔗 Integration Testing

### Step 1: Connect Frontend to Backend
- [ ] Update frontend API URL
- [ ] Redeploy frontend
- [ ] Test API communication

### Step 2: End-to-End Testing
- [ ] Create new project
- [ ] Add files and folders
- [ ] Edit code
- [ ] Test live preview
- [ ] Save and load projects
- [ ] Test user authentication (if implemented)

## 🎯 Final Verification

### Frontend Features
- [ ] Project creation works
- [ ] File management works
- [ ] Code editor works
- [ ] Live preview works
- [ ] Theme switching works
- [ ] Responsive design works

### Backend Features
- [ ] API endpoints respond correctly
- [ ] Database operations work
- [ ] Authentication works (if implemented)
- [ ] File operations work
- [ ] CORS is configured correctly

### Performance
- [ ] Frontend loads quickly
- [ ] Backend responds quickly
- [ ] No console errors
- [ ] No network errors

## 📊 Deployment URLs

After successful deployment:

- **Frontend URL:** `https://cipherstudio.vercel.app`
- **Backend URL:** `https://cipherstudio-backend.onrender.com`
- **API Health:** `https://cipherstudio-backend.onrender.com/api/health`

## 🆘 Troubleshooting

### Common Issues
- [ ] CORS errors - Check backend CORS configuration
- [ ] Environment variables - Verify all are set correctly
- [ ] Database connection - Check MongoDB Atlas settings
- [ ] Build failures - Check Node.js version compatibility

### Debug Steps
- [ ] Check deployment logs
- [ ] Test API endpoints individually
- [ ] Verify environment variables
- [ ] Check browser console for errors
- [ ] Test in incognito mode

## 🎉 Success Criteria

Your deployment is successful when:
- [ ] Frontend is accessible and functional
- [ ] Backend API is responding
- [ ] All core features work
- [ ] No critical errors
- [ ] Performance is acceptable

## 📝 Notes

- Both Vercel and Render offer free tiers
- Auto-deployment is enabled by default
- Monitor usage to stay within free limits
- Consider upgrading for production use

**🎯 Your CipherStudio React IDE will be live and accessible worldwide!**
