import { useState } from "react";
import { Link } from 'react-router-dom';

const Register = ({ onRegister }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState('');

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
        setError("");

        if (!username || !password || !password2) {
            setError("Please fill in all required fields");
            return;
        }

        if (password !== password2) {
            setError("Passwords do not match");
            return;
        }

        try {
            await fetch("http://localhost:8000/api/csrf/", {
                credentials: "include",
            });
            const csrftoken = getCookie("csrftoken");
            console.log(csrftoken);
            const response = await fetch("http://localhost:8000/api/register/", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": csrftoken,
                },
                body: JSON.stringify({
                    username,
                    password,
                    password2,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                onRegister(data.user);
            } else {
                setError(data.error || "Registration failed");
            }
        } catch (error) {
            console.log(error);
            setError("Network error");
        }
    };


    // return (
    //     <div className="min-h-screen bg-linear-to-br from-purple-500 to-purple-800 flex items-center justify-center p-5">
    //         <div className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-md">
    //             <div className="text-center mb-8">
    //                 <h1 className="text-purple-600 text-3xl font-bold mb-2">💬 Chat App</h1>
    //                 <p className="text-gray-600 text-sm">Create your account</p>
    //             </div>

    //             {error && (
    //                 <div className="bg-red-100 border border-red-400 text-red-800 px-3 py-3 rounded-md mb-5 text-sm">
    //                     {error}
    //                 </div>
    //             )}

    //             <div className="space-y-5">
    //                 <div>
    //                     <label className="block mb-2 text-gray-800 font-semibold text-sm">
    //                         Username <span className="text-red-500">*</span>
    //                     </label>
    //                     <input
    //                         type="text"
    //                         value={username}
    //                         onChange={(e) => setUsername(e.target.value)}
    //                         className="w-full px-3 py-3 border-2 border-gray-200 rounded-md text-sm focus:outline-none focus:border-purple-600"
    //                         required
    //                         autoFocus
    //                     />
    //                     <p className="text-xs text-gray-500 mt-1">
    //                         150 characters or fewer. Letters, digits and @/./+/-/_ only.
    //                     </p>
    //                 </div>

    //                 <div>
    //                     <label className="block mb-2 text-gray-800 font-semibold text-sm">
    //                         Password <span className="text-red-500">*</span>
    //                     </label>
    //                     <input
    //                         type="password"
    //                         value={password}
    //                         onChange={(e) => setPassword(e.target.value)}
    //                         className="w-full px-3 py-3 border-2 border-gray-200 rounded-md text-sm focus:outline-none focus:border-purple-600"
    //                         required
    //                     />
    //                     <p className="text-xs text-gray-500 mt-1">
    //                         Your password must contain at least 8 characters.
    //                     </p>
    //                 </div>

    //                 <div>
    //                     <label className="block mb-2 text-gray-800 font-semibold text-sm">
    //                         Confirm Password <span className="text-red-500">*</span>
    //                     </label>
    //                     <input
    //                         type="password"
    //                         value={password2}
    //                         onChange={(e) => setPassword2(e.target.value)}
    //                         onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
    //                         className="w-full px-3 py-3 border-2 border-gray-200 rounded-md text-sm focus:outline-none focus:border-purple-600"
    //                         required
    //                     />
    //                 </div>

    //                 <button
    //                     onClick={handleSubmit}
    //                     className="w-full bg-purple-600 text-white py-3.5 rounded-md font-semibold text-base hover:bg-purple-700 transition-colors mt-2"
    //                 >
    //                     Register
    //                 </button>
    //             </div>

    //             <div className="text-center mt-5 text-gray-600 text-sm">
    //                 Already have an account?{' '}
    //                 <span
    //                     onClick={onSwitchToLogin}
    //                     className="text-purple-600 font-semibold hover:underline cursor-pointer"
    //                 >
    //                     Login here
    //                 </span>
    //             </div>
    //         </div>
    //     </div>
    // );

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center p-5">
            <div className="bg-gray-900 p-10 rounded-xl shadow-2xl w-full max-w-md border border-gray-800">
                <div className="text-center mb-8">
                    <h1 className="text-gray-100 text-3xl font-bold mb-2">💬 Chat App</h1>
                    <p className="text-gray-400 text-sm">Create your account</p>
                </div>

                {error && (
                    <div className="bg-red-950 border border-red-800 text-red-300 px-3 py-3 rounded-md mb-5 text-sm">
                        {error}
                    </div>
                )}

                <div className="space-y-5">
                    <div>
                        <label className="block mb-2 text-gray-300 font-semibold text-sm">
                            Username <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-3 py-3 bg-gray-950 border-2 border-gray-800 rounded-md text-sm text-gray-100 focus:outline-none focus:border-gray-600 placeholder-gray-600"
                            required
                            autoFocus
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            150 characters or fewer. Letters, digits and @/./+/-/_ only.
                        </p>
                    </div>

                    <div>
                        <label className="block mb-2 text-gray-300 font-semibold text-sm">
                            Password <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-3 bg-gray-950 border-2 border-gray-800 rounded-md text-sm text-gray-100 focus:outline-none focus:border-gray-600 placeholder-gray-600"
                            required
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Your password must contain at least 8 characters.
                        </p>
                    </div>

                    <div>
                        <label className="block mb-2 text-gray-300 font-semibold text-sm">
                            Confirm Password <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="password"
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
                            className="w-full px-3 py-3 bg-gray-950 border-2 border-gray-800 rounded-md text-sm text-gray-100 focus:outline-none focus:border-gray-600 placeholder-gray-600"
                            required
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
                        className="w-full bg-gray-700 text-white py-3.5 rounded-md font-semibold text-base hover:bg-gray-600 transition-colors mt-2"
                    >
                        Register
                    </button>
                </div>

                <div className="text-center mt-5 text-gray-400 text-sm">
                    Already have an account?{' '}
                    <Link
                        to="/login"
                        className="text-gray-100 font-semibold hover:underline cursor-pointer"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
};


export default Register