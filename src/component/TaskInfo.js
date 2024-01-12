import { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./TaskInfo.css";

function TaskInfo({ info, deleteTask, editTask, setSortBy }) {
  const [sortValue, setSortValue] = useState("");

  // check if prop.info has data in it
  const propInfo = () => {
    if (info === "") {
      return false;
    } else {
      return true;
    }
  };

  function setSort(sortBy) {
    localStorage.setItem("sortBy", sortBy);
    setSortBy(sortBy);
    setSortValue(sortBy);
    console.log("Now sorting by: " + localStorage.getItem("sortBy"));
  }

  useEffect(() => {
    setSortValue(localStorage.getItem("sortBy"));
  }, []);

  return (
    <div style={{ width: "80%" }}>
      {propInfo() ? (
        <div>
          <div className="task-sortBy">
            <label>Sort By:</label>{" "}
            <select
              value={sortValue}
              onChange={(event) => setSort(event.target.value)}
              className="task-select"
            >
              <option value="title">Title</option>
              <option value="status">Status</option>
              <option value="date">Date</option>
            </select>
          </div>

          {Object.keys(info).map((task_key, index) => {
            return (
              <TaskItem
                key={task_key}
                task={info[task_key]}
                task_key={task_key}
                deleteTask={deleteTask}
                editTask={editTask}
              ></TaskItem>
            );
          })}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default TaskInfo;
