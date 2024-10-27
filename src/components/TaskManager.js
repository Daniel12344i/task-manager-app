import React, { useState, useEffect } from "react";
import { Button } from "./ui/Button";
import { Input } from "./ui/input";
import { PlusCircle } from "lucide-react";
import TaskDetailsModal from "./TaskDetailsModal";
import CalendarView from "./CalendarView";

export default function TaskManager() {
  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: [],
  });

  const predefinedTasks = {
    todo: [
      {
        id: 1,
        content: "Design UI for new feature",
        dueDate: "2024-11-01",
        subTasks: [
          { id: 101, content: "Create wireframes" },
          { id: 102, content: "Get feedback from team" },
        ],
      },
      {
        id: 2,
        content: "Write project documentation",
        dueDate: "2024-11-05",
        subTasks: [
          { id: 103, content: "Outline sections" },
          { id: 104, content: "Draft initial content" },
        ],
      },
    ],
    inProgress: [
      {
        id: 3,
        content: "Develop API endpoint",
        dueDate: "2024-10-30",
        subTasks: [
          { id: 105, content: "Define API schema" },
          { id: 106, content: "Implement authentication" },
        ],
      },
    ],
    done: [
      {
        id: 4,
        content: "Research user feedback",
        dueDate: "2024-10-25",
        subTasks: [
          { id: 107, content: "Collect survey responses" },
          { id: 108, content: "Analyze feedback" },
        ],
      },
    ],
  };

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      const parsedTasks = JSON.parse(storedTasks);
      setTasks({
        todo: mergeTasks(predefinedTasks.todo, parsedTasks.todo),
        inProgress: mergeTasks(
          predefinedTasks.inProgress,
          parsedTasks.inProgress
        ),
        done: mergeTasks(predefinedTasks.done, parsedTasks.done),
      });
    } else {
      setTasks(predefinedTasks); // Set to predefined tasks if nothing in local storage
      localStorage.setItem("tasks", JSON.stringify(predefinedTasks)); // Initialize local storage with predefined tasks
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Save tasks to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const mergeTasks = (predefined, stored) => {
    const storedIds = new Set(stored.map((task) => task.id));
    return [...predefined, ...stored.filter((task) => !storedIds.has(task.id))];
  };

  const handleAddTask = () => {
    if (text.trim()) {
      const newTask = {
        id: Date.now(),
        content: text.trim(),
        dueDate: date || new Date().toISOString().split("T")[0],
        subTasks: [],
      };
      const updatedTasks = { ...tasks, todo: [newTask, ...tasks.todo] };
      setTasks(updatedTasks);
      setText("");
      setDate("");
    }
  };

  const handleAddTaskToColumn = (columnId) => {
    if (text.trim()) {
      const newTask = {
        id: Date.now(),
        content: text.trim(),
        dueDate: date || new Date().toISOString().split("T")[0],
        subTasks: [],
      };
      setTasks((prev) => ({
        ...prev,
        [columnId]: [newTask, ...prev[columnId]],
      }));
      setText("");
      setDate("");
    }
  };

  const [activeView, setActiveView] = useState("kanban");
  const [draggedTask, setDraggedTask] = useState(null);
  const [newTaskColumn, setNewTaskColumn] = useState("");
  const [newSubTaskText, setNewSubTaskText] = useState("");
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedTask, setSelectedTask] = useState(null); // State for selected task

  const openTaskDetails = (task, columnId) => {
    if (!task.isSubTask) {
      setSelectedTask({ ...task, columnId });
    }
  };

  const closeTaskDetails = () => setSelectedTask(null);

  const handleSaveTask = (updatedTask) => {
    setTasks((prev) => ({
      ...prev,
      [updatedTask.columnId]: prev[updatedTask.columnId].map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      ),
    }));
    closeTaskDetails();
  };

  const handleDeleteTask = (taskId, columnId) => {
    setTasks((prev) => ({
      ...prev,
      [columnId]: prev[columnId].filter((task) => task.id !== taskId),
    }));
    closeTaskDetails();
  };

  const handleDragStart = (task, sourceColumn) =>
    setDraggedTask({ ...task, sourceColumn });

  const handleDrop = (targetColumn) => {
    if (!draggedTask || draggedTask.sourceColumn === targetColumn) return;
    setTasks((prev) => ({
      ...prev,
      [draggedTask.sourceColumn]: prev[draggedTask.sourceColumn].filter(
        (task) => task.id !== draggedTask.id
      ),
      [targetColumn]: [draggedTask, ...prev[targetColumn]],
    }));
    setDraggedTask(null);
  };

  const handleAddSubTask = (taskId, columnId) => {
    if (newSubTaskText.trim()) {
      const updatedTasks = tasks[columnId].map((task) =>
        task.id === taskId
          ? {
              ...task,
              subTasks: [
                ...task.subTasks,
                { id: Date.now(), content: newSubTaskText },
              ],
            }
          : task
      );
      setTasks((prev) => ({ ...prev, [columnId]: updatedTasks }));
      setNewSubTaskText("");
    }
  };

  const handlePrevYear = () => setCurrentYear((prevYear) => prevYear - 1);
  const handleNextYear = () => setCurrentYear((prevYear) => prevYear + 1);

  const addTask = (newTask) => {
    const updatedTasks = { ...tasks, todo: [newTask, ...tasks.todo] };
    setTasks(updatedTasks);
  };

  const renderKanbanView = () => (
    <div className="flex flex-col md:flex-row gap-4">
      {["todo", "inProgress", "done"].map((column) => (
        <div
          key={column}
          className={`flex-1 ${
            column === "todo"
              ? "bg-red-50"
              : column === "inProgress"
              ? "bg-yellow-50"
              : "bg-green-50"
          } rounded-lg`}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop(column)}
        >
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-gray-700">{column}</h2>
              <span className="text-sm font-medium">
                {tasks[column].length}
              </span>
            </div>
            <div className="space-y-3">
              {tasks[column].map((task) => (
                <div
                  key={task.id}
                  onClick={() => openTaskDetails(task, column)}
                  onDragStart={() => handleDragStart(task, column)}
                  draggable
                  className={`cursor-pointer p-2 sm:p-3 md:p-4 bg-white shadow-md rounded text-xs sm:text-sm md:text-base ${
                    column === "todo"
                      ? "border-l-4 border-l-red-400"
                      : column === "inProgress"
                      ? "border-l-4 border-l-yellow-400"
                      : "border-l-4 border-l-blue-400"
                  }`}
                >
                  <span>{task.content}</span>
                  <span className="text-xs text-gray-500 block">
                    {task.dueDate}
                  </span>
                  <div className="mt-2 space-y-1">
                    {task.subTasks.map((subTask) => (
                      <div
                        key={subTask.id}
                        className="text-xs text-gray-700 pl-2"
                      >
                        - {subTask.content}
                      </div>
                    ))}
                    <div className="flex items-center">
                      <Input
                        type="text"
                        placeholder="Add sub-task"
                        value={newSubTaskText}
                        onChange={(e) => setNewSubTaskText(e.target.value)}
                        className="text-xs w-full p-1 border rounded mr-2"
                      />
                      <Button
                        onClick={() => handleAddSubTask(task.id, column)}
                        className="text-blue-500 text-xs"
                      >
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              {newTaskColumn === column ? (
                <div className="mt-2">
                  <Input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter a title for this card..."
                    onKeyPress={(e) =>
                      e.key === "Enter" && handleAddTaskToColumn(column)
                    }
                    className="border rounded p-2 w-full"
                  />
                  <Button
                    onClick={() => handleAddTaskToColumn(column)}
                    className="bg-blue-500 text-white px-2 py-1 mt-2"
                  >
                    Add Card
                  </Button>
                  <Button
                    onClick={() => setNewTaskColumn("")}
                    className="text-gray-600 px-2 py-1 mt-2"
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <button
                  onClick={() => setNewTaskColumn(column)}
                  className="text-gray-500 hover:text-gray-800 mt-2 flex items-center"
                >
                  + Add a card
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderListView = () => (
    <div className="space-y-4">
      {["todo", "inProgress", "done"].map((column) => (
        <div
          key={column}
          className={`rounded-lg p-4 ${
            column === "todo"
              ? "bg-red-50"
              : column === "inProgress"
              ? "bg-yellow-50"
              : "bg-green-50"
          }`}
        >
          <h2 className="font-semibold text-gray-700">{column}</h2>
          {tasks[column].map((task) => (
            <div
              key={task.id}
              className={`cursor-pointer p-3 bg-white shadow-md rounded mb-2 ${
                column === "todo"
                  ? "border-l-4 border-l-red-400"
                  : column === "inProgress"
                  ? "border-l-4 border-l-yellow-400"
                  : "border-l-4 border-l-blue-400"
              }`}
            >
              <span>{task.content}</span>
              <span className="text-xs text-gray-500 block">
                {task.dueDate}
              </span>
              <div className="mt-2 space-y-1">
                {task.subTasks.map((subTask) => (
                  <div key={subTask.id} className="text-xs text-gray-700 pl-2">
                    - {subTask.content}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <div className="p-4 max-w-6xl mx-auto w-full sm:w-full md:w-11/12 lg:w-10/12 xl:w-9/12">
      <div className="mb-6 flex items-center gap-2">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a new task"
          onKeyPress={(e) => e.key === "Enter" && handleAddTask()}
          className="flex-1"
        />
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-40"
        />
        <Button
          onClick={handleAddTask}
          className="bg-black hover:bg-black/90 px-6"
        >
          <PlusCircle className="h-4 w-4 mr-2" /> Add Task
        </Button>
      </div>
      <div className="mb-6 border-b">
        <div className="flex gap-4">
          {["kanban", "list", "calendar"].map((view) => (
            <button
              key={view}
              onClick={() => setActiveView(view)}
              className={`px-3 py-2 font-medium text-sm ${
                activeView === view
                  ? "border-b-2 border-black"
                  : "text-gray-600"
              }`}
            >
              {view.charAt(0).toUpperCase() + view.slice(1)} View
            </button>
          ))}
        </div>
      </div>

      {activeView === "kanban" && renderKanbanView()}
      {activeView === "list" && renderListView()}
      {activeView === "calendar" && (
        <CalendarView tasks={Object.values(tasks).flat()} addTask={addTask} />
      )}

      {selectedTask && (
        <TaskDetailsModal
          task={selectedTask}
          onClose={closeTaskDetails}
          onSave={handleSaveTask}
          onDelete={handleDeleteTask}
        />
      )}
    </div>
  );
}
