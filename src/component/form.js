//import React, { useState } from "react";
import React, { useEffect, useState, useMemo } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

function Registerform() {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("name", name);
    localStorage.setItem("sortBy", "date");
    setName("");
    navigate("/tasks");
  };

  return (
    <Container>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          padding: "50px",
          borderRadius: "5px",
          boxShadow: "3px 3px 9px 3px lightgrey",
          minWidth: "400px",
        }}
      >
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>
              <h1>Login</h1>
            </Form.Label>
            <br></br>
            <Form.Control
              type="text"
              placeholder="Please Enter Your Name"
              value={name}
              onChange={handleChange}
            />
          </Form.Group>
          {/* <div>Enter Your Name</div> */}
          {/* <input type="text" value={name} onChange={handleChange} /> */}
          <Button type="submit" style={{ float: "right" }}>
            Submit
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default Registerform;
