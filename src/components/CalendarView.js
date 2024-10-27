import React, { useState } from "react";
import PropTypes from "prop-types";
import { PlusCircle } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/Button";

const CalendarView = ({ tasks, addTask }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [newTaskText, setNewTaskText] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleAddTask = () => {
    if (newTaskText.trim() && selectedDate) {
      addTask({
        id: Date.now(),
        content: newTaskText.trim(),
        dueDate: selectedDate,
        subTasks: [],
      });
      setNewTaskText("");
      setSelectedDate(null);
    }
  };

  const renderDays = () => {
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="empty-day" />);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day)
        .toISOString()
        .split("T")[0];
      const dayTasks = tasks.filter((task) => task.dueDate === date);
      days.push(
        <div
          key={day}
          className="p-2 border border-gray-200 cursor-pointer"
          onClick={() => setSelectedDate(date)}
        >
          <span>{day}</span>
          {dayTasks.length > 0 && (
            <div className="mt-2">
              {dayTasks.map((task) => (
                <div key={task.id} className="bg-blue-100 p-1 rounded mb-1">
                  {task.content}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <Button onClick={handlePrevMonth} className="bg-gray-200 text-black">
          Previous
        </Button>
        <span className="text-lg font-semibold">
          {new Date(currentYear, currentMonth).toLocaleString("default", {
            month: "long",
          })}{" "}
          {currentYear}
        </span>
        <Button onClick={handleNextMonth} className="bg-gray-200 text-black">
          Next
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="p-3 text-center font-medium text-xs bg-gray-50"
          >
            {day}
          </div>
        ))}
        {renderDays()}
      </div>
      {selectedDate && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <Input
              type="text"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              placeholder="Add a task"
              className="border p-2 w-full mb-2"
            />
            <Button onClick={handleAddTask} className="bg-blue-500 text-white">
              <PlusCircle className="h-4 w-4 inline-block mr-1" /> Add Task
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

CalendarView.propTypes = {
  tasks: PropTypes.array.isRequired,
  addTask: PropTypes.func.isRequired,
};

export default CalendarView;
