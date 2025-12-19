# Mobile Recharge Application

A full-stack mobile recharge web application with React frontend and Node.js backend.

## 🚀 Features

- **Authentication**: Secure JWT-based login/signup
- **Mobile Recharge**: Complete recharge flow with plan selection
- **Transaction History**: Track all recharge transactions
- **Responsive Design**: Works on all screen sizes
- **Real-time Validation**: Client and server-side validation
- **Secure API**: Protected routes with JWT authentication

## 🛠 Tech Stack

### Frontend
- React 18 with Vite
- Tailwind CSS for styling
- React Router v6 for navigation
- Context API for state management

### Backend
- Node.js with Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

## 📁 Project Structure

```
├── frontend/           # React frontend application
│   ├── src/
│   ├── package.json
│   └── vite.config.js
├── backend/            # Node.js backend API
│   ├── models/
│   ├── server.js
│   └── package.json
├── render.yaml         # Render deployment config
└── DEPLOYMENT.md       # Deployment guide
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shahanaaparveen/mobile_recharge_app.git
   cd mobile_recharge_app
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**
   
   Backend (`backend/.env`):
   ```env
   MONGODB_URI=mongodb://localhost:27017/mobile-recharge
   JWT_SECRET=your-secret-key
   PORT=5000
   ```
   
   Frontend (`frontend/.env`):
   ```env
   VITE_API_URL=http://localhost:5000
   ```

4. **Start development servers**
   ```bash
   # Terminal 1 - Backend
   npm run dev-backend
   
   # Terminal 2 - Frontend
   npm run dev-frontend
   ```

5. **Open your browser**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000`

## 🌐 Deployment

This application is configured for deployment on Render.com. See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

### Quick Deploy to Render

1. Push code to GitHub
2. Connect repository to Render
3. Set up MongoDB Atlas
4. Configure environment variables
5. Deploy using `render.yaml`

## 📱 API Endpoints

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/plans` - Get recharge plans
- `POST /api/recharge` - Process recharge (protected)
- `GET /api/transactions` - Get transactions (protected)
- `GET /health` - Health check

## 🔧 Development Scripts

```bash
# Install dependencies
npm run install-all
npm run install-frontend
npm run install-backend

# Development
npm run dev-frontend
npm run dev-backend

# Production build
npm run build-frontend
npm run start-backend
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Shahana Parveen**
- GitHub: [@shahanaaparveen](https://github.com/shahanaaparveen)

---

⭐ Star this repository if you found it helpful!