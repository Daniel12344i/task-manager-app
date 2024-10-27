// src/components/AuthModal.js
import React, { useState } from "react";

const AuthModal = ({ onClose, onAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(true); // toggle between signup and login

  const handleSubmit = (e) => {
    e.preventDefault();
    onAuth(email, password, isSignUp);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">
          {isSignUp ? "Create an Account" : "Welcome Back!"}
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-3 w-full mb-4 rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-3 w-full mb-4 rounded"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white w-full p-3 rounded transition hover:bg-blue-600"
          >
            {isSignUp ? "Sign Up" : "Login"}
          </button>
          <button
            type="button"
            className="text-blue-500 mt-4 w-full"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp
              ? "Already have an account? Login"
              : "Don't have an account? Sign Up"}
          </button>
        </form>
        <button onClick={onClose} className="text-gray-600 mt-4 w-full">
          Close
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
