import React from "react";
import App from "./App.jsx"
import { render } from "react-dom";

const root = document.createElement("div");
root.setAttribute("id", "root");
document.body.appendChild(root);

render(<App />, root);
