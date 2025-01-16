import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

console.log(process.env.REACT_APP_DEMO);

ReactDOM.render(<App />, document.getElementById("root"));
