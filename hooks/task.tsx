import React, { useState, useContext, createContext, useEffect } from 'react';
import { v4 as uuid_v4 } from "uuid";

interface Task {
    name: string;
    isCompleted: boolean;
    id: string;
}

interface TaskContextData {
  tasks: Task[];
  tasksFiltered: Task[];
  radioFilter: string;
  inputTask: string;
  addTask(taskName: string): void;
  deleteTask(taskID: string): void;
  completedTask(taskID: Task): void;
  editTask(taskID: Task, taskName: string): void;
  filterTask(taskName: string, filter: string): void;
}

const TaskContext = createContext<TaskContextData>({} as TaskContextData);
const ISSERVER = typeof window === "undefined";

export const TaskProvider: React.FC = ({ children }) => {
  const [tasks, setTask] = useState<Task[]>([]);
  const [radioFilter, setRadioFilter] = useState<string>("all");
  const [inputTask, setInputTask] = useState<string>("");
  const [tasksFiltered, setTaskFiltered] = useState<Task[]>([]);

  useEffect(() => {
    if (ISSERVER) return;
    const localtasks = localStorage.getItem("@TodoApp:tasks");
    if (localtasks) {
        setTask(JSON.parse(localtasks));
    }
  }, [])

  const addTask = (taskName: string) => {
      setTask([...tasks, {
        name: taskName,
        isCompleted: false,
        id: uuid_v4()
      }])
      localStorage.setItem("@TodoApp:tasks", JSON.stringify(
        [...tasks, {
            name: taskName,
            isCompleted: false,
            id: uuid_v4()
        }]));
  }

  const deleteTask = (taskID: string) => {
    if (filterTask.length > 0) {
        const newTaskArray = tasksFiltered.filter((task) => task.id !== taskID);
        setTaskFiltered(newTaskArray);
    }
    const newTaskArray = tasks.filter((task) => task.id !== taskID);
    setTask(newTaskArray);
    localStorage.setItem("@TodoApp:tasks", JSON.stringify(newTaskArray));
  }

  const completedTask = (TaskObj: Task) => {
    if (filterTask.length > 0) {
        const newTaskArray =  tasksFiltered.map((task) =>
            task.id !== TaskObj.id
            ? task
            : { ...task, isCompleted: !TaskObj.isCompleted }
        )

        setTaskFiltered(newTaskArray);
    }

    const newTaskArray =  tasks.map((task) =>
        task.id !== TaskObj.id
        ? task
        : { ...task, isCompleted: !TaskObj.isCompleted }
    )
    setTask(newTaskArray);
    localStorage.setItem("@TodoApp:tasks", JSON.stringify(newTaskArray));
  }

  const editTask = (TaskObj: Task, taskName: string) => {
    const objIndex = tasks.findIndex((task => task.id == TaskObj.id));
    tasks[objIndex].name = taskName;
    
    localStorage.setItem("@TodoApp:tasks", JSON.stringify(tasks));
  }

  const filterTask = (taskName: string, filter: string) => {
    setRadioFilter(filter);
    setInputTask(taskName);

    if (filter === "all" && taskName) {
        const newTaskFiltered = tasks.filter((task) => task.name.includes(taskName));
        setTaskFiltered(newTaskFiltered);
        return;
    } 

    if (filter === "complete" && taskName === "") {
        const newTaskFiltered = tasks.filter((task) => task.isCompleted);
        setTaskFiltered(newTaskFiltered);
        return;
    } 

    if (filter === "complete" && taskName) {
        const newTaskFiltered = tasks.filter((task) => task.isCompleted && task.name.includes(taskName));
        setTaskFiltered(newTaskFiltered);
        return;
    } 
    if (filter === "incomplete" && taskName) {
        const newTaskFiltered = tasks.filter((task) => !task.isCompleted && task.name.includes(taskName));
        setTaskFiltered(newTaskFiltered);
        return;
    }

    if (filter === "incomplete" && taskName === "") {
        const newTaskFiltered = tasks.filter((task) => !task.isCompleted);
        setTaskFiltered(newTaskFiltered);
        return;
    }
    setTaskFiltered([]);
  }

  return (
    <TaskContext.Provider
      value={{ tasksFiltered, tasks: tasks, addTask, deleteTask, completedTask, editTask, filterTask, radioFilter, inputTask }}
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