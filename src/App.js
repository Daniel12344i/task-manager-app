import React, { useState, useEffect } from "react";
import TaskManager from "./components/TaskManager";
import AuthModal from "./components/AuthModal";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header"; // Import Header component

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showModal, setShowModal] = useState(false); // Show modal on initial load

  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    if (storedAuth) {
      setIsAuthenticated(JSON.parse(storedAuth));
    }
  }, []);

  const handleAuth = (email, password, isSignUp) => {
    // You can implement your sign up/login logic here
    console.log(email, password, isSignUp);
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", true);
    setShowModal(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    setShowModal(false);
  };

  return (
    <div className="App">
      {!isAuthenticated ? (
        <>
          <Dashboard onLogin={() => setShowModal(true)} />
          {showModal && (
            <AuthModal
              onAuth={handleAuth}
              onClose={() => setShowModal(false)}
            />
          )}
        </>
      ) : (
        <>
          <Header onLogout={handleLogout} /> {/* Add Header here */}
          <TaskManager />
        </>
      )}
    </div>
  );
}

export default App;
