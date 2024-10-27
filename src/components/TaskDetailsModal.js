import React, { useState } from "react";
import { PlusCircle, Trash2 } from "lucide-react";

const TaskDetailsModal = ({ task, onClose, onSave, onDelete }) => {
  const [editableTask, setEditableTask] = useState({ ...task });
  const [newSubTaskText, setNewSubTaskText] = useState("");

  const handleAddSubTask = () => {
    if (newSubTaskText.trim()) {
      const newSubTask = {
        id: Date.now(),
        content: newSubTaskText.trim(),
        completed: false,
      };
      setEditableTask((prev) => ({
        ...prev,
        subTasks: [...prev.subTasks, newSubTask],
      }));
      setNewSubTaskText("");
    }
  };

  const toggleSubTaskCompletion = (subTaskId) => {
    setEditableTask((prev) => ({
      ...prev,
      subTasks: prev.subTasks.map((subTask) =>
        subTask.id === subTaskId
          ? { ...subTask, completed: !subTask.completed }
          : subTask
      ),
    }));
  };

  const handleDeleteSubTask = (subTaskId) => {
    setEditableTask((prev) => ({
      ...prev,
      subTasks: prev.subTasks.filter((subTask) => subTask.id !== subTaskId),
    }));
  };

  const handleSave = () => {
    onSave(editableTask);
  };

  return (
    <div className="modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="modal-content bg-white p-4 rounded-lg shadow-md w-full sm:w-11/12 md:w-2/3 lg:w-1/2">
        <h2 className="text-xl font-bold mb-4">Task Details</h2>
        <input
          type="text"
          value={editableTask.content}
          onChange={(e) =>
            setEditableTask({ ...editableTask, content: e.target.value })
          }
          className="border rounded p-2 w-full mb-2"
        />
        <div className="mb-4">
          <strong>Due Date:</strong>
          <input
            type="date"
            value={editableTask.dueDate}
            onChange={(e) =>
              setEditableTask({ ...editableTask, dueDate: e.target.value })
            }
            className="border rounded p-1 w-full mt-2"
          />
        </div>
        <div className="mb-4">
          <strong>Sub-tasks</strong>
          <div className="space-y-2 mt-2">
            {editableTask.subTasks.map((subTask) => (
              <div key={subTask.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={subTask.completed}
                  onChange={() => toggleSubTaskCompletion(subTask.id)}
                />
                <input
                  type="text"
                  value={subTask.content}
                  onChange={(e) => {
                    const updatedSubTasks = editableTask.subTasks.map((st) =>
                      st.id === subTask.id
                        ? { ...st, content: e.target.value }
                        : st
                    );
                    setEditableTask({
                      ...editableTask,
                      subTasks: updatedSubTasks,
                    });
                  }}
                  className="border rounded p-1 flex-1"
                />
                <button
                  onClick={() => handleDeleteSubTask(subTask.id)}
                  className="text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
            <div className="mt-3">
              <input
                type="text"
                value={newSubTaskText}
                onChange={(e) => setNewSubTaskText(e.target.value)}
                placeholder="Add a sub-task"
                className="border rounded p-2 w-full"
                onKeyPress={(e) => {
                  if (e.key === "Enter") handleAddSubTask();
                }}
              />
              <button
                onClick={handleAddSubTask}
                className="text-blue-500 mt-2 flex items-center"
              >
                <PlusCircle className="h-4 w-4 mr-1" /> Add Sub-task
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded mr-2"
          >
            Close
          </button>
          <button
            onClick={() => onDelete(task.id, task.columnId)}
            className="bg-red-500 text-white px-4 py-2 rounded mr-2"
          >
            Delete Task
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsModal;
