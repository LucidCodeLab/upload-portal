# Upload Portal Uploader

A self-hosted, browser-based file uploader designed for use with LucidLink Filespaces. Built with a React frontend and Express.js backend, this framework allows organizations to easily deploy and manage secure file upload portals.

---

## 🚀 Features

- Direct-to-LucidLink file uploads via web browser
- Simple authentication via username/password
- Files securely streamed to LucidLink-mounted directories
- Supports large file uploads
- Easily configurable via `.env` file

---

## 📦 Folder Structure

project-root/
├── backend/ # Express backend API
│ ├── server.js
│ ├── .env.example
├── frontend/ # React frontend using Uppy
│ └── (React files)
├── README.md
├── .gitignore

---

## ⚙️ Setup Instructions

### 1️⃣ Backend Setup

1. Navigate to the backend folder:

cd backend

2. Install dependencies:

npm install

3. Configure environment variables:

- Copy the example file:
  ```
  cp .env.example .env
  ```
- Fill out `.env` with your details:
  - `UPLOAD_DIR`: Path to your LucidLink-mounted upload directory
  - `UPLOAD_USERNAME` and `UPLOAD_PASSWORD`: Your chosen login credentials

4. Mount your LucidLink Filespace as desired.

5. Start the backend server:

node server.js

---

### 2️⃣ Frontend Setup

1. Navigate to the frontend folder:

cd frontend

2. Install dependencies:

npm install

3. Start the development server:

npm run dev

4. Access the uploader in your browser at:

http://localhost:5173

---

## 🔒 Security Notes

- Each deployment is self-hosted by the customer.
- Environment variables (credentials, upload directory) are never exposed to the client.
- Protect your deployment with HTTPS.
- We recommend reverse proxying behind NGINX for production deployments.

---

## 📁 Customization

- Logo and branding can be customized in the React frontend.
- To customize authentication or add multi-user support, modify the backend’s `/login` and `/upload` routes.

---

## 🛠 Future Enhancements

- JWT-based authentication (optional)
- Per-user upload directories
- Docker deployment support

---

## 📜 License

This project is provided as a framework for private, self-hosted use.
