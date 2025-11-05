import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';

const RoomList = ({ user, onLogout, onJoinRoom }) => {
  const [rooms, setRooms] = useState([]);
  const [roomName, setRoomName] = useState('');
  const [roomDescription, setRoomDescription] = useState('');
  const [message, setMessage] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [deletingRoomId, setDeletingRoomId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = () => {
    fetch("http://localhost:8000/api/rooms/", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched rooms:", data);
        setRooms(data);
      })
      .catch((error) => {
        console.error("Error fetching rooms:", error);
        setMessage("Failed to load rooms");
      });
  };

  const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  };

  const handleCreateRoom = async () => {
    if (!roomName.trim()) {
      setMessage("Room name is required");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    setIsCreating(true);
    console.log("Room data:", { name: roomName, description: roomDescription });

    try {
      const csrftoken = getCookie('csrftoken');
      console.log("CSRF Token found:", !!csrftoken);

      const response = await fetch("http://localhost:8000/api/rooms/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken,
        },
        body: JSON.stringify({
          name: roomName,
          description: roomDescription,
        }),
      });

      console.log("Response status:", response.status, response.statusText);

      let data;
      try {
        data = await response.json();
        console.log("Response data:", data);
      } catch (e) {
        console.error("Failed to parse JSON response:", e);
        setMessage("Server returned invalid response");
        return;
      }

      if (response.ok) {
        console.log("Room created successfully!");
        console.log("New room:", data);

        setRoomName("");
        setRoomDescription("");
        setMessage("Room created successfully!");
        setTimeout(() => setMessage(""), 3000);

        console.log("Fetching updated room list...");
        await fetchRooms();
      } else {
        console.error("Failed to create room");
        console.error("Error details:", data);
        setMessage(data.error || data.detail || JSON.stringify(data) || "Failed to create room");
        setTimeout(() => setMessage(""), 5000);
      }
    } catch (error) {
      console.error("Network error:", error);
      console.error("Error details:", error.message, error.stack);
      setMessage("Network error: " + error.message);
      setTimeout(() => setMessage(""), 5000);
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteRoom = async (roomId, roomName) => {
    if (!window.confirm(`Are you sure you want to delete "${roomName}"? This action cannot be undone.`)) {
      return;
    }

    setDeletingRoomId(roomId);
    console.log("=== DELETING ROOM ===");
    console.log("Room ID:", roomId);

    try {
      const csrftoken = getCookie('csrftoken');

      const response = await fetch(`http://localhost:8000/api/rooms/${roomId}/`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "X-CSRFToken": csrftoken,
        },
      });

      console.log("Response status:", response.status, response.statusText);

      if (response.ok || response.status === 204) {
        console.log("Room deleted successfully!");
        setMessage("Room deleted successfully!");
        setTimeout(() => setMessage(""), 3000);
        await fetchRooms();
      } else {
        let data;
        try {
          data = await response.json();
          console.error("Error details:", data);
          setMessage(data.error || data.detail || "Failed to delete room");
        } catch (e) {
          console.log(e);
          setMessage("Failed to delete room");
        }
        setTimeout(() => setMessage(""), 5000);
      }
    } catch (error) {
      console.error("Network error:", error);
      setMessage("Network error: " + error.message);
      setTimeout(() => setMessage(""), 5000);
    } finally {
      setDeletingRoomId(null);
    }
  };

  const isOwner = (room) => {
    return room.created_by?.id === user.id || room.created_by?.username === user.username;
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleCreateRoom();
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-black p-5">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-900 px-8 py-5 rounded-xl mb-5 shadow-lg flex justify-between items-center border border-gray-800">
          <h1 className="text-gray-100 text-3xl font-bold">Arena</h1>
          <div className="flex items-center gap-4">
            <span className="font-semibold text-gray-300"> {user.username}</span>
            <button
              onClick={() => {
                onLogout();
                navigate('/login');
              }}
              className="bg-red-900 text-red-200 px-4 py-2 rounded-md text-sm hover:bg-red-800 transition-colors border border-red-800"
            >
              Logout
            </button>
          </div>
        </div>

        {message && (
          <div className={`border px-4 py-3 rounded-md mb-5 text-sm ${message.includes('success')
            ? 'bg-green-950 border-green-800 text-green-300'
            : 'bg-red-950 border-red-800 text-red-300'
            }`}>
            {message}
          </div>
        )}

        <div className="bg-gray-900 p-6 rounded-xl mb-5 shadow-lg border border-gray-800">
          <h2 className="text-gray-100 mb-4 text-xl font-bold">Create New Room</h2>
          <div className="space-y-4">
            <input
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Room Name"
              className="w-full px-3 py-3 bg-gray-950 border-2 border-gray-800 rounded-md text-sm text-gray-100 focus:outline-none focus:border-gray-600 placeholder-gray-600"
              disabled={isCreating}
            />
            <textarea
              value={roomDescription}
              onChange={(e) => setRoomDescription(e.target.value)}
              placeholder="Room Description (optional)"
              rows="3"
              className="w-full px-3 py-3 bg-gray-950 border-2 border-gray-800 rounded-md text-sm text-gray-100 focus:outline-none focus:border-gray-600 placeholder-gray-600"
              disabled={isCreating}
            />
            <button
              onClick={handleCreateRoom}
              disabled={isCreating}
              className="bg-gray-700 text-white px-6 py-3 rounded-md text-sm font-semibold hover:bg-gray-600 transition-colors disabled:bg-gray-800 disabled:cursor-not-allowed"
            >
              {isCreating ? 'Creating...' : 'Create Room'}
            </button>
          </div>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-800">
          <h2 className="text-gray-100 mb-5 text-xl font-bold">Available Rooms</h2>
          {rooms.length > 0 ? (
            rooms.map((room) => (
              <div
                key={room.id}
                className="bg-gray-950 p-5 rounded-lg mb-4 border-2 border-gray-800 hover:border-gray-600 hover:-translate-y-0.5 hover:shadow-lg transition-all"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-gray-100 text-lg font-bold">{room.name}</h3>
                  {isOwner(room) && (
                    <button
                      onClick={() => handleDeleteRoom(room.id, room.name)}
                      disabled={deletingRoomId === room.id}
                      className="text-red-400 hover:text-red-300 hover:bg-red-950 p-2 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Delete room"
                    >
                      {deletingRoomId === room.id ? 'Processing' : 'Delete'}
                    </button>
                  )}
                </div>
                {room.description && (
                  <p className="text-gray-400 mb-3 text-sm">{room.description}</p>
                )}
                <div className="text-gray-600 text-xs mb-3">
                  Created by {room.created_by?.username || 'Unknown'} •  
                  {
                    new Date(room.created_at).toLocaleString("en-IN", {timeZone: "Asia/Kolkata",dateStyle: "medium",
                      timeStyle: "short"
                    })
                  }
                </div>
                <button
                  onClick={() => {
                    onJoinRoom(room);
                    navigate(`/chat/${room.id}`);
                  }}
                  className="bg-gray-700 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-600 transition-colors"
                >
                  Join Room
                </button>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-10 text-base">
              No rooms available. Create one to get started!
            </div>
          )}
        </div>
      </div>
    </div>
  );



};

export default RoomList