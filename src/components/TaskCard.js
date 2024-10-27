// src/components/TaskCard.js
import React from "react";
import { Card } from "./ui/Card";
import { MoreHorizontal, Trash2, CalendarDays } from "lucide-react";

const TaskCard = ({
  task,
  columnId,
  column,
  handleDeleteTask,
  handleDragStart,
}) => (
  <Card className={`${column.cardBorder} ${column.taskBg}`}>
    <div className="flex justify-between items-start">
      <div className="flex items-center gap-2">
        <MoreHorizontal className="h-5 w-5 text-gray-400 cursor-grab" />
        <span>{task.content}</span>
      </div>
      <button
        onClick={() => handleDeleteTask(task.id, columnId)}
        className="hover:bg-red-100 p-1 rounded"
      >
        <Trash2 className="h-4 w-4 text-red-500" />
      </button>
    </div>
    <div className="mt-2 text-sm text-gray-500 flex items-center gap-2">
      <CalendarDays className="h-4 w-4" />
      {new Date(task.dueDate).toLocaleDateString()}
    </div>
  </Card>
);

export default TaskCard;
