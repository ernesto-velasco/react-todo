import { useState, useEffect } from "react";
import {Header, Tasks} from "./components"

const LOCAL_STORAGE_KEY = "todo:tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  
  const loadSavedTasks = () => {
    // load localStorage item to tasks state if any
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) setTasks(JSON.parse(saved));
  }

  const setTasksAndSave = (newTasks) => {
    // set tasks to state and update localStorage
    setTasks(newTasks);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }

    const addTask = (taskTitle) => {
      // combine current tasks with a new task and send it to setTasksAndSave
      setTasksAndSave([
        ...tasks,
        {
          id: crypto.randomUUID(),
          title: taskTitle,
          isCompleted: false,
        },
      ]);
    };

    const deleteTaskById = (taskId) => {
      const newTasks = tasks.filter((task) => task.id !== taskId);
      setTasksAndSave(newTasks);
    }

    const toggleTaskCompletedById = (taskId) => {
      const newTasks = tasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            isCompleted: !task.isCompleted,
          };
        }
        return task;
      });
      setTasksAndSave(newTasks);
    }

  useEffect(() => {
    loadSavedTasks();
  }, []);

  return (
    <>
      <Header handleAddTask={addTask} />
      <Tasks
        tasks={tasks}
        onDelete={deleteTaskById}
        onComplete={toggleTaskCompletedById}
      />
    </>
  );
}

export default App
