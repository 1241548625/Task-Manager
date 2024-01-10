import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registerform from "./component/form";
import Task from "./component/task";
import SignIn from "./component/Auth/SignIn";
import SignUp from "./component/Auth/SignUp";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      {/* <Route path="/" element={<Registerform />} /> */}
      <Route path="/" element={<SignIn />} />
      <Route path="/signUp" element={<SignUp/>}/>
      <Route path="/tasks" element={<Task />} />
    </Routes>
  </BrowserRouter>
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
