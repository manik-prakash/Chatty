import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let cookie of cookies) {
        const c = cookie.trim();
        if (c.startsWith(name + "=")) {
          cookieValue = c.substring(name.length + 1);
          break;
        }
      }
    }
    return cookieValue;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await fetch("http://localhost:8000/api/csrf/", {
        credentials: "include",
      });

      const csrftoken = getCookie("csrftoken");
      console.log(csrftoken);

      const response = await fetch("http://localhost:8000/api/login/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken,
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        onLogin(data.user);
        navigate('/rooms');
      } else {
        setError(data.error || "Login failed");
      }
    } catch (error) {
      console.log(error);
      setError("Something went wrong");
    }
  };
  
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center p-5">
      <div className="bg-gray-900 p-10 rounded-xl shadow-2xl w-full max-w-md border border-gray-800">
        <div className="text-center mb-8">
          <h1 className="text-gray-100 text-3xl font-bold mb-2">Chatty</h1>
          <p className="text-gray-400 text-sm">Login to start chatting</p>
        </div>

        {error && (
          <div className="bg-red-950 border border-red-800 text-red-300 px-3 py-3 rounded-md mb-5 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-5">
          <div>
            <label className="block mb-2 text-gray-300 font-semibold text-sm">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-3 bg-gray-950 border-2 border-gray-800 rounded-md text-sm text-gray-100 focus:outline-none focus:border-gray-600 placeholder-gray-600"
              required
              autoFocus
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-300 font-semibold text-sm">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
              className="w-full px-3 py-3 bg-gray-950 border-2 border-gray-800 rounded-md text-sm text-gray-100 focus:outline-none focus:border-gray-600 placeholder-gray-600"
              required
            />
          </div>
          <button
            onClick={handleSubmit}
            className="w-full bg-gray-700 text-white py-3.5 rounded-md font-semibold text-base hover:bg-gray-600 transition-colors mt-2"
          >
            Login
          </button>
        </div>

        <div className="text-center mt-5 text-gray-400 text-sm">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="text-gray-100 font-semibold hover:underline cursor-pointer"
          >
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};


export default Login 