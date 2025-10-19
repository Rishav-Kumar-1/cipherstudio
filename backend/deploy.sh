#!/bin/bash

echo "🔧 CipherStudio Backend Deployment Script"
echo "=========================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository for backend..."
    git init
    git add .
    git commit -m "Initial commit: CipherStudio Backend API"
    echo "✅ Backend Git repository initialized"
else
    echo "✅ Backend Git repository already exists"
fi

echo ""
echo "📋 Backend Deployment Steps:"
echo "1. Push to GitHub:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/cipherstudio-backend.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "2. Deploy to Render:"
echo "   - Go to https://render.com"
echo "   - Create new Web Service"
echo "   - Connect backend repository"
echo "   - Runtime: Node"
echo "   - Build Command: npm install"
echo "   - Start Command: npm start"
echo ""
echo "3. Set Environment Variables in Render:"
echo "   NODE_ENV=production"
echo "   PORT=10000"
echo "   MONGODB_URI=your-mongodb-atlas-uri"
echo "   JWT_SECRET=your-jwt-secret"
echo "   AWS_ACCESS_KEY_ID=your-aws-key"
echo "   AWS_SECRET_ACCESS_KEY=your-aws-secret"
echo "   AWS_REGION=us-east-1"
echo "   AWS_S3_BUCKET=your-bucket-name"
echo ""
echo "🎉 Backend will be available at: https://cipherstudio-backend.onrender.com"
