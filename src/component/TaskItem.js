import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import deleteIcon from "../Asset/delete.png";
import "./TaskItem.css";
import createIcon from "../Asset/icons8-task-64.png";
import descrIcon from "../Asset/icons8-detail-60.png";
import dateIcon from "../Asset/icons8-date-64.png";

function TaskItem({ task, task_key, deleteTask, editTask }) {
  const [showEditForm, setShowEditForm] = useState(false);
  const [newDes, setNewDes] = useState(task.des);
  const [newDueDate, setNewDueDate] = useState(task.date);
  const [newStatus, setNewStatus] = useState(task.status);
  const [newTitle, setNewTitle] = useState(task.title);
  const [buttonText, setButtonText] = useState(false);
  const handleEdit = (event) => {
    event.preventDefault();
    if (showEditForm) {
      if (newTitle === "" || newDes === "") {
        alert("This cannot be empty");
        return;
      }
      const newData = {
        title: newTitle,
        des: newDes,
        status: newStatus,
        date: newDueDate,
      };
      editTask(task_key, newData);
    }
    setButtonText(!buttonText);
    setShowEditForm(!showEditForm);
  };
  return (
    <div className="TaskInfo-Conatiner">
      <div>
        {showEditForm ? (
          <input
            type="text"
            value={newTitle}
            onChange={(event) => {
              setNewTitle(event.target.value);
            }}
            required
          />
        ) : (
          <div>
            <h4
              style={{
                textTransform: "uppercase",
                fontWeight: "600",
              }}
            >
              <span>
                <img src={createIcon} className="title-img" />
              </span>
              {task.title}
              <img
                src={deleteIcon}
                style={{
                  color: "red",
                  cursor: "pointer",
                  float: "right",
                  width: "25px",
                  height: "25px",
                }}
                onClick={() => deleteTask(task_key)}
              />
            </h4>
          </div>
        )}
      </div>
      <div className="task-detail">
        <div>
          <span>
            <img
              src={descrIcon}
              style={{ width: "20px", height: "20px", marginRight: "10px" }}
            />
          </span>
          {showEditForm ? (
            <input
              type="text"
              value={newDes}
              onChange={(event) => {
                setNewDes(event.target.value);
              }}
              required
            />
          ) : (
            task.des
          )}
        </div>
        <div>
          {/* Due Date{" "} */}
          <span>
            <img
              src={dateIcon}
              style={{
                width: "20px",
                height: "20px",
                verticalAlign: "middle",
              }}
            />
          </span>{" "}
          {showEditForm ? (
            <input
              type="date"
              value={newDueDate}
              onChange={(event) => {
                setNewDueDate(event.target.value);
              }}
              required
            />
          ) : (
            task.date
          )}
        </div>
        <div>
          Status:{" "}
          {showEditForm ? (
            <select
              onChange={(event) => {
                setNewStatus(event.target.value);
              }}
              value={newStatus}
            >
              <option value="To-do">To-do</option>
              <option value="In-Progress">In-Progress</option>
              <option value="Done">Done</option>
            </select>
          ) : (
            task.status
          )}
        </div>
        <div className="edit-BTN">
          <button onClick={handleEdit} className="edit-btn">
            {buttonText ? "Save" : "Edit"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;
