import { useState } from "react";
import styles from "./Header.module.css";

const Header = ({ handleAddTask }) => {
  const [title, setTitle] = useState("");

  const handleOnChange = (event) => {
    setTitle(event.target.value);
  }

  const handleSubmit = (e) => e.preventDefault();

  const handleOnKeyDown = (e) => {
    if (e.key !== "Enter") return null;
    handleAddTask(title);
    setTitle("");
  };
  return (
    <header className={styles.header}>
      <h1 className={styles.icon}>📝</h1>
      <h1 className={styles.lead}>To Do</h1>
      <form onSubmit={(e) => handleSubmit(e)} className={styles.newTaskForm}>
        <input
          onKeyDown={(e) => handleOnKeyDown(e)}
          type="text"
          onChange={handleOnChange}
          value={title}
          placeholder="🤔 What to do today?"
        />
      </form>
    </header>
  );
};

export default Header;
