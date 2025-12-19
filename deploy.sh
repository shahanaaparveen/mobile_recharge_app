#!/bin/bash

# Deployment script for Render

echo "🚀 Starting deployment process..."

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
npm install

# Build frontend
echo "🔨 Building frontend..."
npm run build

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
cd ..

echo "✅ Build process completed!"
echo "📋 Next steps:"
echo "1. Push your code to GitHub"
echo "2. Connect your repository to Render"
echo "3. Set up environment variables"
echo "4. Deploy using render.yaml configuration"