import React from "react";
import ReactDOM from "react-dom";
import Routes from "./routes/Routes";

ReactDOM.render(
  <React.StrictMode>
    <h1>Games available!</h1>
    <Routes />
  </React.StrictMode>,
  document.getElementById("root")
);
