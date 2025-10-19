#!/bin/bash

echo "🚀 CipherStudio Deployment Script"
echo "=================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit: CipherStudio React IDE"
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already exists"
fi

echo ""
echo "📋 Next Steps:"
echo "1. Push to GitHub:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/cipherstudio.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "2. Deploy Frontend to Vercel:"
echo "   - Go to https://vercel.com"
echo "   - Import your GitHub repository"
echo "   - Set environment variable: NEXT_PUBLIC_API_URL=https://cipherstudio-backend.onrender.com"
echo ""
echo "3. Deploy Backend to Render:"
echo "   - Go to https://render.com"
echo "   - Create new Web Service"
echo "   - Connect your backend repository"
echo "   - Set environment variables (see DEPLOYMENT.md)"
echo ""
echo "📖 For detailed instructions, see DEPLOYMENT.md"
echo "🎉 Happy deploying!"
