import React from "react";

const Header = ({ onLogout }) => {
  const handleTitleClick = (e) => {
    e.preventDefault();
    // Add any additional logic here if needed
  };

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md">
      <div className="flex items-center">
        <h1
          className="text-xl font-bold cursor-pointer"
          onClick={handleTitleClick}
        >
          TaskManager
        </h1>
      </div>
      <div className="flex items-center">
        <span className="mr-4">Welcome Joe</span>
        <button
          onClick={onLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
