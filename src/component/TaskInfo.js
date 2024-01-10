import { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
    // window.location.reload(false); //refresh page
  }

  useEffect(() => {
    // console.log(info, "----------bahaer---------------");
    // Object.keys(info).map((item, index) => {
    //   console.log(index, "-------------------------------");
    //   console.log(item, "-------------------------------");
    // });
    setSortValue(localStorage.getItem("sortBy"));
  }, []);

  return (
    <div style={{ width: "80%", margin: "auto" }}>
      {propInfo() ? (
        <div>
          {/* <h3>
            Sort by:&nbsp;
            <button onClick={() => setSort("title")}>Title</button>
            <button onClick={() => setSort("status")}>Status</button>
            <button onClick={() => setSort("date")}>Due date</button>
          </h3> */}
          <Container>
            <ul>
            <Row>
              <Col sm md></Col>
              <Col
                sm={4}
                md={3}
                lg={2}
                style={{ padding: "0", margin: "auto" }}
              >
                <Form.Label style={{ marginTop: "20px", marginLeft: "20px"}}>Sort by:</Form.Label>
              </Col>
              <Col sm={6} md={4} lg={3}>
                <Form.Select
                  style={{ marginTop: "20px"}}
                  value={sortValue}
                  onChange={(event) => setSort(event.target.value)}
                >
                  <option value="title">Title</option>
                  <option value="status">Status</option>
                  <option value="date">Date</option>
                </Form.Select>
              </Col>
            </Row>
            </ul>
          </Container>
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
