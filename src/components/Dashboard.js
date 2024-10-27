import React from "react";
import { FaTasks, FaCalendarAlt, FaUsers } from "react-icons/fa";
import backgroundImage from "../assets/vibrant-illustration.png"; // Adjust the path as necessary

const Dashboard = ({ onLogin }) => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-4"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white rounded-lg shadow-lg p-8 sm:p-10 md:p-12 lg:p-16 text-center max-w-5xl w-full">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-800">
          Welcome to Task Manager!
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8">
          Your ultimate tool for organizing tasks and boosting productivity.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-100 p-4 sm:p-6 rounded-lg flex flex-col items-center transition-transform hover:scale-105">
            <FaTasks className="text-3xl sm:text-4xl text-blue-600 mb-2" />
            <h3 className="font-semibold text-lg sm:text-xl">Manage Tasks</h3>
            <p className="text-sm">
              Easily create, edit, and organize your tasks.
            </p>
          </div>
          <div className="bg-gray-100 p-4 sm:p-6 rounded-lg flex flex-col items-center transition-transform hover:scale-105">
            <FaCalendarAlt className="text-3xl sm:text-4xl text-blue-600 mb-2" />
            <h3 className="font-semibold text-lg sm:text-xl">Calendar View</h3>
            <p className="text-sm">
              Visualize your tasks in a monthly or weekly calendar.
            </p>
          </div>
          <div className="bg-gray-100 p-4 sm:p-6 rounded-lg flex flex-col items-center transition-transform hover:scale-105">
            <FaUsers className="text-3xl sm:text-4xl text-blue-600 mb-2" />
            <h3 className="font-semibold text-lg sm:text-xl">Collaborate</h3>
            <p className="text-sm">
              Share tasks and collaborate with your team.
            </p>
          </div>
        </div>

        <button
          onClick={onLogin}
          className="bg-blue-600 text-white px-6 sm:px-8 py-3 rounded-md shadow hover:bg-blue-700 transition duration-200 text-base sm:text-lg"
        >
          Get Started
        </button>

        {/* Wrap the text in the same container for consistency */}
        <div className="mt-8 text-gray-500 text-sm">
          <p>
            Don't have an account?{" "}
            <span className="text-blue-600 cursor-pointer">Sign up here!</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
