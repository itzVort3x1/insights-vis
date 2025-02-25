# 🚀 NASA API Server

A **Node.js Express** server that fetches data from NASA APIs, including:

-   📸 **Astronomy Picture of the Day (APOD)**
-   🏜 **Mars Rover Photos**
-   ☄️ **Near-Earth Asteroids Tracker**

This server is **Vercel-ready** and designed for seamless integration with frontend applications.

---

## 🛠 Tech Stack

-   **Backend:** Node.js, Express.js
-   **API Calls:** `node-fetch` (or Axios)
-   **Environment Variables:** `dotenv`
-   **CORS Handling:** `cors`
-   **Server Automation:** `nodemon`
-   **Deployment:** Configured for **Vercel**

---

## 📂 Project Structure

```
.
├── routes/
│   └── index.js         # API routes for fetching NASA data
├── package.json         # Project dependencies & scripts
├── vercel.json          # Deployment configuration for Vercel
├── index.js             # Main server file (entry point)
```

---

## 🚀 How to Run Locally

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/your-username/nasa-api-server.git
cd nasa-api-server
```

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Start the Server

```sh
npm start
```

-   The API will run at **http://localhost:4000/api/**

---

## 🔥 Available Endpoints

| Method | Endpoint               | Description                                   |
| ------ | ---------------------- | --------------------------------------------- |
| GET    | `/api/apod`            | Fetches NASA's Astronomy Picture of the Day   |
| GET    | `/api/fetchMarsPhotos` | Retrieves images from Mars rovers             |
| GET    | `/api/fetchAsteroids`  | Lists Near-Earth Objects for the current week |

---

## 🎯 Next Steps

✅ **Add more NASA APIs** (e.g., exoplanet data)  
✅ **Implement caching** to reduce API calls  
✅ **Secure API keys with `.env`**

---

## 🎖 Conclusion

This **NASA API Server** is a **scalable**, **Vercel-ready** backend that provides **real-time space data** for frontend applications. Whether you're exploring Mars, asteroids, or APOD images, this server brings NASA’s universe right to your app! 🌌✨

🚀 Happy coding! 🚀
