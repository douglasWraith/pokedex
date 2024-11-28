import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./components/App/App";

const containerr = document.getElementById("root");
const root = createRoot(containerr);
root.render(<App />);