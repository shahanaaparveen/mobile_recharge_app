# Deployment Guide for Render

## Prerequisites

1. **GitHub Repository**: Push your code to GitHub
2. **MongoDB Atlas**: Set up a free MongoDB Atlas cluster
3. **Render Account**: Sign up at [render.com](https://render.com)

## Step 1: Set up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist IP addresses (use 0.0.0.0/0 for all IPs)
5. Get your connection string (replace `<password>` with your actual password)

## Step 2: Deploy Backend to Render

### Option A: Using render.yaml (Recommended)

1. Push your code to GitHub
2. Connect your GitHub repo to Render
3. Render will automatically detect the `render.yaml` file
4. Set the following environment variables in Render dashboard:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A secure random string (Render can generate this)

### Option B: Manual Setup

1. Create a new **Web Service** on Render
2. Connect your GitHub repository
3. Configure:
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Environment**: Node
4. Add environment variables:
   - `NODE_ENV`: `production`
   - `PORT`: `10000`
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Generate a secure random string

## Step 3: Deploy Frontend to Render

### Option A: Using render.yaml (Recommended)

The frontend will be deployed automatically with the backend using the render.yaml configuration.

### Option B: Manual Setup

1. Create a new **Static Site** on Render
2. Connect your GitHub repository
3. Configure:
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Add environment variable:
   - `VITE_API_URL`: Your backend service URL (e.g., `https://your-backend-service.onrender.com`)

## Step 4: Update CORS (if needed)

If you encounter CORS issues, update your backend server.js:

```javascript
app.use(cors({
  origin: ['https://your-frontend-domain.onrender.com', 'http://localhost:5173'],
  credentials: true
}));
```

## Step 5: Test Your Deployment

1. Visit your frontend URL
2. Test user registration and login
3. Test mobile recharge functionality
4. Check transaction history

## Environment Variables Summary

### Backend (.env)
```
NODE_ENV=production
PORT=10000
JWT_SECRET=your-secure-jwt-secret
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mobile-recharge
```

### Frontend (.env)
```
VITE_API_URL=https://your-backend-service.onrender.com
```

## Troubleshooting

### Common Issues:

1. **Build Failures**: Check build logs for missing dependencies
2. **Database Connection**: Verify MongoDB Atlas connection string and IP whitelist
3. **CORS Errors**: Update CORS configuration in backend
4. **Environment Variables**: Ensure all required env vars are set in Render dashboard

### Render Free Tier Limitations:

- Services sleep after 15 minutes of inactivity
- 750 hours/month of runtime
- Limited bandwidth and storage

## Production Optimizations

1. **Enable HTTPS**: Render provides free SSL certificates
2. **Custom Domain**: Add your custom domain in Render dashboard
3. **Monitoring**: Use Render's built-in monitoring and logs
4. **Database Indexing**: Add indexes to MongoDB collections for better performance

## Scaling Considerations

- Upgrade to Render's paid plans for better performance
- Consider using Redis for session management
- Implement proper error handling and logging
- Add rate limiting for API endpoints