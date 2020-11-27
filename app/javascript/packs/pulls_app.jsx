import React from "react";
import ReactDOM from "react-dom";
import App from "pulls/components/App";

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<App />, document.getElementById("pull_request_mount"));
})