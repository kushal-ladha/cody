import React from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/react";
import App from "pulls/components/App";

Sentry.init({
  dsn:
    "https://b11af8b7e6ca4e529fd920dfffd68bd0@o80496.ingest.sentry.io/176187",
});

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("pull_request_mount");
  if (root) {
    ReactDOM.render(<App />, root);
  }
});
