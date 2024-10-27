// src/components/Auth.js
import React, { useState, useEffect } from "react";
import { Button } from "./ui/Button";
import { Input } from "./ui/input";

const Auth = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Load user data from local storage
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setIsLoggedIn(true);
      setEmail(user.email);
    }
  }, []);

  const handleSignUp = (e) => {
    e.preventDefault();
    if (email && password) {
      const user = { email, password };
      localStorage.setItem("user", JSON.stringify(user));
      setIsLoggedIn(true);
      onLogin(user.email); // Notify TaskManager of successful login
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const userData = JSON.parse(localStorage.getItem("user"));
    if (
      userData &&
      userData.email === email &&
      userData.password === password
    ) {
      setIsLoggedIn(true);
      onLogin(userData.email); // Notify TaskManager of successful login
    } else {
      alert("Invalid credentials");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail("");
    setPassword("");
    localStorage.removeItem("user");
  };

  return (
    <div className="flex flex-col items-center">
      {!isLoggedIn ? (
        <>
          <h2 className="mb-4">Sign Up / Login</h2>
          <form onSubmit={handleSignUp} className="flex flex-col space-y-2">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" className="bg-blue-500 text-white">
              Sign Up
            </Button>
          </form>
          <div className="mt-4">OR</div>
          <form onSubmit={handleLogin} className="flex flex-col space-y-2">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" className="bg-green-500 text-white">
              Login
            </Button>
          </form>
        </>
      ) : (
        <Button onClick={handleLogout} className="bg-red-500 text-white">
          Logout
        </Button>
      )}
    </div>
  );
};

export default Auth;
