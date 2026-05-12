# 🌦️ Full-Stack Weather Forecast Application 

A complete, responsive web application for weather forecasting built with the **MERN** stack (MongoDB, Express, React, Node.js). 

## 🚀 Features
- **Accurate forecasting:** View current weather and a 5-day forecast.
- **Glassmorphism UI:** Stunning, modern aesthetic using Tailwind CSS & Framer Motion. 
- **Dark & Light Mode:** Toggle seamlessly between themes.
- **Authentication:** Secure JWT-based Login & Registration.
- **Search History:** Save user queries automatically when authenticated.
- **Responsive:** Works beautifully across Desktop and Mobile devices.

## 📋 Technology Stack
- **Frontend**: React (Vite), Tailwind CSS, Framer Motion, Axios, React Hot Toast
- **Backend**: Node.js, Express.js
- **Database**: MongoDB & Mongoose
- **API Provider**: OpenWeatherMap

---

## 🛠️ Installation & Setup

### 1. Prerequisites 
- Ensure you have **Node.js** (v16+) installed.
- Ensure you have **MongoDB** installed locally OR have an Atlas URL.
- Get a free API Key from [OpenWeatherMap](https://home.openweathermap.org/api_keys).

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend/` directory observing the provided `.env.example`:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/weather_app
JWT_SECRET=your_jwt_secret_here
OPENWEATHERMAP_API_KEY=your_openweathermap_api_key_here
```
Start the backend server:
```bash
npm run dev 
# OR
npx nodemon server.js
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```
Start the frontend development server:
```bash
npm run dev
```

---

## 📡 API Documentation

### Authentication Routes (`/api/auth`)
| Method | Route | Description | Body |
|---|---|---|---|
| POST | `/register` | Register a new user | `{ name, email, password }` |
| POST | `/login` | Authenticate and get JWT | `{ email, password }` |

### Weather Routes (`/api/weather`)
| Method | Route | Description | Headers |
|---|---|---|---|
| GET | `/:city` | Get Current Weather & 5-Day Forecast | Optional: `Authorization: Bearer <token>` |
| GET | `/history` | Get recent 10 search history items | Required: `Authorization: Bearer <token>` |

---

## 🌐 Deployment Steps

### Render/Vercel Approach
1. **Frontend (Vercel)**
   - Connect your GitHub repo to Vercel.
   - Set the Root Directory to `frontend`.
   - Build Command: `npm run build` | Output Directory: `dist`.
   - Add any UI `.env` vars if ever needed (currently axios is hardcoded to localhost:5000, please update `axiosConfig.js` to rely on `import.meta.env.VITE_API_URL` for production).
   
2. **Backend (Render)**
   - Deploy as a "Web Service".
   - Setup Root Directory to `backend`.
   - Build Command: `npm install`
   - Start Command: `node server.js`
   - Paste environment variables in the Render dashboard.

---

## 🚀 Future Improvements Checklist
- [ ] Incorporate Location Autofill via GPS coordinates to backend `getWeather`.
- [ ] Add auto-complete for major global search queries using a third-party autocomplete API.
- [ ] Expand User Profile to manually delete specific searches or favorite specific locations permanently.

## 📸 Screenshots Description 
- **Homepage (Light Mode):** A translucent, frosted-glass header with floating rain/sun icons, and a centered gradient search layout over a vibrant background.
- **Weather View (Dark Mode):** Featuring bold, crisp white typography showing exact degrees with animated icons sliding via `framer-motion`. Lower panels showcase 5-day columns with subtle hover transitions.
