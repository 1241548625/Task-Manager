import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { auth } from "../firebase.js";
import { signOut, onAuthStateChanged } from "firebase/auth";

import {
  getDatabase,
  ref,
  onValue,
  set,
  remove,
  update,
} from "firebase/database";
import NewTask from "./newTask";
import TaskInfo from "./TaskInfo";
import { app } from "../firebase.js";
import "./task.css";

function Task() {
  const user = auth.currentUser;
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [info, setInfo] = useState([]);
  const [sortedData, setSortedData] = useState({});
  const [editInfo, setEdit] = useState({});
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [uid, setUid] = useState(null);
  const status_weight = {
    "To-Do": 1,
    "In-Progress": 2,
    Done: 3,
  };

  const compare = (a, b) => {
    if (a[sortBy].toLowerCase() < b[sortBy].toLowerCase()) {
      return -1;
    }
    if (a[sortBy].toLowerCase() > b[sortBy].toLowerCase()) {
      return 1;
    }
    return 0;
  };

  const compareStatus = (a, b) => {
    if (status_weight[a[sortBy]] < status_weight[b[sortBy]]) {
      return -1;
    }
    if (status_weight[a[sortBy]] > status_weight[b[sortBy]]) {
      return 1;
    }
    return 0;
  };

  // running one time when page loading
  // useEffect(() => {
  //   setName(localStorage.getItem("name"));
  //   setSortBy(localStorage.getItem("sortBy"));
  // }, []);
  const init = (user) => {
    setName(user.displayName);
    setEmail(user.email);
    setUid(user.uid);
  };

  useEffect(() => {
    const listener = onAuthStateChanged(auth, async (user) => {
      init(user);
      console.log(user);
    });

    return () => {
      listener();
    };
  }, []);

  useEffect(() => {
    setSortBy(localStorage.getItem("sortBy"));
  });

  //get data from database
  useEffect(() => {
    if (info === null) {
      return;
    }

    //converts data obj into sorted array
    let dataArray = Object.entries(info).map(([key, value]) => ({
      ...value,
      key,
    }));
    console.log(dataArray);

    if (sortBy === "status") {
      dataArray.sort(compareStatus);
    } else {
      dataArray.sort(compare);
    }
    //coverts sorted array to back to obj with original keys
    let sortedData = dataArray.reduce((acc, curr) => {
      acc[curr.key] = curr;
      return acc;
    }, {});
    setSortedData(sortedData);
  }, [info, sortBy]);

  useEffect(() => {
    //this should be user email, instead of user name
    if (uid === null) {
      console.log("null");
      return;
    }
    console.log("not null");
    const db = getDatabase(app);
    const starCountRef = ref(db, "user/" + uid);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      if (data === null) {
        setInfo({});
      } else {
        //converts data obj into sorted array
        setInfo(data);
      }
    });
  }, [uid]);

  const deleteTask = (task_key) => {
    // eslint-disable-next-line no-restricted-globals
    const deleteConfirm = confirm("Are you sure to delete the task?");
    if (deleteConfirm) {
      console.log("task key: " + task_key);
      const db = getDatabase();
      const taskRef = ref(db, "user/" + user.uid + "/" + task_key);
      remove(taskRef);
    }
    //window.location.reload(false); //refresh page
  };

  const editTask = (task_key, data) => {
    console.log(task_key);
    console.log(data);
    const db = getDatabase();
    const taskRef = ref(db, "user/" + user.uid + "/" + task_key);
    set(taskRef, data);
    // window.location.reload(false); //refresh page
  };

  const logout = (event) => {
    event.preventDefault();
    // localStorage.removeItem("name");
    signOut(auth)
      .then(() => {
        console.log("Sign-out successful.");
      })
      .catch((error) => {
        console.log(error);
      });
    navigate("/");
  };

  const handleModalClose = () => {
    setShowNewTaskForm(false);
  };

  //style={{ width: "70%", margin: "auto", textAlign: "center" }}

  return (
    <div className="task-container">
      <div className="taskContainer">
        <div className="task-title">
          <h1>{name}'s Tasks </h1>
          <div
            style={{
              display: "inline-block",
              float: "right",
            }}
          >
            <button variant="link" onClick={logout} className="task-btn">
              Logout
            </button>
          </div>
          <div>
            <button
              className="task-btn"
              variant="link"
              onClick={() => {
                setShowNewTaskForm(!showNewTaskForm);
              }}
            >
              Create
            </button>

            <Modal
              show={showNewTaskForm}
              onHide={handleModalClose}
              className="modal-container"
              // style={{ marginTop: "400px" }}
            >
              <div className="create-modal">
                <Modal.Header closeButton>
                  <Modal.Title>Create New Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <NewTask
                    setShowNewTaskForm={setShowNewTaskForm}
                    handleModalClose={handleModalClose}
                    uid={uid}
                  ></NewTask>
                </Modal.Body>
              </div>
            </Modal>
          </div>
        </div>
        <br></br>
        {info === null || JSON.stringify(info) === "{}" ? (
          <div>
            <p>NO TASK TO SHOW. CREATE ONE.</p>
          </div>
        ) : (
          <TaskInfo
            info={sortedData}
            deleteTask={deleteTask}
            editTask={editTask}
            setSortBy={setSortBy}
          ></TaskInfo>
        )}
      </div>
    </div>
  );
}

export default Task;
