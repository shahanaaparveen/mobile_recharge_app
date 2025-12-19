# Mobile Recharge Backend

Node.js/Express backend API for the mobile recharge application.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` file from `.env.example` and configure:
   - MongoDB connection string
   - JWT secret key

3. Start development server:
   ```bash
   npm run dev
   ```

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing

## API Endpoints

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/plans` - Get recharge plans
- `POST /api/recharge` - Process recharge
- `GET /api/transactions` - Get user transactions
- `GET /health` - Health check