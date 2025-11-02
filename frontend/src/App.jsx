import './App.css';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { useState } from 'react';
import Login from './components/login';
import Register from './components/Register';
import RoomList from './components/roomlist';
import ChatRoom from './components/chatRoom';
import LandingPage from './components/Home';

const ProtectedRoute = ({ children, user }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const PublicRoute = ({ children, user }) => {
  if (user) {
    return <Navigate to="/rooms" replace />;
  }
  return children;
};

const App = () => {
  const [user, setUser] = useState(null);
  const [currentRoom, setCurrentRoom] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentRoom(null);
  };

  const handleJoinRoom = (room) => {
    setCurrentRoom(room);
  };

  const handleBackToRooms = () => {
    setCurrentRoom(null);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        <Route 
          path="/login" 
          element={
            <PublicRoute user={user}>
              <Login onLogin={handleLogin} />
            </PublicRoute>
          } 
        />
        
        <Route 
          path="/register" 
          element={
            <PublicRoute user={user}>
              <Register onRegister={handleLogin} />
            </PublicRoute>
          } 
        />

        <Route 
          path="/rooms" 
          element={
            <ProtectedRoute user={user}>
              <RoomList 
                user={user}
                onJoinRoom={handleJoinRoom}
                onLogout={handleLogout}
              />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/chat/:roomId" 
          element={
            <ProtectedRoute user={user}>
              <ChatRoom 
                user={user}
                room={currentRoom}
                onBack={handleBackToRooms}
              />
            </ProtectedRoute>
          } 
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
