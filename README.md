# Real-Time Chat Application

A full-stack real-time chat app built with Django Channels (backend) and React + Tailwind CSS (frontend). Supports WebSocket messaging, user auth, and multiple chat rooms.

![Python](https://img.shields.io/badge/Python-3.12-blue) ![Django](https://img.shields.io/badge/Django-5.0-green) ![React](https://img.shields.io/badge/React-18-blue) ![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3-38bdf8) ![License](https://img.shields.io/badge/License-MIT-yellow)

## Table of Contents
- Features
- Tech Stack
- Prerequisites
- Installation & Setup
    - Backend
    - Frontend
- Running
- Project Structure
- Configuration (examples)
- Usage
- WebSocket API
- Models
- Troubleshooting
- Deployment
- API Endpoints
- Contributing
- License & Author

## Features
- Real-time messaging via WebSockets (Django Channels)
- User authentication (register, login, logout)
- Multiple chat rooms with message history
- Responsive UI using Tailwind CSS
- Minimal, modern React components

## Tech Stack
- Backend: Django 5.0, Django Channels 4, Uvicorn, Django REST Framework, SQLite (dev)
- Frontend: React 18, Tailwind CSS 3, Axios, React Router
- Infrastructure: ASGI, In-memory channel layer (dev). Use Redis in production.

## Prerequisites
- Python 3.12+
- Node.js 18+
- npm or yarn
- Git

## Installation & Setup

### 1. Clone
```bash
git clone https://github.com/yourusername/Chatty.git
cd Chatty
```

### 2. Backend setup
Create & activate venv:
```bash
python -m venv venv
# Windows
venv\Scripts\activate
# macOS / Linux
source venv/bin/activate
```
```bash
cd backend\chatapp
```

Install Python deps:
```bash
pip install -r requirements.txt
```

Migrate and create superuser:
```bash
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```

### 3. Frontend setup
```bash
cd frontend
npm install   
```

package.json (relevant):
```json
{
    "dependencies": {
        "react": "^18.2.0",
        "react-dom": "^18.2.0",
        "react-router-dom": "^6.20.0",
        "axios": "^1.6.2",
        "tailwindcss": "^3.3.0"
    }
}
```

## Running the App
Start backend (ASGI):
```bash
python -m uvicorn chatproject.asgi:application --reload --host 127.0.0.1 --port 8000
```
Backend: http://127.0.0.1:8000

Start frontend:
```bash
cd frontend
npm run dev
```
Frontend: http://localhost:3000 or http://localhost:5173

## Project Structure
```
Chatty/
│
├── backend/
│   └── chatapp/
│       ├── chat/
│       ├── chatproject/
│       ├── venv/
│       ├── db.sqlite3
│       ├── manage.py
│       └── requirements.txt
│
├── frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   └── .gitignore
│
├── .gitignore   
└── README.md
```

## Configuration (examples)

settings.py — CORS:
```py
CORS_ALLOWED_ORIGINS = [
        "http://localhost:3000",
        "http://localhost:5173",
]
```

settings.py — channel layers (dev):
```py
CHANNEL_LAYERS = {
        "default": {
                "BACKEND": "channels.layers.InMemoryChannelLayer"
        }
}
ASGI_APPLICATION = "chatproject.asgi.application"
```

## Usage
- Register and login
- Create or join rooms
- Send and receive real-time messages
- Message history persisted (SQLite by default)

## WebSocket API
Connect:
```js
const ws = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${roomName}/`);
```

Send:
```js
ws.send(JSON.stringify({
    message: "Hello!",
    username: "user123",
    timestamp: new Date().toISOString()
}));
```

Receive:
```js
ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log(data.message, data.username);
};
```

## API Endpoints
- POST /api/auth/register/
- POST /api/auth/login/
- POST /api/auth/logout/
- GET  /api/rooms/
- POST /api/rooms/
- GET  /api/rooms/{slug}/
- GET  /api/rooms/{slug}/messages/
- WS: ws://localhost:8000/ws/chat/{room_name}/

## Author
Manik Prakash
GitHub: https://github.com/manik-prakash  
LinkedIn: https://linkedin.com/in/manik-prakash
