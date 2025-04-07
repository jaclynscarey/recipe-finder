// Import necessary React libraries and components
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App/App";

// Create a root element for React to render into
// This is the entry point of the React application
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the application with React.StrictMode enabled
// StrictMode helps identify potential problems in the application
// The Router component enables client-side routing throughout the app
// The App component is the main component that contains all other components
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
