import React, { useState, useContext, createContext } from 'react';
import { v4 as uuid_v4 } from "uuid";

interface Task {
    name: string;
    isCompleted: boolean;
    id: string;
}

interface TaskContextData {
  tasks: Task[];
  addTask(task: string): void;
}

const TaskContext = createContext<TaskContextData>({} as TaskContextData);

export const TaskProvider: React.FC = ({ children }) => {
  const [tasks, setTask] = useState<Task[]>([]);

  const addTask = (task: string) => {
      setTask([...tasks, {
        name: task,
        isCompleted: false,
        id: uuid_v4()
      }])
  }

  return (
    <TaskContext.Provider
      value={{ tasks: tasks, addTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export function useTask(): TaskContextData {
  const context = useContext(TaskContext);

  if (!context) throw new Error('useTask must be used within an TaskProvider');

  return context;
}