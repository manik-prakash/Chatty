import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const ChatRoom = ({ room, user, onBack }) => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [connected, setConnected] = useState(true);
  const messagesEndRef = useRef(null);
  const wsRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8000/ws/chat/${room.slug}/`);
    wsRef.current = ws;

    ws.onopen = () => setConnected(true);
    ws.onclose = () => setConnected(false);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const transformedData = {
        id: data.id,
        content: data.message || data.content,
        user: {
          username: data.username || data.user?.username
        },
        timestamp: data.timestamp
      };
      setMessages((prev) => [...prev, transformedData]);
    };

    return () => ws.close();
  }, [room.slug]);

  useEffect(() => {
    fetch(`http://localhost:8000/api/rooms/${room.slug}/`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setMessages(data.messages);
      });
  }, [room.slug]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = () => {
    const message = messageInput.trim();
    if (!message) return;

    wsRef.current.send(
      JSON.stringify({
        message: message,
        username: user.username,
      })
    );

    setMessageInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="h-screen bg-linear-to-br from-gray-950 via-gray-900 to-black flex flex-col">
      <div className="bg-gray-950 px-6 py-4 shadow-lg flex justify-between items-center border-b border-gray-800">
        <h1 className="text-gray-100 text-2xl font-bold">{room.name}</h1>
        <button
          onClick={() => {
            onBack();
            navigate('/rooms');
          }}
          className="bg-gray-800 text-gray-200 px-4 py-2 rounded-md text-sm hover:bg-gray-700 transition-colors border border-gray-700"
        >
          Back to Rooms
        </button>
      </div>

      <div className="flex-1 flex flex-col max-w-6xl w-full mx-auto my-5 bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-gray-800">
        <div className={`px-4 py-2 text-center text-xs font-semibold ${connected
          ? 'bg-green-900 text-green-300'
          : 'bg-red-900 text-red-300'
          }`}>
          {connected ? 'Connected' : 'Disconnected'}
        </div>

        <div className="flex-1 overflow-y-auto p-5 bg-gray-950">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="mb-4"
              style={{ animation: 'fadeIn 0.3s ease-in' }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className={`font-semibold text-sm ${msg.user.username === user.username ? 'text-gray-100' : 'text-gray-400'
                  }`}>
                  {msg.user.username}
                </span>
                <span className="text-gray-600 text-xs">{msg.timestamp}</span>
              </div>
              <div className={`px-4 py-3 rounded-lg shadow-sm wrap-break-word leading-relaxed ${msg.user.username === user.username
                ? 'bg-gray-800 text-gray-100 border-l-4 border-gray-600'
                : 'bg-gray-900 text-gray-300 border-l-4 border-gray-700'
                }`}>
                {msg.content}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-5 bg-gray-950 border-t-2 border-gray-800 flex gap-2">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 px-4 py-3 bg-gray-900 border-2 border-gray-800 rounded-lg text-sm text-gray-100 focus:outline-none focus:border-gray-600 placeholder-gray-600"
            autoComplete="off"
          />
          <button
            onClick={sendMessage}
            disabled={!connected}
            className="bg-gray-700 text-white px-8 py-3 rounded-lg text-sm font-semibold hover:bg-gray-600 hover:-translate-y-0.5 hover:shadow-lg transition-all disabled:bg-gray-800 disabled:cursor-not-allowed disabled:transform-none"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );





};


export default ChatRoom